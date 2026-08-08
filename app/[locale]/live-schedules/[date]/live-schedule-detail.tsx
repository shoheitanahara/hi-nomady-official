'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { formatScheduleDate } from '@/lib/japan-date';
import type { Dictionary } from '@/lib/i18n/dictionaries';
import {
  createReservationMessage,
  createReservationNotice,
  INSTAGRAM_PROFILE_URL,
} from '@/lib/reservation';
import type { LiveScheduleItem } from '@/types/live-schedule';

interface LiveScheduleDetailProps {
  dictionary: Dictionary['liveSchedules'];
}

export default function LiveScheduleDetail({
  dictionary,
}: LiveScheduleDetailProps) {
  const params = useParams();
  const date = params?.date;
  const [item, setItem] = useState<LiveScheduleItem | null>(null);
  const [loading, setLoading] = useState(true);

  const handleReservationClick = async () => {
    if (!item) return;

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

  useEffect(() => {
    if (!date || Array.isArray(date)) {
      return;
    }

    let cancelled = false;

    fetch(`/api/live-schedules/${date}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (cancelled) return;
        setItem(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        if (cancelled) return;
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [date]);

  if (!date || Array.isArray(date)) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="ml-4 text-xl font-semibold">Not found</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="ml-4 text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center px-6 py-24">
      <h1 className="mb-10 text-4xl font-extrabold md:mb-20 lg:text-5xl">
        {dictionary.detailTitle}
      </h1>
      <h2 className="mb-10 scroll-m-20 text-2xl font-bold tracking-tight md:mb-20 lg:text-2xl">
        {item?.title}
      </h2>
      {item?.image && (
        <div className="relative mb-10 h-0 w-full overflow-hidden rounded-lg pb-[100%] shadow-lg md:pb-[75%]">
          <Image
            src={item.image}
            alt={item.title}
            fill
            priority
            className="rounded-lg object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
          />
        </div>
      )}
      <div className="w-full rounded-lg border border-white/20 bg-black p-4 shadow shadow-black/40">
        <p className="whitespace-pre-line font-normal leading-7 text-gray-700 dark:text-gray-400">
          {item?.description}
        </p>
        <p className="text-right text-2xl font-bold text-black dark:text-white">
          {item?.date ? formatScheduleDate(item.date) : ''}
        </p>
      </div>
      {item && (
        <div className="mt-8 w-full rounded-lg border border-white/20 bg-black p-4 shadow shadow-black/40">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {dictionary.advanceTicket}
          </h3>
          <p className="mt-2 text-sm leading-6 text-gray-700 dark:text-gray-400">
            {dictionary.advanceTicketDescription}
          </p>
          <Button
            className="mt-4 w-full sm:w-auto"
            onClick={handleReservationClick}
          >
            {dictionary.reserveOnInstagram}
          </Button>
        </div>
      )}
    </main>
  );
}
