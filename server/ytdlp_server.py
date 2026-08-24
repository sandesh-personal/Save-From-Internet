#!/usr/bin/env python3
"""
Save-From-Internet yt-dlp Microservice Server
A lightweight, high-performance extraction microservice powered by yt-dlp and Flask.
Zero API keys needed. Handles Instagram Reels, TikTok, Facebook, Twitter, and 1,800+ sites.

Run locally or on a VPS:
    pip install flask flask-cors yt-dlp
    python server/ytdlp_server.py
"""

import sys
import json
import subprocess
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok', 'engine': 'yt-dlp'})

@app.route('/extract', methods=['POST'])
def extract():
    data = request.get_json(force=True, silent=True) or {}
    url = data.get('url', '').strip()
    if not url:
        return jsonify({'error': 'URL is required'}), 400

    try:
        # Run yt-dlp to dump media JSON
        cmd = [
            sys.executable,
            '-m',
            'yt_dlp',
            '--dump-single-json',
            '--no-warnings',
            '--no-playlist',
            url,
        ]
        proc = subprocess.run(
            cmd,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            timeout=35,
        )

        if proc.returncode != 0 or not proc.stdout.strip():
            err_msg = proc.stderr.strip() or 'Failed to extract video info'
            return jsonify({'error': err_msg}), 422

        info = json.loads(proc.stdout.strip())
        
        # Parse formats
        formats = info.get('formats') or []
        progressive = [
            f for f in formats
            if f.get('url') and (f.get('ext') == 'mp4' or f.get('vcodec') != 'none')
            and f.get('vcodec') != 'none' and f.get('acodec') != 'none'
            and '.m3u8' not in f.get('url', '')
        ]
        video_only = [
            f for f in formats
            if f.get('url') and (f.get('ext') == 'mp4' or f.get('vcodec') != 'none')
            and f.get('vcodec') != 'none'
        ]
        audio_only = [
            f for f in formats
            if f.get('url') and (f.get('ext') in ['m4a', 'mp3'] or f.get('acodec') != 'none')
            and f.get('vcodec') == 'none'
        ]

        pool = progressive if progressive else video_only
        pool.sort(key=lambda x: (x.get('height') or x.get('tbr') or 0), reverse=True)

        qualities = []
        for f in pool:
            res = f.get('format_note') or (f"{f.get('height')}p" if f.get('height') else '') or 'HD'
            label = f"{res} MP4".strip()
            if not any(q['url'] == f.get('url') for q in qualities):
                qualities.append({
                    'quality': label,
                    'url': f.get('url'),
                    'resolution': f"{f.get('height')}p" if f.get('height') else '1080p',
                })

        download_url = qualities[0]['url'] if qualities else info.get('url', '')
        audio_url = audio_only[0].get('url') if audio_only else info.get('audio_url')

        # Handle images for carousels
        images = []
        entries = info.get('entries') or []
        if isinstance(entries, list):
            for i, entry in enumerate(entries):
                img_url = entry.get('url') or entry.get('thumbnail')
                if img_url:
                    images.append({
                        'id': f"img_{i}",
                        'url': img_url,
                        'thumbnail': img_url,
                    })

        return jsonify({
            'id': str(info.get('id') or 'media'),
            'title': info.get('title') or info.get('description', '')[:100] or 'Media Video',
            'url': url,
            'thumbnail': info.get('thumbnail') or (info.get('thumbnails', [{}])[-1].get('url') if info.get('thumbnails') else ''),
            'duration': round(info.get('duration') or 0),
            'author': info.get('uploader') or info.get('creator') or info.get('channel') or 'Creator',
            'description': info.get('description') or info.get('title', ''),
            'downloadUrl': download_url,
            'audioUrl': audio_url,
            'qualities': qualities if qualities else None,
            'images': images if images else None,
            'isPhotoCarousel': len(images) > 1,
            'platform': 'video',
        })

    except subprocess.TimeoutExpired:
        return jsonify({'error': 'Extraction timed out'}), 504
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    port = 5000
    print(f"[*] Starting yt-dlp microservice on port {port}...")
    app.run(host='0.0.0.0', port=port, threaded=True)
