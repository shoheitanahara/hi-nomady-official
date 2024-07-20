import { NextResponse } from 'next/server';
import { members } from './data';

export async function GET() {
  return NextResponse.json(members);
}
