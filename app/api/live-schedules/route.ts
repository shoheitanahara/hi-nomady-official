import { NextResponse } from 'next/server';

export async function GET() {
  const currentDate = new Date();
  const items = [
    {
      title: '@東京 THE METEORS JAPAN TOUR 2024 In Cooperation with Vinyl Japan',
      description:
        '40年以上の活動実績を誇り、世界各地に親衛隊World Wide Wrecking Crew(WWWC)を擁する、 PSYCHOBILLY界の崇高なまでの独立峰。 THE METEORS 5年ぶりの来日ツアー決定! PSYCHOBILLY代表曲中の代表曲「WRECKIN CREW」が再び日本で奏でられる! O.T.M.A.P.P. Only The Meteors Are Pure Psychobilly!!',
      date: '2024-09-21',
    },
    {
      title: '@宮古島 GoodLuck',
      description:
        '詳細未定！',
      date: '2024-10-19',
    },
    {
      title: 'Comming Soon',
      description: '',
      date: '2024-12-31',
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
