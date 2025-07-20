import { NextResponse } from 'next/server';
import { items } from './data'; // itemsを外部ファイルからインポート

export async function GET() {
  // すべてのアイテムを最新順に並べ替える
  const sortedItems = items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return NextResponse.json(sortedItems);
}
