'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

interface ScheduleItem {
  title: string;
  description: string;
  date: string;
  image: string;
}

export default function LiveSchedulePage() {
  const { date } = useParams();
  const [item, setItem] = useState<ScheduleItem | null>(null);
  const [loading, setLoading] = useState(true);

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
    <main className="flex min-h-screen flex-col items-center p-6 max-w-3xl mx-auto">
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
            className="rounded-lg object-contain"
          />
        </div>
      )}
      <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {item?.description}
        </p>
        <p className="text-2xl text-black font-bold text-right">{item?.date}</p>
      </div>
    </main>
  );
}
