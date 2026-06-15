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
                <ul className="grid w-[calc(100vw-2rem)] max-w-[320px] gap-2 p-3 md:w-[420px] md:max-w-none md:grid-cols-2 lg:w-[520px]">
                  <Link
                    href="/live-schedules"
                    className="rounded-md px-4 py-3 text-lg font-bold transition-colors hover:bg-white/10"
                  >
                    ライブスケジュール
                  </Link>
                  <Link
                    href="/supporters-videos"
                    className="rounded-md px-4 py-3 text-lg font-bold transition-colors hover:bg-white/10"
                  >
                    Supporter&apos;s Videos
                  </Link>
                  <Link
                    href="/members"
                    className="rounded-md px-4 py-3 text-lg font-bold transition-colors hover:bg-white/10"
                  >
                    メンバー
                  </Link>
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
