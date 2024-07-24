import { NextResponse } from 'next/server';
import { supportersVideos } from './data';

export async function GET() {
  // supportersVideosをランダムにシャッフル
  const shuffledVideos = supportersVideos.sort(() => Math.random() - 0.5);

  return NextResponse.json(shuffledVideos);
}
