ActiveRecord::Base.transaction do
    # ポートフォリオ閲覧用アカウント
    portfolio_user = User.create!(
      name: "ポートフォリオ閲覧者", 
      email: "demo@example.com", 
      password: "demo2025", 
      confirmed_at: Time.current
    )
  
    user1 = User.create!(name: "テスト太郎", email: "test1@example.com", password: "password", confirmed_at: Time.current)
  
    user2 = User.create!(name: "テスト次郎", email: "test2@example.com", password: "password", confirmed_at: Time.current)
  
    # ポートフォリオ用記事
    articles_data = [
      {
        title: "Next.js 14で学ぶApp Routerの実装パターン",
        content: <<~MARKDOWN
          # Next.js 14のApp Routerを実際に使ってみた

          Next.js 13で導入されたApp Routerが、14でさらに安定してきました。実際にプロジェクトで使ってみて感じたメリットと実装パターンをまとめます。

          ## App Routerとは

          従来のPages Routerに代わる新しいルーティングシステムです。

          ```typescript
          // app/page.tsx
          export default function HomePage() {
            return <h1>ホームページ</h1>
          }
          ```

          ## 学んだポイント

          ### 1. レイアウトの活用
          ```typescript
          // app/layout.tsx
          export default function RootLayout({
            children,
          }: {
            children: React.ReactNode
          }) {
            return (
              <html lang="ja">
                <body>
                  <header>共通ヘッダー</header>
                  {children}
                </body>
              </html>
            )
          }
          ```

          ### 2. Loading UIの実装
          ```typescript
          // app/loading.tsx
          export default function Loading() {
            return <div>読み込み中...</div>
          }
          ```

          ## まとめ

          App Routerは学習コストはありますが、コンポーネントベースのアプローチで直感的な開発ができます。特にTypeScriptとの相性が良く、型安全な開発が可能になりました。

          次回は実際のAPIとの連携について書く予定です。
        MARKDOWN
      },
      {
        title: "TypeScriptの型定義で迷わないための実践的ガイド",
        content: <<~MARKDOWN
          # TypeScriptの型定義、これで迷わない！

          TypeScriptを書いていて「あれ、この型どう書くんだっけ？」と悩むことありませんか？
          よく使う型定義パターンをまとめました。

          ## 基本的な型定義

          ### オブジェクトの型定義
          ```typescript
          interface User {
            id: number
            name: string
            email: string
            isActive: boolean
          }

          // または type で定義
          type UserType = {
            id: number
            name: string
            email: string
            isActive: boolean
          }
          ```

          ## 実用的なパターン

          ### APIレスポンスの型定義
          ```typescript
          interface ApiResponse<T> {
            data: T
            message: string
            status: 'success' | 'error'
          }

          // 使用例
          type UserResponse = ApiResponse<User>
          ```

          ### React Propsの型定義
          ```typescript
          interface ButtonProps {
            children: React.ReactNode
            onClick: () => void
            variant?: 'primary' | 'secondary'
            disabled?: boolean
          }

          const Button: React.FC<ButtonProps> = ({ 
            children, 
            onClick, 
            variant = 'primary',
            disabled = false 
          }) => {
            return (
              <button 
                onClick={onClick} 
                disabled={disabled}
                className={`btn btn-${variant}`}
              >
                {children}
              </button>
            )
          }
          ```

          ## よく使うユーティリティ型

          ### Pick / Omit
          ```typescript
          // 必要なプロパティだけ抽出
          type UserSummary = Pick<User, 'id' | 'name'>

          // 特定のプロパティを除外
          type CreateUser = Omit<User, 'id'>
          ```

          ## まとめ

          型定義はコードの品質向上に直結します。最初は複雑に感じるかもしれませんが、
          パターンを覚えれば開発効率が大幅に向上します。

          実際のプロジェクトで使いながら覚えていくのが一番です！
        MARKDOWN
      },
      {
        title: "Rails APIとNext.jsでJWT認証を実装した話",
        content: <<~MARKDOWN
          # Rails + Next.js でJWT認証を実装してみた

          SPA（Single Page Application）での認証は悩ましい問題です。
          今回はRails APIとNext.jsでJWT認証を実装した経験をシェアします。

          ## なぜJWT認証を選んだか

          - ステートレスなAPI設計が可能
          - フロントエンドとバックエンドの分離がしやすい
          - モバイルアプリでも同じAPIが使える

          ## Rails側の実装

          ### JWT生成用のヘルパー
          ```ruby
          # app/lib/json_web_token.rb
          class JsonWebToken
            SECRET_KEY = Rails.application.credentials.secret_key_base

            def self.encode(payload, exp = 24.hours.from_now)
              payload[:exp] = exp.to_i
              JWT.encode(payload, SECRET_KEY)
            end

            def self.decode(token)
              decoded = JWT.decode(token, SECRET_KEY)[0]
              HashWithIndifferentAccess.new decoded
            rescue JWT::DecodeError => e
              raise ExceptionHandler::InvalidToken, e.message
            end
          end
          ```

          ### 認証コントローラー
          ```ruby
          class AuthController < ApplicationController
            def login
              @user = User.find_by(email: params[:email])
              
              if @user&.authenticate(params[:password])
                token = JsonWebToken.encode(user_id: @user.id)
                render json: { token: token, user: @user }, status: :ok
              else
                render json: { error: 'Invalid credentials' }, status: :unauthorized
              end
            end
          end
          ```

          ## Next.js側の実装

          ### トークンの保存と管理
          ```typescript
          // utils/auth.ts
          export const setAuthToken = (token: string) => {
            localStorage.setItem('authToken', token)
          }

          export const getAuthToken = (): string | null => {
            return localStorage.getItem('authToken')
          }

          export const removeAuthToken = () => {
            localStorage.removeItem('authToken')
          }
          ```

          ### APIクライアントの設定
          ```typescript
          // lib/apiClient.ts
          import axios from 'axios'
          import { getAuthToken } from '../utils/auth'

          const apiClient = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_URL,
          })

          apiClient.interceptors.request.use((config) => {
            const token = getAuthToken()
            if (token) {
              config.headers.Authorization = `Bearer ${token}`
            }
            return config
          })

          export default apiClient
          ```

          ## セキュリティ考慮事項

          1. **トークンの有効期限**: 短めに設定（1時間程度）
          2. **リフレッシュトークン**: 長期間のセッション維持
          3. **HTTPS必須**: 本番環境では必ずHTTPS通信
          4. **XSS対策**: トークンをlocalStorageに保存する際の注意

          ## 苦労した点

          - トークンの自動更新タイミング
          - ログアウト時のクリーンアップ
          - サーバーサイドレンダリング時のトークン処理

          ## まとめ

          JWT認証は実装が少し複雑ですが、一度仕組みを理解すれば
          柔軟性の高い認証システムが構築できます。

          特にAPIファーストな開発では威力を発揮するのでおすすめです！
        MARKDOWN
      },
      {
        title: "Docker ComposeでRails開発環境を楽にセットアップ",
        content: <<~MARKDOWN
          # Docker ComposeでRails開発環境を構築してみた

          新しいプロジェクトを始める度に環境構築で時間を取られていませんか？
          Docker Composeを使ってRailsの開発環境を簡単にセットアップする方法をまとめました。

          ## なぜDocker Compose？

          - チーム内で環境を統一できる
          - Ruby、Node.js、データベースのバージョン管理が楽
          - 新メンバーのオンボーディングが早い

          ## 構成ファイル

          ### docker-compose.yml
          ```yaml
          version: '3.8'
          services:
            db:
              image: postgres:14
              environment:
                POSTGRES_PASSWORD: password
                POSTGRES_DB: myapp_development
              ports:
                - "5432:5432"
              volumes:
                - postgres_data:/var/lib/postgresql/data

            web:
              build: .
              command: bundle exec rails server -b 0.0.0.0
              volumes:
                - .:/app
              ports:
                - "3000:3000"
              depends_on:
                - db
              environment:
                - DATABASE_URL=postgresql://postgres:password@db:5432/myapp_development

          volumes:
            postgres_data:
          ```

          ### Dockerfile
          ```dockerfile
          FROM ruby:3.2

          WORKDIR /app

          # 依存関係のインストール
          COPY Gemfile Gemfile.lock ./
          RUN bundle install

          # アプリケーションのコピー
          COPY . .

          EXPOSE 3000

          CMD ["rails", "server", "-b", "0.0.0.0"]
          ```

          ## 便利なコマンド

          ### 初回セットアップ
          ```bash
          # コンテナをビルドして起動
          docker-compose up --build

          # 別ターミナルでデータベース作成
          docker-compose exec web rails db:create db:migrate
          ```

          ### 日常的な開発
          ```bash
          # コンテナ起動
          docker-compose up

          # Railsコンソール
          docker-compose exec web rails console

          # テスト実行
          docker-compose exec web bundle exec rspec

          # Gem追加後の再ビルド
          docker-compose up --build
          ```

          ## ハマったポイント

          ### 1. ファイル変更の反映
          ```yaml
          # volumes設定でホストとコンテナを同期
          volumes:
            - .:/app
          ```

          ### 2. データベース接続
          ```ruby
          # config/database.yml
          development:
            adapter: postgresql
            encoding: unicode
            host: db  # サービス名を指定
            username: postgres
            password: password
            database: myapp_development
          ```

          ### 3. ポート競合
          ```bash
          # ローカルのPostgreSQLが動いている場合
          sudo service postgresql stop
          ```

          ## カスタマイズ例

          ### Redis追加
          ```yaml
          redis:
            image: redis:7
            ports:
              - "6379:6379"
          ```

          ### Node.js環境追加
          ```yaml
          frontend:
            image: node:18
            working_dir: /app
            volumes:
              - ./frontend:/app
            ports:
              - "3001:3000"
            command: npm run dev
          ```

          ## まとめ

          Docker Composeを使うことで：
          - 環境構築の時間を大幅短縮
          - チーム開発での環境差異を解消
          - 本番環境に近い環境でのテストが可能

          最初のセットアップは少し手間ですが、一度作ってしまえば
          新しいプロジェクトでもテンプレートとして使い回せます。

          ぜひ試してみてください！
        MARKDOWN
      },
      {
        title: "GitHubActionsでRails+Next.jsのCI/CDパイプラインを構築",
        content: <<~MARKDOWN
          # GitHub ActionsでCI/CDを構築した話

          個人プロジェクトでもちゃんとしたCI/CDパイプラインが欲しい！
          GitHub Actionsを使ってRails + Next.jsプロジェクトのCI/CDを構築しました。

          ## やりたかったこと

          - プルリクエスト時の自動テスト
          - mainブランチへのマージ時の自動デプロイ
          - テストカバレッジの計測
          - セキュリティスキャン

          ## CI設定（テスト自動化）

          ### .github/workflows/ci.yml
          ```yaml
          name: CI

          on:
            pull_request:
              branches: [ main ]
            push:
              branches: [ main ]

          jobs:
            test-backend:
              runs-on: ubuntu-latest
              services:
                postgres:
                  image: postgres:14
                  env:
                    POSTGRES_PASSWORD: postgres
                  options: >-
                    --health-cmd pg_isready
                    --health-interval 10s
                    --health-timeout 5s
                    --health-retries 5

              steps:
                - uses: actions/checkout@v3
                
                - name: Set up Ruby
                  uses: ruby/setup-ruby@v1
                  with:
                    ruby-version: 3.2
                    bundler-cache: true
                    working-directory: ./backend

                - name: Setup Database
                  working-directory: ./backend
                  env:
                    DATABASE_URL: postgres://postgres:postgres@localhost:5432/test
                  run: |
                    bundle exec rails db:create
                    bundle exec rails db:migrate

                - name: Run RSpec
                  working-directory: ./backend
                  env:
                    DATABASE_URL: postgres://postgres:postgres@localhost:5432/test
                  run: bundle exec rspec

            test-frontend:
              runs-on: ubuntu-latest
              steps:
                - uses: actions/checkout@v3
                
                - name: Setup Node.js
                  uses: actions/setup-node@v3
                  with:
                    node-version: '18'
                    cache: 'npm'
                    cache-dependency-path: ./frontend/package-lock.json

                - name: Install dependencies
                  working-directory: ./frontend
                  run: npm ci

                - name: Run ESLint
                  working-directory: ./frontend
                  run: npm run lint

                - name: Run Tests
                  working-directory: ./frontend
                  run: npm run test

                - name: Build
                  working-directory: ./frontend
                  run: npm run build
          ```

          ## CD設定（自動デプロイ）

          ### .github/workflows/deploy.yml
          ```yaml
          name: Deploy

          on:
            push:
              branches: [ main ]

          jobs:
            deploy:
              runs-on: ubuntu-latest
              needs: [test-backend, test-frontend]  # テスト通過が前提
              
              steps:
                - uses: actions/checkout@v3

                - name: Deploy to Render
                  env:
                    RENDER_DEPLOY_HOOK_URL: ${{ secrets.RENDER_DEPLOY_HOOK_URL }}
                  run: |
                    curl -X POST $RENDER_DEPLOY_HOOK_URL
          ```

          ## Secrets設定

          GitHubリポジトリの設定で以下を追加：

          ```
          RENDER_DEPLOY_HOOK_URL: https://api.render.com/deploy/srv-xxxxx
          DATABASE_URL: postgresql://...
          ```

          ## 工夫したポイント

          ### 1. 並列実行でビルド時間短縮
          ```yaml
          jobs:
            test-backend:
              # バックエンドテスト
            test-frontend:
              # フロントエンドテスト（並列実行）
          ```

          ### 2. キャッシュ活用
          ```yaml
          - name: Setup Ruby
            uses: ruby/setup-ruby@v1
            with:
              bundler-cache: true  # Gemキャッシュ
              
          - name: Setup Node.js
            uses: actions/setup-node@v3
            with:
              cache: 'npm'  # npmキャッシュ
          ```

          ### 3. 失敗時の通知
          ```yaml
          - name: Notify on failure
            if: failure()
            uses: 8398a7/action-slack@v3
            with:
              status: failure
              webhook_url: ${{ secrets.SLACK_WEBHOOK }}
          ```

          ## 導入効果

          - **品質向上**: プルリク前に必ずテストが実行される
          - **デプロイミス防止**: テスト失敗時はデプロイされない  
          - **作業効率化**: 手動デプロイ作業がなくなった
          - **安心感**: 自動化により人的ミスが減った

          ## 今後の改善予定

          - [ ] E2Eテストの追加
          - [ ] パフォーマンステストの導入
          - [ ] セキュリティスキャンの強化
          - [ ] ステージング環境への自動デプロイ

          ## まとめ

          GitHub Actionsは無料枠でも十分実用的です。
          個人プロジェクトでもCI/CDを導入することで、
          開発の品質と効率が大幅に向上しました。

          最初は簡単な設定から始めて、徐々に機能を追加していくのがおすすめです！
        MARKDOWN
      }
    ]

    articles_data.each do |article_data|
      Article.create!(
        title: article_data[:title],
        content: article_data[:content],
        status: :published,
        user: portfolio_user
      )
    end
  
    15.times do |i|
      Article.create!(title: "テストタイトル1-#{i}", content: "テスト本文1-#{i}", status: :published, user: user1)
      Article.create!(title: "テストタイトル2-#{i}", content: "テスト本文2-#{i}", status: :published, user: user2)
    end
  end