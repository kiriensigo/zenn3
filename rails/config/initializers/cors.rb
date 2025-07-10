# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin AJAX requests.

# Read more: https://github.com/cyu/rack-cors

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    # 本番環境では環境変数から取得、開発環境では設定ファイルから取得
    front_domain = ENV['FRONT_DOMAIN'] || Settings.front_domain || 'http://localhost:8000'
    
    # 複数のドメインに対応（カンマ区切りで指定可能）
    origins front_domain.split(',').map(&:strip)

    resource "*",
             headers: :any,
             expose: ['access-token', 'uid', 'client'],
             methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
