import { notFound } from 'next/navigation';
import { isLocale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/get-dictionary';
import LiveScheduleDetail from './live-schedule-detail';

export default async function LiveScheduleDatePage({
  params,
}: {
  params: Promise<{ locale: string; date: string }>;
}) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const dictionary = getDictionary(localeParam);

  return <LiveScheduleDetail dictionary={dictionary.liveSchedules} />;
}
