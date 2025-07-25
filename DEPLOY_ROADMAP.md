# 無料デプロイロードマップ (Render)

このドキュメントは、このプロジェクトをRenderを使用して無料でデプロイするための手順を示します。

## ステップ0: 準備

1.  **GitHubリポジトリ**: プロジェクト全体を1つのGitHubリポジトリにプッシュします。
2.  **Renderアカウント作成**: [Render公式サイト](https://render.com/) からGitHubアカウントでサインアップします。

---

## ステップ1: バックエンド (Rails API) のデプロイ

現在のデータベースはMySQLですが、Renderの無料プランで利用できるPostgreSQLに変更します。

### 1.1. データベース設定の変更

1.  **Gemfileの変更 (`rails/Gemfile`)**:
    - `gem "mysql2"` をコメントアウトまたは削除します。
    - `gem "pg", "~> 1.2"` を追加します。
2.  **database.ymlの変更 (`rails/config/database.yml`)**:
    - `production` 環境で環境変数 `DATABASE_URL` を使用するように設定を更新します。

    ```yaml
    production:
      <<: *default
      adapter: postgresql
      encoding: unicode
      pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
      url: <%= ENV["DATABASE_URL"] %>
    ```
3.  **設定の反映**:
    - `rails` ディレクトリで `bundle install` を実行し、`Gemfile.lock` を更新します。
    - 変更をGitHubにコミット＆プッシュします。

### 1.2. Renderでの作業

1.  **PostgreSQLデータベースの作成**:
    - Renderダッシュボードで `New +` > `PostgreSQL` を選択します。
    - **Name**: `zenn-clone-db` (任意)
    - **Region**: `Tokyo` など、デプロイ先に近いリージョン
    - **Plan**: `Free`
    - 作成後、`Internal Database URL` をコピーします。

2.  **Webサービスの作成 (Rails)**:
    - ダッシュボードで `New +` > `Web Service` を選択し、GitHubリポジトリを連携します。
    - **Name**: `zenn-clone-api` (任意)
    - **Root Directory**: `rails`
    - **Environment**: `Ruby`
    - **Region**: データベースと同じリージョン
    - **Branch**: `main`
    - **Build Command**: `bundle install; bundle exec rails -v; bundle exec rails db:migrate`
    - **Start Command**: `bundle exec puma -C config/puma.rb`
    - **Instance Type**: `Free`
    - **Environment Variables**:
        - `DATABASE_URL`: 先ほどコピーした `Internal Database URL`
        - `RAILS_MASTER_KEY`: `rails/config/master.key` の内容
        - `RAILS_ENV`: `production`
    - `Create Web Service` をクリックしてデプロイを開始します。

---

## ステップ2: フロントエンド (Next.js) のデプロイ

### 2.1. Renderでの作業

1.  **静的サイトの作成 (Next.js)**:
    - ダッシュボードで `New +` > `Static Site` を選択し、同じGitHubリポジトリを連携します。
    - **Name**: `zenn-clone-web` (任意)
    - **Root Directory**: `next`
    - **Branch**: `main`
    - **Build Command**: `npm install && npm run build`
    - **Publish Directory**: `.next` (Renderが自動で検知します)
    - **Environment Variables**:
        - `NEXT_PUBLIC_API_URL`: デプロイしたRailsアプリのURL (例: `https://zenn-clone-api.onrender.com`)
    - `Create Static Site` をクリックしてデプロイを開始します。

---

## ステップ3: CORS (クロスオリジン) 設定

フロントエンドからのAPIリクエストを許可するために、Rails側の設定を更新します。

1.  **Railsアプリの環境変数を更新**:
    - Renderダッシュボードで、作成したRailsのWebサービス (`zenn-clone-api`) の `Environment` を開きます。
    - `rails/config/initializers/cors.rb` の設定に合わせて、許可するオリジンを追加します。
    - **Key**: (例: `CORS_ORIGINS` or `FRONTEND_URL`)
    - **Value**: デプロイしたNext.jsアプリのURL (例: `https://zenn-clone-web.onrender.com`)
    - 保存すると、Railsアプリが自動で再デプロイされます。

---

---

## 現在のデプロイ状況 (2025年1月25日更新)

### ✅ 完了項目

1. **Step 2完了: フロントエンド (Next.js) デプロイ**
   - URL: https://zenn-clone-fornt.onrender.com
   - 静的サイトとしてRenderで稼働中
   - Next.js設定を静的エクスポート用に変更済み

2. **Step 1完了: バックエンド (Rails API) デプロイ**
   - URL: https://zenn-clone-api.onrender.com
   - Neon PostgreSQLを使用（3GB無料枠）
   - 接続文字列: `postgresql://neondb_owner:npg_3utJHXphl1KA@ep-flat-snow-a1urcdpu-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`

3. **Step 3完了: CORS設定**
   - Rails API環境変数: `FRONT_DOMAIN=https://zenn-clone-fornt.onrender.com`
   - フロントエンドとバックエンドの通信が正常に動作

4. **ポートフォリオ用デモアカウント作成**
   - 閲覧者向けのログイン情報を追加
   - サンプル記事も投稿済み

### 🔧 次に必要な作業

1. **データベースのマイグレーションとシード実行**
   ```bash
   rails db:migrate
   rails db:seed
   ```

2. **アプリケーション全体の動作確認**
   - ユーザー登録・ログイン機能
   - 記事投稿・編集機能
   - 記事一覧・詳細表示

---

## ポートフォリオ閲覧用ログイン情報

デモンストレーション用のアカウントを用意しています：

**Email:** `demo@example.com`  
**Password:** `demo2025`

このアカウントでは以下の機能を確認できます：
- ログイン機能
- 記事投稿・編集機能
- マークダウン記事の表示
- Ruby on Railsに関するサンプル記事（5件）

---

以上でデプロイは完了です。Next.jsアプリのURLにアクセスして動作を確認してください。
