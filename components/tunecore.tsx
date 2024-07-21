import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

const TuneCoreLink: React.FC = () => {
  return (
    <a 
      href="https://www.tunecore.co.jp/artists?id=442280&lang=ja" 
      target="_blank" 
      rel="noopener noreferrer"
      className="block"
    >
      <Card className="hover:shadow-lg transition-shadow w-[100%] md:w-[400px]">
        <CardHeader>
          <CardTitle>Spotify, AppleMusicなどで配信中！</CardTitle>
        </CardHeader>
        <div className="relative w-full h-36 md:h-60">
          <Image 
            src="/images/streaming.jpg" 
            alt="Streaming" 
            fill
            sizes="(max-width: 768px) 100vw, 400px" 
            className="rounded-t-lg object-cover object-center"
          />
        </div>
        <CardContent>
          <p className="text-gray-700 dark:text-gray-300">
            TuneCore Artist Page
          </p>
        </CardContent>
      </Card>
    </a>
  );
};

export default TuneCoreLink;
