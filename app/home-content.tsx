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
import {
  createReservationMessage,
  createReservationNotice,
  INSTAGRAM_PROFILE_URL,
} from '@/lib/reservation';
import type { LiveScheduleItem } from '@/types/live-schedule';

interface HomeContentProps {
  liveScheduleItems: LiveScheduleItem[];
  nextLiveItem: LiveScheduleItem | null;
  supportersVideos: string[];
}

export default function HomeContent({
  liveScheduleItems,
  nextLiveItem,
  supportersVideos,
}: HomeContentProps) {
  return (
    <main className="flex min-h-screen flex-col items-center px-6 py-24 sm:px-14">
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

      <section className="mb-10 w-full max-w-[860px]">
        {nextLiveItem ? (
          <NextLiveCard item={nextLiveItem} />
        ) : (
          <NoLiveSchedule />
        )}
      </section>

      <div className="mb-10 flex justify-center">
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

function NextLiveCard({ item }: { item: LiveScheduleItem }) {
  const handleReservationClick = async () => {
    const message = createReservationMessage(item);
    let copied = false;

    try {
      await navigator.clipboard.writeText(message);
      copied = true;
    } catch (error) {
      console.error('Failed to copy reservation message:', error);
    }

    window.alert(createReservationNotice(message, copied));
    window.location.href = INSTAGRAM_PROFILE_URL;
  };

  return (
    <Card className="overflow-hidden rounded-xl border border-[#273041] bg-[#060b15] shadow-2xl shadow-black/40">
      <CardContent className="grid gap-0 p-0 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
        {item.image && (
          <Link
            href={`/live-schedules/${item.date}`}
            className="relative block aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-[340px]"
          >
            <Image
              src={item.image}
              alt={item.title}
              className="object-contain p-4 transition-transform duration-300 hover:scale-105"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 430px"
            />
          </Link>
        )}

        <div className="flex flex-col justify-between gap-6 p-6 md:p-8">
          <div>
            <div className="mb-4 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <span className="rounded-full bg-red-600 px-4 py-1 text-[10px] font-extrabold uppercase tracking-[0.28em] text-white">
                Next Live
              </span>
              <time className="text-lg font-extrabold tracking-wide text-blue-200">
                {item.date}
              </time>
            </div>
            <CardTitle className="text-2xl font-extrabold leading-tight text-white sm:text-3xl">
              {item.title}
            </CardTitle>
            <p className="mt-5 hidden max-h-72 overflow-y-auto whitespace-pre-line border-t border-white/10 pt-5 pr-2 text-sm leading-7 text-gray-300 sm:block">
              {item.description}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              className="h-12 w-full rounded-lg text-base font-extrabold"
              onClick={handleReservationClick}
            >
              Instagramで予約する
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function NoLiveSchedule() {
  return (
    <Card className="border-dashed border-primary/30 bg-card/80">
      <CardContent className="p-6 text-center">
        <CardTitle className="text-2xl font-extrabold">
          ライブ情報なし
        </CardTitle>
        <p className="mt-3 text-muted-foreground">
          ライブのお誘いおまちしております！ Instagramからご連絡ください！
        </p>
      </CardContent>
    </Card>
  );
}
