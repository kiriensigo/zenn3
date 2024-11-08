require "rails_helper"

RSpec.describe User, type: :model do
  context "factoryのデフォルト設定に従った場合" do
    let(:user) { create(:user) }  # FactoryBotを使用してユーザーを作成

    it "認証済みの user レコードを正常に新規作成できる" do
      expect(user).to be_valid          # ユーザーが有効であることを確認
      expect(user).to be_confirmed      # ユーザーが認証済みであることを確認
    end
  end
end