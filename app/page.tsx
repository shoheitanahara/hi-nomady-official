import { items } from '@/app/api/live-schedules/data';
import { supportersVideos } from '@/app/api/supporters/data';
import { sortLiveSchedulesByNewest } from '@/lib/live-schedules';
import HomeContent from './home-content';

export default function Home() {
  const liveScheduleItems = sortLiveSchedulesByNewest(items);

  return (
    <HomeContent
      liveScheduleItems={liveScheduleItems}
      supportersVideos={supportersVideos}
    />
  );
}
