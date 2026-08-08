'use client';

import Image from 'next/image';
import Link from 'next/link';
import CalendarComponent from '@/components/ui/calender-component';
import { formatScheduleDate } from '@/lib/japan-date';
import { localizedPath, type Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n/dictionaries';
import type { LiveScheduleItem } from '@/types/live-schedule';

interface LiveScheduleListProps {
  items: LiveScheduleItem[];
  locale: Locale;
  dictionary: Dictionary;
}

export default function LiveScheduleList({
  items,
  locale,
  dictionary,
}: LiveScheduleListProps) {
  const t = dictionary.liveSchedules;

  return (
    <main className="flex min-h-screen flex-col items-center px-6 py-24 sm:px-10">
      <h1 className="mb-10 scroll-m-20 text-4xl font-extrabold tracking-tight md:mb-20 lg:text-5xl">
        {t.title}
      </h1>

      <p>
        ※<span className="text-2xl text-red-500">■</span>
        {t.liveHint}
      </p>

      <CalendarComponent
        items={items}
        locale={locale}
        dictionary={dictionary.calendar}
      />

      <div className="flex w-full max-w-[860px] flex-wrap">
        {items.length === 0 ? (
          <NoLiveSchedule
            title={t.noLiveTitle}
            description={t.noLiveDescription}
          />
        ) : (
          items.map((item) => (
            <div key={item.date} className="w-full basis-full p-1 md:basis-1/2">
              <Link
                href={localizedPath(locale, `/live-schedules/${item.date}`)}
                className="block max-w-sm rounded-lg border border-white/20 bg-black p-6 shadow shadow-black/40 transition-colors hover:bg-white/5"
              >
                <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {item.title}
                </h2>
                {item.image && (
                  <div className="relative mb-2 h-40 w-full overflow-hidden rounded-lg">
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
                <p className="h-20 overflow-hidden text-ellipsis whitespace-pre-line font-normal text-gray-700 dark:text-gray-400">
                  {item.description}
                </p>
                <p className="text-right text-2xl font-bold text-black dark:text-white">
                  {formatScheduleDate(item.date)}
                </p>
              </Link>
            </div>
          ))
        )}
      </div>
    </main>
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
    <div className="w-full basis-full p-1 md:basis-1/2">
      <div className="p-1">
        <div className="block max-w-xs rounded-lg border border-white/20 bg-black p-4 shadow shadow-black/40 transition-colors hover:bg-white/5">
          <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h2>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
