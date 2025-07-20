'use client';

import { useEffect, useState } from 'react';
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

interface CalendarComponentProps {
  onDateSelect: (date: Date) => void;
}

export default function CalendarComponent({ onDateSelect }: CalendarComponentProps) {
  const [items, setItems] = useState<
    { title: string; description: string; date: string; image?: string }[]
  >([]);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    // バックエンドからデータをフェッチ
    fetch('/api/live-schedules')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setItems(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const highlightedDates = items.map((item) => {
    const date = new Date(item.date);
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000) // 日本時間に合わせる
      .toISOString()
      .split('T')[0];
  });

  const handleDateSelectInternal = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;
    setDate(selectedDate);
    setData(null); // ダイアログを開く前にデータをリセット
    setOpen(true);
    onDateSelect(selectedDate);

    // APIを呼び出してデータを取得
    const adjustedDate = new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000);
    fetch(`/api/live-schedules/${adjustedDate.toISOString().split('T')[0]}`)
      .then((response) => {
        if (!response.ok) {
          setData({ title: 'ライブがありません。', description: '' });
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
        setData({ title: 'ライブがありません。', description: '' });
      });
  };

  return (
    <div className="w-full flex justify-center p-1 pb-10">
      <Calendar
        mode="single"
        selected={date}
        onSelect={handleDateSelectInternal}
        className="rounded-md border max-w-md"
        highlightedDates={highlightedDates}
      />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button onClick={() => {}} className="hidden" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] w-[90%] pt-10">
          <DialogHeader>
            <DialogTitle>{data ? data.title : 'Loading...'}</DialogTitle>
            <DialogDescription>
              {data ? (
                <div>
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
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
