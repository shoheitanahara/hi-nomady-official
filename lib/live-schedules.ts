import type { LiveScheduleItem } from '@/types/live-schedule';

export function sortLiveSchedulesByNewest(
  items: LiveScheduleItem[]
): LiveScheduleItem[] {
  return [...items].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
