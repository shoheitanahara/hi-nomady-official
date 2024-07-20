import { NextResponse } from 'next/server';
import { items } from './data'; // itemsを外部ファイルからインポート

export async function GET() {
  const currentDate = new Date();

  const filteredItems = items.filter(
    (item) => new Date(item.date) >= currentDate
  );

  return NextResponse.json(filteredItems);
}
