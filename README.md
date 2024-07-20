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
ボタンコンポーネント。複数のバリアントとサイズをサポートしています。

```typescript:components/ui/button.tsx
startLine: 1
endLine: 56
```

### Card
カードコンポーネント。ヘッダー、タイトル、コンテンツ、フッターを含む。

```typescript:components/ui/card.tsx
startLine: 1
endLine: 79
```

### Calendar
カレンダーコンポーネント。ライブ日程をハイライト表示します。

```typescript:components/ui/calendar.tsx
startLine: 1
endLine: 90
```

### Carousel
カルーセルコンポーネント。ライブ情報をスライド表示します。

```typescript:components/ui/carousel.tsx
startLine: 150
endLine: 223
```

## ページ

### ホームページ
サイトのホームページ。ライブ情報のカルーセルを表示します。

```typescript:app/page.tsx
startLine: 1
endLine: 85
```

### メンバーページ
メンバーのSNSリンクを表示します。

```typescript:app/members/page.tsx
startLine: 1
endLine: 74
```

### ライブスケジュールページ
ライブスケジュールをカレンダー形式で表示します。

```typescript:app/live-schedules/page.tsx
startLine: 1
endLine: 89
```

### ライブスケジュール詳細ページ
特定の日付のライブ情報を表示します。

```typescript:app/live-schedules/[date]/page.tsx
startLine: 14
endLine: 73
```

## API

### メンバーAPI
メンバー情報を提供します。

```typescript:app/api/members/data.tsx
startLine: 1
endLine: 22
```

### ライブスケジュールAPI
ライブスケジュール情報を提供します。

```typescript:app/api/live-schedules/data.ts
startLine: 1
endLine: 29
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
Vercelを使用してデプロイします。

```bash
# Vercel CLIのインストール
npm install -g vercel

# デプロイ
vercel
```

## ライセンス
このプロジェクトはMITライセンスの下で公開されています。
```
