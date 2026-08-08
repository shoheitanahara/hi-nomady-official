import { dictionaries, type Dictionary } from './dictionaries';
import { defaultLocale, isLocale, type Locale } from './config';

export function getDictionary(locale: string): Dictionary {
  if (isLocale(locale)) {
    return dictionaries[locale];
  }

  return dictionaries[defaultLocale];
}

export function resolveLocale(locale: string): Locale {
  return isLocale(locale) ? locale : defaultLocale;
}
