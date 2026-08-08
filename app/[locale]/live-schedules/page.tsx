import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { items } from '@/app/api/live-schedules/data';
import { isLocale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/get-dictionary';
import { sortLiveSchedulesByNewest } from '@/lib/live-schedules';
import LiveScheduleList from './live-schedule-list';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dictionary = getDictionary(locale);

  return {
    title: dictionary.meta.liveSchedulesTitle,
  };
}

export default async function LiveSchedulePage({
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

  return (
    <LiveScheduleList
      items={liveScheduleItems}
      locale={localeParam}
      dictionary={dictionary}
    />
  );
}
