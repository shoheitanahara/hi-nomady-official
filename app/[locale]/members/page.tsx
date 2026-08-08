import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { members } from '@/app/api/members/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { isLocale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/get-dictionary';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dictionary = getDictionary(locale);

  return {
    title: dictionary.meta.membersTitle,
  };
}

export default async function MembersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const dictionary = getDictionary(localeParam);

  return (
    <div className="container mx-auto px-2 py-24 md:px-48">
      <h1 className="mb-4 text-3xl font-bold">{dictionary.members.title}</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => {
          const displayName =
            member.name === '公式アカウント'
              ? dictionary.members.officialAccount
              : member.name;

          return (
            <Card key={member.name}>
              <CardHeader>
                <CardTitle>{displayName}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul>
                  {'twitter' in member && member.twitter ? (
                    <li className="mb-2">
                      <Button asChild variant="twitter">
                        <a
                          href={member.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Twitter
                        </a>
                      </Button>
                    </li>
                  ) : null}
                  {member.instagram ? (
                    <li className="mb-2">
                      <Button asChild variant="instagram">
                        <a
                          href={member.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Instagram
                        </a>
                      </Button>
                    </li>
                  ) : null}
                  {'facebook' in member && member.facebook ? (
                    <li className="mb-2">
                      <Button asChild variant="facebook">
                        <a
                          href={member.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Facebook
                        </a>
                      </Button>
                    </li>
                  ) : null}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
