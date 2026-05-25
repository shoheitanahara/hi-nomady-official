'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import type { LiveScheduleItem } from '@/types/live-schedule';

const INSTAGRAM_DM_URL = 'https://ig.me/m/shohei.tanahara';

export default function LiveSchedulePage() {
  const { date } = useParams();
  const [item, setItem] = useState<LiveScheduleItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [reservationStatus, setReservationStatus] = useState('');

  const handleReservationClick = async () => {
    if (!item) return;

    const message = [
      '前売り予約お願いします。',
      '',
      `日程: ${item.date}`,
      `イベント: ${item.title}`,
      'お名前:',
      '枚数:',
    ].join('\n');

    try {
      await navigator.clipboard.writeText(message);
      setReservationStatus('予約文をコピーしました。Instagram DMに貼り付けて送信してください。');
    } catch (error) {
      console.error('Failed to copy reservation message:', error);
      setReservationStatus('Instagram DMで日程・お名前・枚数を送ってください。');
    }

    window.open(INSTAGRAM_DM_URL, '_blank', 'noopener,noreferrer');
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
      <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <p className="whitespace-pre-line font-normal leading-7 text-gray-700 dark:text-gray-400">
          {item?.description}
        </p>
        <p className="text-2xl text-black font-bold text-right dark:text-white">
          {item?.date}
        </p>
      </div>
      {item && (
        <div className="mt-8 w-full rounded-lg border border-gray-200 bg-white p-4 shadow dark:border-gray-700 dark:bg-gray-800">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            前売り予約
          </h3>
          <p className="mt-2 text-sm leading-6 text-gray-700 dark:text-gray-400">
            ボタンを押すと予約文をコピーして、Instagram DMを開きます。
          </p>
          <Button className="mt-4 w-full sm:w-auto" onClick={handleReservationClick}>
            Instagram DMで予約する
          </Button>
          {reservationStatus && (
            <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
              {reservationStatus}
            </p>
          )}
        </div>
      )}
    </main>
  );
}
