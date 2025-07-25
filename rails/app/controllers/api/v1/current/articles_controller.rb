class Api::V1::Current::ArticlesController < Api::V1::BaseController
    before_action :authenticate_user!

    def create
      unsaved_article = current_user.articles.unsaved.first || current_user.articles.create!(status: :unsaved)
      render json: unsaved_article
    end

    def index
        articles = current_user.articles.not_unsaved.oder(created_at: :desc)
        render json: articles
    end

    def index
        articles = current_user.articles.not_unsaved.order(created_at: :desc)
        render json: articles
    end
    
    def show
        article = current_user.articles.find(params[:id])
        render json: article
    end

    def update
        article = current_user.articles.find(params[:id])
        article.update!(article_params)
        render json: article
    end

    def destroy
      article = current_user.articles.find(params[:id])
      article.destroy!
      head :no_content
    end

  private

    def article_params
      params.require(:article).permit(:title, :content, :status)
    end
  end