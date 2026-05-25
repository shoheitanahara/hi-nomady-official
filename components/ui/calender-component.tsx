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
import Link from 'next/link';
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
        <DialogContent className="flex max-h-[85vh] w-[90%] flex-col gap-0 overflow-hidden p-6 pt-10 sm:max-w-[425px]">
          <DialogHeader className="shrink-0 pr-8">
            <DialogTitle>{data ? data.title : 'Loading...'}</DialogTitle>
          </DialogHeader>
          <DialogDescription asChild>
            <div className="min-h-0 flex-1 overflow-y-auto pr-1">
              {data ? (
                <>
                  {data.image && (
                    <div className="relative mb-3 h-[220px] w-full overflow-hidden rounded-lg md:h-[360px]">
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
                  {data.description ? (
                    <p className="whitespace-pre-line leading-6 text-foreground">
                      {data.description}
                    </p>
                  ) : null}
                  {data.date ? (
                    <Button asChild variant="outline" className="mt-4 w-full">
                      <Link href={`/live-schedules/${data.date}`}>
                        詳細ページを見る
                      </Link>
                    </Button>
                  ) : null}
                </>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
}
