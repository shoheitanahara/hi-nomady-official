'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import {
  localizedPath,
  switchLocalePath,
  type Locale,
} from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n/dictionaries';

interface HeaderProps {
  locale: Locale;
  dictionary: Dictionary['header'];
}

const Header: FC<HeaderProps> = ({ locale, dictionary }) => {
  const pathname = usePathname() || '/';
  const enHref = switchLocalePath(pathname, 'en');
  const jaHref = switchLocalePath(pathname, 'ja');

  return (
    <header className="fixed left-0 top-0 z-50 flex h-14 w-full items-center bg-black px-4 shadow-md">
      <div className="flex w-full items-center justify-between gap-3">
        <Link href={localizedPath(locale, '/')}>
          <Image
            src="/images/hi-nomady_logo.png"
            alt="Hi-NOMADY"
            width={126}
            height={32}
            loading="eager"
            className="mr-2 h-8 w-32 cursor-pointer"
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <nav
            aria-label="Language"
            className="flex items-center gap-1 text-sm font-bold"
          >
            <Link
              href={enHref}
              className={
                locale === 'en'
                  ? 'text-white'
                  : 'text-white/50 transition-colors hover:text-white'
              }
              hrefLang="en"
            >
              {dictionary.langEn}
            </Link>
            <span className="text-white/40" aria-hidden="true">
              /
            </span>
            <Link
              href={jaHref}
              className={
                locale === 'ja'
                  ? 'text-white'
                  : 'text-white/50 transition-colors hover:text-white'
              }
              hrefLang="ja"
            >
              {dictionary.langJa}
            </Link>
          </nav>

          <NavigationMenu className="flex h-full items-center justify-end">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>{dictionary.menu}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[calc(100vw-2rem)] max-w-[320px] gap-2 p-3 md:w-[420px] md:max-w-none md:grid-cols-2 lg:w-[520px]">
                    <Link
                      href={localizedPath(locale, '/live-schedules')}
                      className="rounded-md px-4 py-3 text-lg font-bold transition-colors hover:bg-white/10"
                    >
                      {dictionary.liveSchedules}
                    </Link>
                    <Link
                      href={localizedPath(locale, '/supporters-videos')}
                      className="rounded-md px-4 py-3 text-lg font-bold transition-colors hover:bg-white/10"
                    >
                      {dictionary.supportersVideos}
                    </Link>
                    <Link
                      href={localizedPath(locale, '/members')}
                      className="rounded-md px-4 py-3 text-lg font-bold transition-colors hover:bg-white/10"
                    >
                      {dictionary.members}
                    </Link>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
