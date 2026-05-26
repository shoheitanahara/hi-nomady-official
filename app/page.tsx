import { items } from '@/app/api/live-schedules/data';
import { supportersVideos } from '@/app/api/supporters/data';
import {
  getNextLiveSchedule,
  sortLiveSchedulesByNewest,
} from '@/lib/live-schedules';
import HomeContent from './home-content';

export const revalidate = 60;

export default function Home() {
  const liveScheduleItems = sortLiveSchedulesByNewest(items);
  const nextLiveItem = getNextLiveSchedule(items);

  return (
    <HomeContent
      liveScheduleItems={liveScheduleItems}
      nextLiveItem={nextLiveItem}
      supportersVideos={supportersVideos}
    />
  );
}
