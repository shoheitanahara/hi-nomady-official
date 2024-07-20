# Hi-NOMADY Official Site

## 概要
Hi-NOMADYの公式サイトです。ライブ情報、メンバー紹介、SNSリンクなどを提供しています。

## 使用技術
- **Next.js**: Reactフレームワーク
- **TypeScript**: 型安全なJavaScript
- **TailwindCSS**: ユーティリティファーストのCSSフレームワーク
- **ShadCN**: コンポーネントライブラリ

## ディレクトリ構成
```
/components
  /ui
    - button.tsx
    - card.tsx
    - calendar.tsx
    - carousel.tsx
  - tunecore.tsx
/layouts
  - header.tsx
/pages
  - index.tsx
  - live-schedules
    - page.tsx
    - [date]
      - page.tsx
  - members
    - page.tsx
/api
  - members
    - data.tsx
  - live-schedules
    - data.ts
```

## 主なコンポーネント

### Button
ボタンコンポーネント。複数のバリアントとサイズをサポートしています。以下のように使用します。

```typescript
import { Button } from '@/components/ui/button';

<Button variant="primary" size="lg">Click me</Button>
```

### Card
カードコンポーネント。ヘッダー、タイトル、コンテンツ、フッターを含む。以下のように使用します。

```typescript
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Card content goes here.</p>
  </CardContent>
  <CardFooter>
    <p>Card footer</p>
  </CardFooter>
</Card>
```

### Calendar
カレンダーコンポーネント。ライブ日程をハイライト表示します。以下のように使用します。

```typescript
import { Calendar } from '@/components/ui/calendar';

<Calendar highlightedDates={['2024-09-21', '2024-10-19']} />
```

### Carousel
カルーセルコンポーネント。ライブ情報をスライド表示します。以下のように使用します。

```typescript
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

<Carousel>
  <CarouselContent>
    <CarouselItem>
      <p>Slide 1</p>
    </CarouselItem>
    <CarouselItem>
      <p>Slide 2</p>
    </CarouselItem>
  </CarouselContent>
</Carousel>
```

## ページ

### ホームページ
サイトのホームページ。ライブ情報のカルーセルを表示します。

```typescript
import Home from '@/app/page';
```

### メンバーページ
メンバーのSNSリンクを表示します。

```typescript
import Members from '@/app/members/page';
```

### ライブスケジュールページ
ライブスケジュールをカレンダー形式で表示します。

```typescript
import LiveSchedule from '@/app/live-schedules/page';
```

### ライブスケジュール詳細ページ
特定の日付のライブ情報を表示します。

```typescript
import LiveSchedulePage from '@/app/live-schedules/[date]/page';
```

## API

### メンバーAPI
メンバー情報を提供します。

```typescript
import { members } from '@/app/api/members/data';
```

### ライブスケジュールAPI
ライブスケジュール情報を提供します。

```typescript
import { items } from '@/app/api/live-schedules/data';
```

## 環境設定

### 必要な環境変数
- `NEXT_PUBLIC_API_URL`: APIのベースURL

### インストールと起動
```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

## デプロイ
デプロイは、`main` ブランチにマージされると自動的に実行されます。この設定はVercelを介して行われます。

手動でデプロイする場合は、以下の手順に従います。

```bash
# Vercel CLIのインストール
npm install -g vercel

# デプロイ
vercel
```

## ライセンス
このプロジェクトはMITライセンスの下で公開されています。
```