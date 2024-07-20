import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';

const TuneCoreLink: React.FC = () => {
  return (
    <a 
      href="https://www.tunecore.co.jp/artists?id=442280&lang=ja" 
      target="_blank" 
      rel="noopener noreferrer"
      className="block"
    >
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle>Hi-NOMADYを配信サイトで聴く</CardTitle>
        </CardHeader>
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
