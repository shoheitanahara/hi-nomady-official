import { NextResponse } from 'next/server';
import { items } from './data'; // itemsを外部ファイルからインポート
import { sortLiveSchedulesByNewest } from '@/lib/live-schedules';

export async function GET() {
  // すべてのアイテムを最新順に並べ替える
  const sortedItems = sortLiveSchedulesByNewest(items);

  return NextResponse.json(sortedItems);
}
