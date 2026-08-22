export interface LiveScheduleItem {
  title: string;
  description: string;
  date: string;
  /** 一覧・カレンダー用の表紙画像 */
  image?: string;
  /** 詳細ページ用の追加フライヤー（表紙以外） */
  images?: string[];
}
