class AddImageToArticles < ActiveRecord::Migration[7.0]
  def change
    add_column :articles, :image, :text, comment: "記事画像（Base64）"
  end
end