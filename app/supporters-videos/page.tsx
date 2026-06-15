import { supportersVideos } from '@/app/api/supporters/data';
import SupportersVideosContent from './supporters-videos-content';

export const metadata = {
  title: 'Supporter&apos;s Videos | Hi-NOMADY Official',
  description: 'Hi-NOMADY の Supporter&apos;s Videos をまとめて視聴できます。',
};

export default function SupportersVideosPage() {
  return <SupportersVideosContent videos={supportersVideos} />;
}
