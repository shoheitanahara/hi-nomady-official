'use client';

import { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export default function Home() {
  const [items, setItems] = useState<
    { title: string; description: string; date: string }[]
  >([]);

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

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-20">
        Hi-NOMADY Official Site
      </h1>

      <Carousel
        opts={{
          align: 'start',
        }}
        className="w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold tracking-tight mb-2">ライブ情報</h2>

        <CarouselContent className="-ml-2 md:-ml-4 md:grid-cols-2 gap-4">
          {items.length === 0 ? (
            <CarouselItem className="pl-2 md:pl-4">
              <div className="p-1">
                <a
                  href="#"
                  className="block max-w-xs p-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                  <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    ライブ情報なし
                  </h2>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    ライブのお誘いおまちしております！
                    Instagramからご連絡ください！
                  </p>
                  <p className="font-normal text-gray-500 dark:text-gray-300">
                    {new Date().toLocaleDateString('ja-JP')}
                  </p>
                </a>
              </div>
            </CarouselItem>
          ) : (
            items.map((item, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4">
                <div className="p-1">
                  <a
                    href="#"
                    className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                  >
                    <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {item.title}
                    </h2>
                    <p className="font-normal text-gray-700 dark:text-gray-400 h-20 overflow-hidden text-ellipsis">
                      {item.description}
                    </p>
                    <p className="font-normal text-gray-500 text-right dark:text-gray-300">
                      {item.date}
                    </p>
                  </a>
                </div>
              </CarouselItem>
            ))
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </main>
  );
}
