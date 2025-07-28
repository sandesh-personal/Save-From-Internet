import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const faviconPath = path.join(process.cwd(), 'public', 'favicon.ico');
    const faviconBuffer = fs.readFileSync(faviconPath);
    
    return new NextResponse(faviconBuffer, {
      headers: {
        'Content-Type': 'image/x-icon',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (error) {
    console.error('Error reading favicon.ico:', error);
    return new NextResponse('Favicon not found', { status: 404 });
  }
} 