import type { LiveScheduleItem } from '@/types/live-schedule';

/** トップ固定の自主企画（開催日を過ぎたら自動で非表示） */
export const FEATURED_PRESENTS_EVENT_DATE = '2026-10-03';

function getJapanTodayDateString() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date());

  const year = parts.find((part) => part.type === 'year')?.value;
  const month = parts.find((part) => part.type === 'month')?.value;
  const day = parts.find((part) => part.type === 'day')?.value;

  return `${year}-${month}-${day}`;
}

export function sortLiveSchedulesByNewest(
  items: LiveScheduleItem[]
): LiveScheduleItem[] {
  return [...items].sort((a, b) => b.date.localeCompare(a.date));
}

export function getNextLiveSchedule(
  items: LiveScheduleItem[]
): LiveScheduleItem | null {
  const today = getJapanTodayDateString();

  return (
    [...items]
      .filter((item) => item.date >= today)
      .sort((a, b) => a.date.localeCompare(b.date))[0] ?? null
  );
}

/** トップ固定の自主企画。開催日を過ぎている場合は null。 */
export function getFeaturedPresentsEvent(
  items: LiveScheduleItem[]
): LiveScheduleItem | null {
  const today = getJapanTodayDateString();
  const item = items.find(
    (schedule) => schedule.date === FEATURED_PRESENTS_EVENT_DATE
  );

  if (!item || item.date < today) {
    return null;
  }

  return item;
}
