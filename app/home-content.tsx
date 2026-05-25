'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import TuneCoreLink from '@/components/tunecore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import CalendarComponent from '@/components/ui/calender-component';
import type { LiveScheduleItem } from '@/types/live-schedule';

interface HomeContentProps {
  liveScheduleItems: LiveScheduleItem[];
  supportersVideos: string[];
}

export default function HomeContent({
  liveScheduleItems,
  supportersVideos,
}: HomeContentProps) {
  return (
    <main className="flex min-h-screen flex-col items-center px-14 py-24">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl md:mb-10">
        Hi-NOMADY Official Site
      </h1>

      <Image
        src="/images/top_header.jpg"
        alt="Top Header"
        width={600}
        height={200}
        loading="eager"
        className="mb-10"
      />

      <h2 className="text-2xl font-bold tracking-tight mb-2">ライブ情報</h2>

      <p>
        ※<span className="text-red-500 text-2xl">■</span>
        の日はライブがあります！
      </p>

      <CalendarComponent items={liveScheduleItems} />

      <Carousel
        opts={{
          align: 'start',
        }}
        className="w-full max-w-[860px]"
      >
        <CarouselContent>
          {liveScheduleItems.length === 0 ? (
            <NoLiveSchedule />
          ) : (
            liveScheduleItems.map((item) => (
              <CarouselItem
                key={item.date}
                className="w-full basis-1/1 md:basis-1/2"
              >
                <div className="p-1">
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
                    <p className="font-normal text-gray-700 dark:text-gray-400 h-20 overflow-hidden text-ellipsis">
                      {item.description}
                    </p>
                    <p className="text-2xl text-black font-bold text-right dark:text-white">
                      {item.date}
                    </p>
                  </Link>
                </div>
              </CarouselItem>
            ))
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="flex justify-center mb-10">
        <Button className="text-lg font-bold pt-8 pb-8 px-8">
          <Link href="/live-schedules">スケジュールをすべて見る</Link>
        </Button>
      </div>

      <section className="mt-4 w-full max-w-[620px]">
        <Card className="overflow-hidden border-primary/20">
          <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:gap-6 sm:p-6">
            <Image
              src="/images/new-album-yanamunu.png"
              alt="HI-NOMADY ヤナムヌ ジャケット"
              width={180}
              height={180}
              className="mx-auto w-[140px] rounded-md shadow-md sm:mx-0 sm:w-[180px]"
            />
            <div className="flex-1 text-center sm:text-left">
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-primary">
                New Album
              </p>
              <CardTitle className="mt-2 text-2xl font-extrabold sm:text-3xl">
                HI-NOMADY - ヤナムヌ
              </CardTitle>
              <p className="mt-2 text-sm text-muted-foreground">
                一般発売日: 6月17日（水）
              </p>
              <Button asChild className="mt-4 w-full sm:w-auto">
                <a
                  href="http://ameblo.jp/thousandsrecords-ameba/entry-12964437887.html?frm=theme"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  詳細を見る
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <div className="mt-10 w-full max-w-[860px]">
        <h2 className="text-2xl font-bold tracking-tight mb-2">
          Supporter&apos;s Videos
        </h2>
        <Carousel
          opts={{
            align: 'start',
          }}
          className="w-full max-w-[860px]"
        >
          <CarouselContent>
            {supportersVideos.map((videoUrl) => (
              <CarouselItem key={videoUrl} className="basis-full md:basis-1/2">
                <div className="w-full overflow-hidden rounded-lg">
                  <iframe
                    className="aspect-video w-full"
                    src={videoUrl}
                    title="Supporters video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <div className="mt-20 w-full max-w-[860px]">
        <h2 className="text-2xl font-bold tracking-tight mb-2">
          配信サイトで聴く
        </h2>
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
