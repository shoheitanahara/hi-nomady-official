import { notFound } from 'next/navigation';
import Header from '@/components/layouts/header';
import { isLocale, locales, type Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/get-dictionary';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam as Locale;
  const dictionary = getDictionary(locale);

  return (
    <>
      <Header locale={locale} dictionary={dictionary.header} />
      {children}
      <footer className="bg-gray-800 p-4 text-white">
        <div className="container mx-auto text-center">
          <p>
            &copy; {new Date().getFullYear()} Hi-NOMADY.{' '}
            {dictionary.footer.rights}
          </p>
        </div>
      </footer>
    </>
  );
}
