'use client';

import Image from 'next/image';
import Link from 'next/link';
import TuneCoreLink from '@/components/tunecore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import CalendarComponent from '@/components/ui/calender-component';
import { formatScheduleDate } from '@/lib/japan-date';
import { localizedPath, type Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n/dictionaries';
import {
  createReservationMessage,
  createReservationNotice,
  INSTAGRAM_PROFILE_URL,
} from '@/lib/reservation';
import type { LiveScheduleItem } from '@/types/live-schedule';

interface HomeContentProps {
  locale: Locale;
  dictionary: Dictionary;
  liveScheduleItems: LiveScheduleItem[];
  nextLiveItem: LiveScheduleItem | null;
  featuredPresentsItem: LiveScheduleItem | null;
  featuredHomeVideo: string | null;
}

export default function HomeContent({
  locale,
  dictionary,
  liveScheduleItems,
  nextLiveItem,
  featuredPresentsItem,
  featuredHomeVideo,
}: HomeContentProps) {
  const t = dictionary.home;

  return (
    <main className="flex min-h-screen flex-col items-center px-6 py-24 sm:px-14">
      <h1 className="sr-only">{t.siteTitle}</h1>

      <Image
        src="/images/top_header.jpg"
        alt={t.siteTitle}
        width={600}
        height={200}
        loading="eager"
        className="mb-10"
      />

      <section className="mb-10 w-full max-w-[620px]">
        <Card className="overflow-hidden border-white/20 bg-black">
          <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:gap-6 sm:p-6">
            <Image
              src="/images/new-album-yanamunu.png"
              alt={t.albumTitle}
              width={180}
              height={180}
              className="mx-auto w-[140px] rounded-md shadow-md sm:mx-0 sm:w-[180px]"
            />
            <div className="flex-1 text-center sm:text-left">
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-primary">
                {t.newAlbum}
              </p>
              <CardTitle className="mt-2 text-2xl font-extrabold sm:text-3xl">
                {t.albumTitle}
              </CardTitle>
              <p className="mt-2 text-sm text-muted-foreground">
                {t.albumReleaseDate}
              </p>
              <Button asChild className="mt-4 w-full sm:w-auto">
                <a
                  href="https://shop.thousandsrecords.jp/ca18/5680/p-r-s/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.viewDetails}
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <h2 className="mb-2 text-2xl font-bold tracking-tight">{t.liveInfo}</h2>

      <p>
        ※<span className="text-2xl text-red-500">■</span>
        {t.liveHint}
      </p>

      <CalendarComponent
        items={liveScheduleItems}
        locale={locale}
        dictionary={dictionary.calendar}
      />

      <section className="mb-6 w-full max-w-[860px]">
        {nextLiveItem ? (
          <LiveEventCard
            item={nextLiveItem}
            badge={t.nextLive}
            locale={locale}
            reserveLabel={t.reserveOnInstagram}
          />
        ) : (
          <NoLiveSchedule
            title={t.noLiveTitle}
            description={t.noLiveDescription}
          />
        )}
      </section>

      {featuredPresentsItem &&
      featuredPresentsItem.date !== nextLiveItem?.date ? (
        <section className="mb-10 w-full max-w-[860px]">
          <LiveEventCard
            item={featuredPresentsItem}
            badge={t.presents}
            locale={locale}
            reserveLabel={t.reserveOnInstagram}
          />
        </section>
      ) : null}

      <div className="mb-10 flex justify-center">
        <Button asChild className="px-8 pb-8 pt-8 text-lg font-bold">
          <Link href={localizedPath(locale, '/live-schedules')}>
            {t.viewAllSchedules}
          </Link>
        </Button>
      </div>

      <div className="mt-10 w-full max-w-[860px]">
        <div className="mb-2 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-bold tracking-tight">
            {t.supportersVideos}
          </h2>
          <Link
            href={localizedPath(locale, '/supporters-videos')}
            className="text-sm font-bold text-muted-foreground transition-colors hover:text-white"
          >
            {t.viewAll}
          </Link>
        </div>
        {featuredHomeVideo ? (
          <div className="overflow-hidden rounded-xl border border-white/20 bg-black shadow shadow-black/40">
            <iframe
              className="aspect-video w-full"
              src={featuredHomeVideo}
              title="Featured home video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : null}
        <div className="mt-4 flex justify-center">
          <Button asChild className="px-8 pb-8 pt-8 text-lg font-bold">
            <Link href={localizedPath(locale, '/supporters-videos')}>
              {t.viewAllVideos}
            </Link>
          </Button>
        </div>
      </div>

      <div className="mt-20 w-full max-w-[860px]">
        <h2 className="mb-2 text-2xl font-bold tracking-tight">{t.streaming}</h2>
        <div className="flex justify-center">
          <TuneCoreLink title={dictionary.streaming.title} />
        </div>
      </div>
    </main>
  );
}

function LiveEventCard({
  item,
  badge,
  locale,
  reserveLabel,
}: {
  item: LiveScheduleItem;
  badge: string;
  locale: Locale;
  reserveLabel: string;
}) {
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
    <Card className="overflow-hidden rounded-xl border border-white/20 bg-black shadow-2xl shadow-black/40">
      <CardContent className="grid gap-0 p-0 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
        {item.image && (
          <Link
            href={localizedPath(locale, `/live-schedules/${item.date}`)}
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
                {badge}
              </span>
              <time className="text-lg font-extrabold tracking-wide text-gray-200">
                {formatScheduleDate(item.date)}
              </time>
            </div>
            <CardTitle className="text-2xl font-extrabold leading-tight text-white sm:text-3xl">
              {item.title}
            </CardTitle>
            <p className="mt-5 hidden max-h-72 overflow-y-auto whitespace-pre-line border-t border-white/20 pt-5 pr-2 text-sm leading-7 text-gray-300 sm:block">
              {item.description}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              className="h-12 w-full rounded-lg text-base font-extrabold"
              onClick={handleReservationClick}
            >
              {reserveLabel}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function NoLiveSchedule({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Card className="border-dashed border-white/20 bg-black">
      <CardContent className="p-6 text-center">
        <CardTitle className="text-2xl font-extrabold">{title}</CardTitle>
        <p className="mt-3 text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
