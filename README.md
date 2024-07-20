```markdown:README.md
## プロジェクトの立ち上げ方

このプロジェクトは[`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)でブートストラップされた[Next.js](https://nextjs.org/)プロジェクトです。

### 必要なツールのインストール

#### Node.jsとnpmのインストール

まず、Node.jsとnpmがインストールされていることを確認してください。インストールされていない場合は、[Node.jsの公式サイト](https://nodejs.org/)からインストールしてください。

#### Next.jsとShadCNのインストール

プロジェクトのルートディレクトリで以下のコマンドを実行して、Next.jsとShadCNをインストールします。

```bash
npx create-next-app@latest
npm install @shadcn/ui
```

### プロジェクトのセットアップ

#### 依存関係のインストール

プロジェクトの依存関係をインストールするには、以下のコマンドを実行します:

```bash
npm install
# または
yarn install
# または
pnpm install
```

#### 環境設定

プロジェクトのルートディレクトリに`.env.local`ファイルを作成し、必要な環境変数を設定します。例:

```plaintext
NEXT_PUBLIC_API_URL=https://api.example.com
```

### 開発サーバーの起動

開発サーバーを起動するには、以下のコマンドを実行します:

```bash
npm run dev
# または
yarn dev
# または
pnpm dev
# または
bun dev
```

[http://localhost:3000](http://localhost:3000)をブラウザで開いて、結果を確認します。

`app/page.tsx`を編集することで、ページを編集できます。ファイルを編集すると、ページは自動的に更新されます。

### ビルドとデプロイ

プロジェクトをビルドするには、以下のコマンドを実行します:

```bash
npm run build
# または
yarn build
# または
pnpm build
```

ビルドが成功すると、`.next`ディレクトリに静的ファイルが生成されます。

### デプロイ

このプロジェクトをデプロイする最も簡単な方法は、Next.jsの作成者が提供する[Vercelプラットフォーム](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)を使用することです。

詳細については、[Next.jsのデプロイメントドキュメント](https://nextjs.org/docs/deployment)を参照してください。

### その他の情報

- [Next.js Documentation](https://nextjs.org/docs) - Next.jsの機能とAPIについて学びます。
- [Learn Next.js](https://nextjs.org/learn) - インタラクティブなNext.jsのチュートリアルです。

Next.jsのGitHubリポジトリもチェックしてみてください。[Next.js GitHub repository](https://github.com/vercel/next.js/) - フィードバックや貢献をお待ちしています！
```