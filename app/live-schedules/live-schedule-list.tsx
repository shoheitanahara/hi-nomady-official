'use client';

import Image from 'next/image';
import Link from 'next/link';
import CalendarComponent from '@/components/ui/calender-component';
import type { LiveScheduleItem } from '@/types/live-schedule';

interface LiveScheduleListProps {
  items: LiveScheduleItem[];
}

export default function LiveScheduleList({ items }: LiveScheduleListProps) {
  return (
    <main className="flex min-h-screen flex-col items-center px-6 py-24 sm:px-10">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-10 md:mb-20">
        ライブスケジュール
      </h1>

      <p>
        ※<span className="text-red-500 text-2xl">■</span>
        の日はライブがあります！
      </p>

      <CalendarComponent items={items} />

      <div className="w-full max-w-[860px] flex flex-wrap">
        {items.length === 0 ? (
          <NoLiveSchedule />
        ) : (
          items.map((item) => (
            <div key={item.date} className="w-full basis-full md:basis-1/2 p-1">
              <Link
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
                      className="rounded-lg object-cover"
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
                <p className="h-20 overflow-hidden whitespace-pre-line text-ellipsis font-normal text-gray-700 dark:text-gray-400">
                  {item.description}
                </p>
                <p className="text-2xl text-black font-bold text-right dark:text-white">
                  {item.date}
                </p>
              </Link>
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
