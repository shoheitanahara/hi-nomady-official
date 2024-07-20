"use client"

import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

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
    <header className="bg-white shadow-md h-14 flex items-center justify-between px-4">
      <div className="flex items-center">
      <Image src="https://img.lap.recochoku.jp/p1/imgkp?p=%2F12%2F2080%2F224025215.jpg&f=74636A&FFh=300&FFw=300&h=4ACE5&option=FFenl%3Don" alt="icon" width={32} height={32} className="h-8 w-8 mr-2" /> {/* 画像を追加 */}
        <NavigationMenu className="flex items-center justify-center h-full">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/docs" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Hi-NOMADYとは？
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>リンク</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <Link href="/">ホーム</Link>
                  <Link href="/about">About</Link>
                  <Link href="/contact">Contact</Link>
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
