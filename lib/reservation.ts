import type { LiveScheduleItem } from '@/types/live-schedule';

export const INSTAGRAM_PROFILE_URL = 'https://www.instagram.com/shoheitanahara/';

export function createReservationMessage(
  item: Pick<LiveScheduleItem, 'date' | 'title'>
) {
  return [
    '前売り予約お願いします。',
    `日程: ${item.date}`,
    `イベント: ${item.title}`,
    'お名前:',
    '枚数:',
  ].join('\n');
}

export function createReservationNotice(message: string, copied: boolean) {
  return [
    copied
      ? '以下の内容をコピーしました。'
      : 'コピーできませんでした。以下の内容をDMで送ってください。',
    'InstagramのDMに貼り付けて、お名前・枚数を入力して送信してください。',
    '----',
    message,
  ].join('\n');
}
