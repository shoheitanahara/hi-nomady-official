import { NextResponse } from 'next/server';

export async function GET() {
  const currentDate = new Date();
  const items = [
    {
      title: 'Noteworthy technology acquisitions 2021',
      description:
        'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
      date: '2024-12-31',
    },
    {
      title: 'Another notable acquisition',
      description: 'Details about another notable acquisition.Details about another notable acquisition.Details about another notable acquisition.Details about another notable acquisition.Details about another notable acquisition.Details about another notable acquisition.Details about another notable acquisition.Details about another notable acquisition.Details about another notable acquisition.Details about another notable acquisition.Details about another notable acquisition.Details about another notable acquisition.Details about another notable acquisition.',
      date: '2024-11-30',
    },
    {
      title: 'Yet another acquisition',
      description: 'Details about yet another acquisition.',
      date: '2024-10-15',
    },
    // 他のアイテムを追加
  ];

  // const items = [
  // ];

  const filteredItems = items.filter(
    (item) => new Date(item.date) >= currentDate
  );

  return NextResponse.json(filteredItems);
}
