import { items } from '@/app/api/live-schedules/data';
import { sortLiveSchedulesByNewest } from '@/lib/live-schedules';
import LiveScheduleList from './live-schedule-list';

export default function LiveSchedule() {
  const liveScheduleItems = sortLiveSchedulesByNewest(items);

  return <LiveScheduleList items={liveScheduleItems} />;
}
