'use client'

import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Member {
  name: string; 
  twitter: string;
  instagram: string;
  facebook: string;
}

const Members: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch('/api/members');
        const data = await response.json();
        setMembers(data);
      } catch (error) {
        console.error('メンバーの取得に失敗しました', error);
      }
    };

    fetchMembers();
  }, []);

  return (
    <div className="container px-2 md:px-48 mt-10 mx-auto">
      <h1 className="text-3xl font-bold mb-4">メンバーのSNSリンク集</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map((member, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{member.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul>
                <li className="mb-2">
                  <Button asChild variant="twitter">
                    <a href={member.twitter} target="_blank" rel="noopener noreferrer">
                      Twitter
                    </a>
                  </Button>
                </li>
                <li className="mb-2">
                  <Button asChild variant="instagram">
                    <a href={member.instagram} target="_blank" rel="noopener noreferrer">
                      Instagram
                    </a>
                  </Button>
                </li>
                <li className="mb-2">
                  <Button asChild variant="facebook">
                    <a href={member.facebook} target="_blank" rel="noopener noreferrer">
                      Facebook
                    </a>
                  </Button>
                </li>
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Members;