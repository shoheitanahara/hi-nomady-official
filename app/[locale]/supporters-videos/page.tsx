import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { supportersVideos } from '@/app/api/supporters/data';
import { isLocale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/get-dictionary';
import SupportersVideosContent from './supporters-videos-content';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dictionary = getDictionary(locale);

  return {
    title: dictionary.meta.supportersVideosTitle,
    description: dictionary.meta.supportersVideosDescription,
  };
}

export default async function SupportersVideosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const dictionary = getDictionary(localeParam);

  return (
    <SupportersVideosContent
      videos={supportersVideos}
      dictionary={dictionary.supportersVideos}
    />
  );
}
