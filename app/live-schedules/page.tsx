'use client';

import { useEffect, useState } from 'react';
import Image from "next/image";
import { Calendar } from '@/components/ui/calendar'; // ShadCNのカレンダーコンポーネントをインポート

export default function LiveSchedule() {
  const [items, setItems] = useState<
    { title: string; description: string; date: string; image?: string }[]
  >([]);
  const [date, setDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    // バックエンドからデータをフェッチ
    fetch('/api/live-schedules')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setItems(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const highlightedDates = items.map((item) => {
    const date = new Date(item.date);
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000) // 日本時間に合わせる
      .toISOString()
      .split('T')[0];
  }); // ハイライトする日付のリストを作成

  return (
    <main className="flex min-h-screen flex-col items-center p-14">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-10 md:mb-20">
        ライブスケジュール
      </h1>

      <p>※<span className="text-red-500 text-2xl">■</span>の日はライブがあります！</p>
      <div className="w-full flex justify-center p-1">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate} // URL遷移を行うハンドラを渡す
          className="rounded-md border max-w-md"
          highlightedDates={highlightedDates} // ハイライトする日付を渡す
        />
      </div>

      <div className="w-full max-w-[860px] flex flex-wrap">
        {items.length === 0 ? (
          <NoLiveSchedule />
        ) : (
          items.map((item, index) => (
            <div key={index} className="w-full basis-full md:basis-1/2 p-1">
              <a
                href={`/live-schedules/${item.date}`}
                className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {item.title}
                </h2>
                {item.image && (
                  <div className="relative w-full h-40 mb-2 rounded-lg overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      className="rounded-lg"
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{
                        objectFit: "cover"
                      }} />
                  </div>
                )}
                <p className="font-normal text-gray-700 dark:text-gray-400 h-20 overflow-hidden text-ellipsis">
                  {item.description}
                </p>
                <p className="text-2xl text-black font-bold text-right dark:text-white">
                  {item.date}
                </p>
              </a>
            </div>
          ))
        )}
      </div>
    </main>
  );
}

function NoLiveSchedule() {
  return (
    <div className="w-full basis-full md:basis-1/2 p-1">
      <div className="p-1">
        <div className="block max-w-xs p-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            ライブ情報なし
          </h2>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            ライブのお誘いおまちしております！ Instagramからご連絡ください！
          </p>
          <p className="text-2xl text-black font-bold text-right dark:text-white">
            {new Date().toLocaleDateString('ja-JP')}
          </p>
        </div>
      </div>
    </div>
  );
}
