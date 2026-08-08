import { items } from '@/app/api/live-schedules/data';
import { featuredHomeVideo } from '@/app/api/supporters/data';
import {
  getFeaturedPresentsEvent,
  getNextLiveSchedule,
  sortLiveSchedulesByNewest,
} from '@/lib/live-schedules';
import HomeContent from './home-content';

export const revalidate = 60;

export default function Home() {
  const liveScheduleItems = sortLiveSchedulesByNewest(items);
  const nextLiveItem = getNextLiveSchedule(items);
  const featuredPresentsItem = getFeaturedPresentsEvent(items);

  return (
    <HomeContent
      liveScheduleItems={liveScheduleItems}
      nextLiveItem={nextLiveItem}
      featuredPresentsItem={featuredPresentsItem}
      featuredHomeVideo={featuredHomeVideo}
    />
  );
}
