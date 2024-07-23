import { NextResponse } from 'next/server';
import { supportersVideos } from './data';

export async function GET() {
  return NextResponse.json(supportersVideos);
}
