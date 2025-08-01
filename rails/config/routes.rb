Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get "health_check", to: "health_check#index"
      mount_devise_token_auth_for "User", at: "auth"
      namespace :user do
        resource :confirmations, only: [:update]
      end

      namespace :current do
        resource :user, only: [:show, :update]
        resources :articles, only: [:index, :show, :create, :update, :destroy]
      end
      resources :articles, only: [:index, :show]
    end
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "api/v1/health_check#index"
  # config/routes.rb
  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?
end