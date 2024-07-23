import { NextResponse } from 'next/server';
import { youtubeVideos } from '@/app/api/youtubes/data';

export async function GET() {
  return NextResponse.json(youtubeVideos);
}
