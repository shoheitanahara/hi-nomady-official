'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Calendar } from '@/components/ui/calendar'; // ShadCNのカレンダーコンポーネントをインポート
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

function DialogDemo({
  open,
  setOpen,
  selectedDate,
}: {
  onDateSelect: (date: Date) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedDate: Date | undefined; // selectedDateを受け取る
}) {
  const [data, setData] = useState<any>(null); // データを格納するための状態

  useEffect(() => {
    if (selectedDate) {
      // selectedDateが存在する場合にAPIを呼び出す
      const date = new Date(selectedDate);
      const adjustedDate = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
      ); // 日本時間に合わせる

      fetch(`/api/live-schedules/${adjustedDate.toISOString().split('T')[0]}`)
        .then((response) => {
          if (!response.ok) {
            // 404エラーの場合
            setData({ title: 'ライブがありません。', description: '' }); // デフォルトメッセージ
          } else {
            return response.json(); // 成功した場合はJSONを返す
          }
        })
        .then((fetchedData) => {
          if (fetchedData) {
            setData(fetchedData); // 取得したデータを状態に保存
          }
        })
        .catch((error) => {
          console.error('Error fetching schedule data:', error);
          setData({ title: 'ライブがありません。', description: '' }); // エラー時のデフォルトメッセージ
        });
    } else {
      setData(null); // selectedDateがない場合はデータをリセット
    }
  }, [selectedDate]); // selectedDateが変更されたときに実行

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => {}} className="hidden" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] w-[90%] pt-10">
        <DialogHeader>
          <DialogTitle>{data ? data.title : 'Loading...'}</DialogTitle>{' '}
          {/* データが取得中の場合はLoadingを表示 */}
          <DialogDescription>
            {data ? (
              <div>
                {/* 取得したデータを表示 */}
                {data.image && ( // 画像が存在する場合のみ表示
                  <div
                    className="
                    relative
                    w-full
                    h-[300px] md:h-[500px]
                    mb-2
                    rounded-lg 
                    p-20
                    overflow-hidden"
                  >
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
              <p>Loading...</p> // データが取得中の場合
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default function LiveSchedule() {
  const [items, setItems] = useState<
    { title: string; description: string; date: string; image?: string }[]
  >([]);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [open, setOpen] = useState(false);

  const handleDateSelect = (selectedDate: Date) => {
    setDate(selectedDate); // 日付を更新
    setOpen(true); // ダイアログを開く
  };

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
  }); // ハイライトする日付のリストを作成

  return (
    <main className="flex min-h-screen flex-col items-center px-10 py-24">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-10 md:mb-20">
        ライブスケジュール
      </h1>

      <p>
        ※<span className="text-red-500 text-2xl">■</span>
        の日はライブがあります！
      </p>
      <div className="w-full flex justify-center p-1 pb-10">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(selectedDate) => {
            if (selectedDate) {
              // selectedDateがundefinedでないことを確認
              handleDateSelect(selectedDate); // handleDateSelectを呼び出す
            }
          }} // URL遷移を行うハンドラを渡す
          className="rounded-md border max-w-md"
          highlightedDates={highlightedDates} // ハイライトする日付を渡す
        />
      </div>

      <DialogDemo
        onDateSelect={handleDateSelect}
        open={open}
        setOpen={(isOpen) => {
          setOpen(isOpen);
          if (!isOpen) {
            setDate(undefined); // 閉じられたときにselectedDateをnullに設定して、同日を再選択できるようにする
          }
        }}
        selectedDate={date}
      />

      <div className="w-full max-w-[860px] flex flex-wrap">
        {items.length === 0 ? (
          <NoLiveSchedule />
        ) : (
          items.map((item, index) => (
            <div key={index} className="w-full basis-full md:basis-1/2 p-1">
              <a
                href={`/live-schedules/${item.date}`}
                className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {item.title}
                </h2>
                {item.image && (
                  <div className="relative w-full h-40 mb-2 rounded-lg overflow-hidden">
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
                <p className="font-normal text-gray-700 dark:text-gray-400 h-20 overflow-hidden text-ellipsis">
                  {item.description}
                </p>
                <p className="text-2xl text-black font-bold text-right dark:text-white">
                  {item.date}
                </p>
              </a>
            </div>
          ))
        )}
      </div>
    </main>
  );
}

function NoLiveSchedule() {
  return (
    <div className="w-full basis-full md:basis-1/2 p-1">
      <div className="p-1">
        <div className="block max-w-xs p-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            ライブ情報なし
          </h2>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            ライブのお誘いおまちしております！ Instagramからご連絡ください！
          </p>
          <p className="text-2xl text-black font-bold text-right dark:text-white">
            {new Date().toLocaleDateString('ja-JP')}
          </p>
        </div>
      </div>
    </div>
  );
}