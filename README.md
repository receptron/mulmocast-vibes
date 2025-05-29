# MulmoCast Dashboard

MulmoCastは、クロスプラットフォームのコンテンツクリエイター向けの先進的なダッシュボードアプリケーションです。高度なメディア生成機能とリアルタイム通信技術を備え、AI支援チャットインターフェースを搭載した初心者モードも含まれています。

## 🚀 技術スタック

- **フロントエンド**: React 18 + TypeScript
- **スタイリング**: Tailwind CSS + Shadcn/ui
- **バックエンド**: Express.js + Node.js
- **リアルタイム通信**: Socket.io
- **データベース**: Drizzle ORM (PostgreSQL対応)
- **状態管理**: TanStack Query (React Query)
- **ルーティング**: Wouter
- **デスクトップ**: Electron
- **開発環境**: Vite

## 📋 前提条件

- Node.js 20以上
- npm または yarn

## 🛠️ セットアップ

### 1. リポジトリのクローンと依存関係のインストール

```bash
git clone <repository-url>
cd mulmocast-dashboard
npm install
```

### 2. 開発サーバーの起動

```bash
npm run dev
```

このコマンドでフロントエンドとバックエンドの両方が起動します。
- フロントエンド: Viteサーバー
- バックエンド: Expressサーバー

アプリケーションは自動的に `http://localhost:3001` でアクセスできるようになります。

## 📝 利用可能なスクリプト

```bash
# 開発サーバーを起動
npm run dev

# プロダクション用ビルド
npm run build

# プロダクションサーバーを起動
npm start

# TypeScript型チェック
npm run check

# データベーススキーマをプッシュ
npm run db:push
```

## 🏗️ プロジェクト構造

```
├── client/                 # Reactフロントエンド
│   ├── src/
│   │   ├── components/     # UIコンポーネント
│   │   ├── pages/          # ページコンポーネント
│   │   ├── hooks/          # カスタムフック
│   │   ├── lib/            # ユーティリティ
│   │   └── contexts/       # Reactコンテキスト
├── server/                 # Express.jsバックエンド
│   ├── index.ts           # サーバーエントリーポイント
│   ├── routes.ts          # APIルート
│   └── storage.ts         # データストレージ
├── shared/                 # 共通型定義
│   └── schema.ts          # Drizzleスキーマ
├── electron/              # Electronアプリ設定
└── package.json
```

## 🔧 主な機能

- 📱 **レスポンシブデザイン**: すべてのデバイスで最適化
- 🎨 **ダークモード対応**: ライト/ダークテーマの切り替え
- 💬 **リアルタイムチャット**: Socket.ioを使用
- 🤖 **AI支援インターフェース**: 初心者向けの対話機能
- 🖥️ **デスクトップアプリ**: Electronによるネイティブアプリ
- 📊 **ダッシュボード**: プロジェクト管理とメディア生成

## 🔑 環境変数（必要に応じて）

プロジェクトで外部APIを使用する場合は、以下の環境変数を設定してください：

```bash
# OpenAI API (AI機能用)
OPENAI_API_KEY=your_openai_api_key

# データベース接続 (PostgreSQL使用時)
DATABASE_URL=your_database_url
```

## 🔍 開発のヒント

1. **コンポーネント開発**: `client/src/components/` でUIコンポーネントを作成
2. **API追加**: `server/routes.ts` で新しいAPIエンドポイントを追加
3. **データベーススキーマ**: `shared/schema.ts` でテーブル定義を管理
4. **ページ追加**: `client/src/pages/` で新しいページを作成し、`App.tsx` でルートを設定

## 📚 使用ライブラリ

- **UI**: Radix UI + Shadcn/ui
- **アイコン**: Lucide React
- **アニメーション**: Framer Motion
- **チャート**: Recharts
- **フォーム**: React Hook Form + Zod
- **日付**: date-fns

## 🐛 トラブルシューティング

### Replitオブジェクトストレージエラー（ローカル開発）
ローカル環境で以下のエラーが出る場合：
```
TypeError: fetch failed
Error: connect ECONNREFUSED 127.0.0.1:1106
```

これは正常な動作です。アプリケーションはローカル開発モードで動作し、ファイルアップロード機能は模擬的に動作します。Replit環境では完全に動作します。

### ポート競合エラー
既にポート5000が使用されている場合は、他のアプリケーションを停止するか、設定を変更してください。

### 依存関係エラー
```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScriptエラー
```bash
npm run check
```

## 📄 ライセンス

MIT License

---

開発に関する質問やサポートが必要な場合は、プロジェクトチームまでお気軽にお問い合わせください。