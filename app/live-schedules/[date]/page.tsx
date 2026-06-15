'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { formatScheduleDate } from '@/lib/japan-date';
import {
  createReservationMessage,
  createReservationNotice,
  INSTAGRAM_PROFILE_URL,
} from '@/lib/reservation';
import type { LiveScheduleItem } from '@/types/live-schedule';

export default function LiveSchedulePage() {
  const { date } = useParams();
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
    if (date) {
      fetch(`/api/live-schedules/${date}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setItem(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    }
  }, [date]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="ml-4 text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center px-6 max-w-3xl mx-auto py-24">
      <h1 className="text-4xl font-extrabold lg:text-5xl mb-10 md:mb-20">
        ライブ情報
      </h1>
      <h2 className="scroll-m-20 text-2xl font-bold tracking-tight lg:text-2xl mb-10 md:mb-20">
        {item?.title}
      </h2>
      {item?.image && (
        <div className="w-full h-0 pb-[100%] md:pb-[75%] mb-10 rounded-lg shadow-lg overflow-hidden relative">
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
        <p className="text-2xl text-black font-bold text-right dark:text-white">
          {item?.date ? formatScheduleDate(item.date) : ''}
        </p>
      </div>
      {item && (
        <div className="mt-8 w-full rounded-lg border border-white/20 bg-black p-4 shadow shadow-black/40">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            前売り予約
          </h3>
          <p className="mt-2 text-sm leading-6 text-gray-700 dark:text-gray-400">
            ボタンを押すと予約文がコピーされ、Instagramプロフィールを開きます。
            DMに貼り付けて、お名前・枚数を入力して送信してください。
          </p>
          <Button
            className="mt-4 w-full sm:w-auto"
            onClick={handleReservationClick}
          >
            Instagramで予約する
          </Button>
        </div>
      )}
    </main>
  );
}
