'use client';

import { useMemo, useState } from 'react';
import { Calendar } from '@/components/ui/calendar'; // ShadCNのカレンダーコンポーネントをインポート
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import type { LiveScheduleItem } from '@/types/live-schedule';

interface CalendarComponentProps {
  onDateSelect?: (date: Date) => void;
  items: LiveScheduleItem[];
}

export default function CalendarComponent({
  onDateSelect,
  items,
}: CalendarComponentProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<LiveScheduleItem | null>(null);

  const highlightedDates = useMemo(
    () =>
      items.map((item) => {
        const date = new Date(item.date);
        return new Date(date.getTime() - date.getTimezoneOffset() * 60000) // 日本時間に合わせる
          .toISOString()
          .split('T')[0];
      }),
    [items]
  );

  const handleDayClick = (selectedDate: Date) => {
    setDate(selectedDate);
    setData(null); // ダイアログを開く前にデータをリセット
    setOpen(true);
    onDateSelect?.(selectedDate);

    // APIを呼び出してデータを取得
    const adjustedDate = new Date(
      selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000
    );
    fetch(`/api/live-schedules/${adjustedDate.toISOString().split('T')[0]}`)
      .then((response) => {
        if (!response.ok) {
          setData({ title: 'ライブがありません。', description: '', date: '' });
        } else {
          return response.json();
        }
      })
      .then((fetchedData) => {
        if (fetchedData) {
          setData(fetchedData);
        }
      })
      .catch((error) => {
        console.error('Error fetching schedule data:', error);
        setData({ title: 'ライブがありません。', description: '', date: '' });
      });
  };

  return (
    <div className="w-full flex justify-center p-1 pt-4 pb-10">
      <Calendar
        mode="single"
        selected={date}
        onDayClick={handleDayClick}
        highlightedDates={highlightedDates}
      />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button onClick={() => {}} className="hidden" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] w-[90%] pt-10">
          <DialogHeader>
            <DialogTitle>{data ? data.title : 'Loading...'}</DialogTitle>
            <DialogDescription asChild>
              <div>
                {data ? (
                  <>
                    {data.image && (
                      <div className="relative w-full h-[300px] md:h-[500px] mb-2 rounded-lg p-20 overflow-hidden">
                        <Image
                          src={data.image}
                          alt={data.title}
                          className="rounded-lg object-contain"
                          fill
                          priority
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    )}
                    <p>{data.description}</p>
                  </>
                ) : (
                  <p>Loading...</p>
                )}
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
