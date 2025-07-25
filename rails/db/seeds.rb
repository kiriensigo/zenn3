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
    5.times do |i|
      Article.create!(
        title: "サンプル記事#{i + 1}: Ruby on Railsの基礎", 
        content: "# Ruby on Railsについて\n\nRuby on Railsは効率的なWeb開発を可能にするフレームワークです。\n\n## 特徴\n- Convention over Configuration\n- DRY原則\n- RESTfulな設計\n\n実際のプロジェクトでこれらの原則を活用しています。", 
        status: :published, 
        user: portfolio_user
      )
    end
  
    15.times do |i|
      Article.create!(title: "テストタイトル1-#{i}", content: "テスト本文1-#{i}", status: :published, user: user1)
      Article.create!(title: "テストタイトル2-#{i}", content: "テスト本文2-#{i}", status: :published, user: user2)
    end
  end