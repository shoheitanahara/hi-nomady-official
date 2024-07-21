'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import TuneCoreLink from '@/components/tunecore';

export default function Home() {
  const [items, setItems] = useState<
    { title: string; description: string; date: string; image?: string }[]
  >([]);
  const [youtubeVideos, setYoutubeVideos] = useState<string[]>([]);
  const [supportersVideos, setSupportersVideos] = useState<string[]>([]);

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

    // YouTube動画のデータをフェッチ
    fetch('/api/youtubes')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setYoutubeVideos(data))
      .catch((error) => console.error('Error fetching YouTube videos:', error));

    // Supporters動画のデータをフェッチ
    fetch('/api/supporters')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setSupportersVideos(data))
      .catch((error) => console.error('Error fetching Supporters videos:', error));
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-14">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-10 md:mb-20">
        Hi-NOMADY Official Site
      </h1>

      <Carousel
        opts={{
          align: 'start',
        }}
        className="w-full max-w-[860px]"
      >
        <h2 className="text-2xl font-bold tracking-tight mb-2">ライブ情報</h2>
        <CarouselContent>
          {items.length === 0 ? (
            <NoLiveSchedule />
          ) : (
            items.map((item, index) => (
              <CarouselItem
                key={index}
                className="w-full basis-1/1 md:basis-1/2"
              >
                <div className="p-1">
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
                          className="rounded-lg object-cover"
                          fill
                          priority
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
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
              </CarouselItem>
            ))
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="mt-10">
        <h2 className="text-2xl font-bold tracking-tight mb-2">YouTube</h2>
        <Carousel
          opts={{
            align: 'start',
          }}
          className="w-full max-w-[860px]"
        >
          <CarouselContent>
            {youtubeVideos.map((videoUrl, index) => (
              <CarouselItem key={index} className="w-full basis-1/1 md:basis-1/2">
                <iframe
                  width="100%"
                  className="md:h-[315px] h-auto"
                  src={videoUrl}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold tracking-tight mb-2">Supporter&apos;s Videos</h2>
        <Carousel
          opts={{
            align: 'start',
          }}
          className="w-full max-w-[860px]"
        >
          <CarouselContent>
            {supportersVideos.map((videoUrl, index) => (
              <CarouselItem key={index} className="w-full basis-1/1 md:basis-1/2">
                <iframe
                  width="100%"
                  className="md:h-[315px] h-auto"
                  src={videoUrl}
                  title="Supporters video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <div className="mt-20 w-full max-w-[860px]">
        <h2 className="text-2xl font-bold tracking-tight mb-2">配信サイトで聴く</h2>
        <div className="flex justify-center">
          <TuneCoreLink />
        </div>
      </div>
    </main>
  );
}

function NoLiveSchedule() {
  return (
    <CarouselItem className="w-full basis-1/1 md:basis-1/2">
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
    </CarouselItem>
  );
}
