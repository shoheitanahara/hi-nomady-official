"use client"

import Image from "next/image";
import Link from 'next/link';
import { FC } from 'react';
import { ModeToggle } from '../mode-toggle';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const Header: FC = () => {
  return (
    <header className="bg-white dark:bg-black shadow-md h-14 flex items-center justify-between px-4">
      <div className="flex items-center">
        <Link href="/">
          <Image
            src="/images/hi-nomady_logo.jpeg"
            alt="icon"
            width={126}
            height={32}
            className="h-8 w-32 mr-2 cursor-pointer"
            style={{
              maxWidth: "100%",
              height: "auto"
            }} />
        </Link>
        <NavigationMenu className="flex items-center justify-center h-full">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>メニュー</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[200px] md:w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <Link href="/live-schedules">ライブスケジュール</Link>
                  <Link href="/members">メンバー</Link>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex items-center">
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
