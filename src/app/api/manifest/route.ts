import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const manifestPath = path.join(process.cwd(), 'public', 'manifest.json');
    const manifestContent = fs.readFileSync(manifestPath, 'utf8');
    
    return new NextResponse(manifestContent, {
      headers: {
        'Content-Type': 'application/manifest+json',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Error reading manifest.json:', error);
    return new NextResponse('Manifest not found', { status: 404 });
  }
} 