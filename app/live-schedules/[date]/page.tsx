'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface ScheduleItem {
  title: string;
  description: string;
  date: string;
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
    <main className="flex min-h-screen flex-col items-center p-12 max-w-3xl mx-auto">
      <h2 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-10 md:mb-20 text-left">
        ライブ情報
      </h2>
      <h2 className="scroll-m-20 text-2xl font-bold tracking-tight lg:text-2xl mb-10 md:mb-20">
        {item?.title}
      </h2>
      <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {item?.description}
        </p>
        <p className="font-normal text-gray-500 dark:text-gray-300">
          {item?.date}
        </p>
      </div>
    </main>
  );
}