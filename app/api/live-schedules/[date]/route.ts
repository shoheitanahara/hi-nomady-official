import { NextResponse } from 'next/server';
import { items } from '../data'; // itemsをインポート

export async function GET(request: Request, { params }: { params: { date: string } }) {
  const { date } = params;
  const item = items.find((item) => item.date === date);

  if (!item) {
    return NextResponse.json({ error: 'Item not found' }, { status: 404 });
  }

  return NextResponse.json(item);
}