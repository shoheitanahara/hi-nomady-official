'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

const Header: FC = () => {
  return (
    <header className="bg-black shadow-md h-14 flex items-center px-4 fixed top-0 left-0 w-full z-50">
      <div className="flex w-full items-center justify-between">
        <Link href="/">
          <Image
            src="/images/hi-nomady_logo.png"
            alt="icon"
            width={126}
            height={32}
            loading="eager"
            className="h-8 w-32 mr-2 cursor-pointer"
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        </Link>
        <NavigationMenu className="flex h-full items-center justify-end">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>メニュー</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[200px] md:w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <Link href="/live-schedules">ライブスケジュール</Link>
                  <Link href="/supporters-videos">Supporters Videos</Link>
                  <Link href="/members">メンバー</Link>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};

export default Header;
