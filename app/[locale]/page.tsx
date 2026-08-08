import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { items } from '@/app/api/live-schedules/data';
import { featuredHomeVideo } from '@/app/api/supporters/data';
import { isLocale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/get-dictionary';
import {
  getFeaturedPresentsEvent,
  getNextLiveSchedule,
  sortLiveSchedulesByNewest,
} from '@/lib/live-schedules';
import HomeContent from './home-content';

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dictionary = getDictionary(locale);

  return {
    title: dictionary.meta.homeTitle,
    description: dictionary.meta.homeDescription,
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const dictionary = getDictionary(localeParam);
  const liveScheduleItems = sortLiveSchedulesByNewest(items);
  const nextLiveItem = getNextLiveSchedule(items);
  const featuredPresentsItem = getFeaturedPresentsEvent(items);

  return (
    <HomeContent
      locale={localeParam}
      dictionary={dictionary}
      liveScheduleItems={liveScheduleItems}
      nextLiveItem={nextLiveItem}
      featuredPresentsItem={featuredPresentsItem}
      featuredHomeVideo={featuredHomeVideo}
    />
  );
}
