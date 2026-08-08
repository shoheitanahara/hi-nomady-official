import type { Locale } from './config';

const ja = {
  meta: {
    homeTitle: 'Hi-NOMADY Official | ハイノマディ公式サイト',
    homeDescription:
      'Hi-NOMADY Official site | ハイノマディ公式サイト。ライブ情報などをお届けします！',
    liveSchedulesTitle: 'ライブスケジュール | Hi-NOMADY Official',
    membersTitle: 'メンバー | Hi-NOMADY Official',
    supportersVideosTitle: "Supporter's Videos | Hi-NOMADY Official",
    supportersVideosDescription:
      "Hi-NOMADY の Supporter's Videos をまとめて視聴できます。",
  },
  header: {
    menu: 'メニュー',
    liveSchedules: 'ライブスケジュール',
    supportersVideos: "Supporter's Videos",
    members: 'メンバー',
    langEn: 'EN',
    langJa: '日本語',
  },
  home: {
    siteTitle: 'Hi-NOMADY Official Site',
    newAlbum: 'New Album',
    albumTitle: 'HI-NOMADY - ヤナムヌ',
    albumReleaseDate: '一般発売日: 6月17日（水）',
    viewDetails: '詳細を見る',
    liveInfo: 'ライブ情報',
    liveHint: 'の日はライブがあります！',
    nextLive: 'Next Live',
    presents: 'HI-NOMADY Presents',
    viewAllSchedules: 'スケジュールをすべて見る',
    supportersVideos: "Supporter's Videos",
    viewAll: 'すべて見る',
    viewAllVideos: '動画をすべて見る',
    streaming: '配信サイトで聴く',
    reserveOnInstagram: 'Instagramで予約する',
    noLiveTitle: 'ライブ情報なし',
    noLiveDescription:
      'ライブのお誘いおまちしております！ Instagramからご連絡ください！',
  },
  liveSchedules: {
    title: 'ライブスケジュール',
    liveHint: 'の日はライブがあります！',
    noLiveTitle: 'ライブ情報なし',
    noLiveDescription:
      'ライブのお誘いおまちしております！ Instagramからご連絡ください！',
    detailTitle: 'ライブ情報',
    advanceTicket: '前売り予約',
    advanceTicketDescription:
      'ボタンを押すと予約文がコピーされ、Instagramプロフィールを開きます。DMに貼り付けて、お名前・枚数を入力して送信してください。',
    reserveOnInstagram: 'Instagramで予約する',
    noLiveOnDay: 'ライブがありません。',
  },
  calendar: {
    advanceTicket: '前売り予約',
    advanceTicketDescription:
      '予約文をコピーしてInstagramを開きます。DMに貼り付けて、お名前・枚数を入力してください。',
    reserveOnInstagram: 'Instagramで予約する',
    noLiveOnDay: 'ライブがありません。',
  },
  members: {
    title: 'メンバー',
    officialAccount: '公式アカウント',
  },
  supportersVideos: {
    title: "Supporter's Videos",
    description:
      '応援してくれる皆さんが投稿してくれているライブ映像や関連動画をまとめています。いつも応援ありがとうございます。ぜひ動画をチェックして、Hi-NOMADYのライブの空気を広めてもらえたら嬉しいです。',
    latest: 'Latest',
    latestVideos: '最新動画',
    videos: 'Videos',
    videoCount: '{count} 本の動画',
  },
  streaming: {
    title: 'Spotify, AppleMusicなどで配信中！',
  },
  footer: {
    rights: 'All rights reserved.',
  },
} as const;

const en = {
  meta: {
    homeTitle: 'Hi-NOMADY Official',
    homeDescription:
      'Official site of Hi-NOMADY. Live schedules, videos, and more.',
    liveSchedulesTitle: 'Live Schedules | Hi-NOMADY Official',
    membersTitle: 'Members | Hi-NOMADY Official',
    supportersVideosTitle: "Supporter's Videos | Hi-NOMADY Official",
    supportersVideosDescription:
      "Watch Supporter's Videos of Hi-NOMADY live performances and related clips.",
  },
  header: {
    menu: 'Menu',
    liveSchedules: 'Live Schedules',
    supportersVideos: "Supporter's Videos",
    members: 'Members',
    langEn: 'EN',
    langJa: '日本語',
  },
  home: {
    siteTitle: 'Hi-NOMADY Official Site',
    newAlbum: 'New Album',
    albumTitle: 'HI-NOMADY - Yanamunu',
    albumReleaseDate: 'Release date: June 17 (Wed)',
    viewDetails: 'View details',
    liveInfo: 'Live Info',
    liveHint: 'marks a live show day!',
    nextLive: 'Next Live',
    presents: 'HI-NOMADY Presents',
    viewAllSchedules: 'View all schedules',
    supportersVideos: "Supporter's Videos",
    viewAll: 'View all',
    viewAllVideos: 'View all videos',
    streaming: 'Listen on streaming',
    reserveOnInstagram: 'Book via Instagram',
    noLiveTitle: 'No upcoming live',
    noLiveDescription:
      'Looking forward to live invitations! Contact us on Instagram.',
  },
  liveSchedules: {
    title: 'Live Schedules',
    liveHint: 'marks a live show day!',
    noLiveTitle: 'No live info',
    noLiveDescription:
      'Looking forward to live invitations! Contact us on Instagram.',
    detailTitle: 'Live Info',
    advanceTicket: 'Advance tickets',
    advanceTicketDescription:
      'The button copies a reservation message and opens the Instagram profile. Paste it in DM, then add your name and ticket count.',
    reserveOnInstagram: 'Book via Instagram',
    noLiveOnDay: 'No live on this day.',
  },
  calendar: {
    advanceTicket: 'Advance tickets',
    advanceTicketDescription:
      'Copies a reservation message and opens Instagram. Paste it in DM, then add your name and ticket count.',
    reserveOnInstagram: 'Book via Instagram',
    noLiveOnDay: 'No live on this day.',
  },
  members: {
    title: 'Members',
    officialAccount: 'Official Account',
  },
  supportersVideos: {
    title: "Supporter's Videos",
    description:
      'These are live clips and related videos posted by our supporters. Thank you for the support — please check them out and help spread the vibe of Hi-NOMADY live shows.',
    latest: 'Latest',
    latestVideos: 'Latest video',
    videos: 'Videos',
    videoCount: '{count} videos',
  },
  streaming: {
    title: 'Now streaming on Spotify, Apple Music, and more!',
  },
  footer: {
    rights: 'All rights reserved.',
  },
} as const;

export type Dictionary = {
  meta: {
    homeTitle: string;
    homeDescription: string;
    liveSchedulesTitle: string;
    membersTitle: string;
    supportersVideosTitle: string;
    supportersVideosDescription: string;
  };
  header: {
    menu: string;
    liveSchedules: string;
    supportersVideos: string;
    members: string;
    langEn: string;
    langJa: string;
  };
  home: {
    siteTitle: string;
    newAlbum: string;
    albumTitle: string;
    albumReleaseDate: string;
    viewDetails: string;
    liveInfo: string;
    liveHint: string;
    nextLive: string;
    presents: string;
    viewAllSchedules: string;
    supportersVideos: string;
    viewAll: string;
    viewAllVideos: string;
    streaming: string;
    reserveOnInstagram: string;
    noLiveTitle: string;
    noLiveDescription: string;
  };
  liveSchedules: {
    title: string;
    liveHint: string;
    noLiveTitle: string;
    noLiveDescription: string;
    detailTitle: string;
    advanceTicket: string;
    advanceTicketDescription: string;
    reserveOnInstagram: string;
    noLiveOnDay: string;
  };
  calendar: {
    advanceTicket: string;
    advanceTicketDescription: string;
    reserveOnInstagram: string;
    noLiveOnDay: string;
  };
  members: {
    title: string;
    officialAccount: string;
  };
  supportersVideos: {
    title: string;
    description: string;
    latest: string;
    latestVideos: string;
    videos: string;
    videoCount: string;
  };
  streaming: {
    title: string;
  };
  footer: {
    rights: string;
  };
};

export const dictionaries: Record<Locale, Dictionary> = {
  ja,
  en,
};
