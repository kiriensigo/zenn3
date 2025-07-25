ActiveRecord::Base.transaction do
    # ポートフォリオ閲覧用アカウント（既存チェック）
    portfolio_user = User.find_or_create_by(email: "demo@example.com") do |user|
      user.name = "ポートフォリオ閲覧者"
      user.password = "demo2025"
      user.confirmed_at = Time.current
    end
  
    user1 = User.find_or_create_by(email: "test1@example.com") do |user|
      user.name = "テストユーザー1"
      user.password = "password"
      user.confirmed_at = Time.current
    end
  
    user2 = User.find_or_create_by(email: "test2@example.com") do |user|
      user.name = "テストユーザー2"
      user.password = "password"
      user.confirmed_at = Time.current
    end
  
    # テストユーザー1の初学者向け記事
    user1_articles = [
      {
        title: "プログラミング学習を始めて1ヶ月経った感想",
        content: <<~MARKDOWN
          # プログラミング学習を始めて1ヶ月

          こんにちは！プログラミング初学者です。
          学習を始めて1ヶ月が経ったので、振り返りをしてみようと思います。

          ## なぜプログラミングを始めたか

          - 手に職をつけたい
          - リモートワークで働きたい
          - 作りたいWebサービスがある

          ## 今月やったこと

          ### HTML/CSSの基礎
          - Progateで基本的な文法を学習
          - 簡単な自己紹介サイトを作成

          ```html
          <!DOCTYPE html>
          <html>
          <head>
            <title>初めてのWebサイト</title>
          </head>
          <body>
            <h1>こんにちは、世界！</h1>
            <p>プログラミング楽しいです</p>
          </body>
          </html>
          ```

          ### JavaScriptに挑戦
          まだまだ難しいですが、少しずつ理解できるようになってきました。

          ```javascript
          function greet(name) {
            console.log("こんにちは、" + name + "さん！");
          }

          greet("世界");
          ```

          ## 苦労していること

          - エラーメッセージの読み方がわからない
          - どこから学習すればいいか迷う
          - 挫折しそうになる時がある

          ## 来月の目標

          - JavaScriptの基礎をもっと固める
          - 簡単な電卓アプリを作る
          - GitHubを使い始める

          継続は力なり！頑張ります💪
        MARKDOWN
      },
      {
        title: "初心者がJavaScriptで電卓を作ってみた",
        content: <<~MARKDOWN
          # 初めての電卓アプリ作成

          プログラミング学習2ヶ月目の挑戦として、JavaScriptで電卓を作ってみました！

          ## 作ったもの

          足し算、引き算、掛け算、割り算ができる簡単な電卓です。

          ### HTML部分
          ```html
          <div class="calculator">
            <input type="text" id="display" readonly>
            <div class="buttons">
              <button onclick="clearDisplay()">C</button>
              <button onclick="appendToDisplay('/')">/</button>
              <button onclick="appendToDisplay('*')">*</button>
              <button onclick="deleteLast()">←</button>
              
              <button onclick="appendToDisplay('7')">7</button>
              <button onclick="appendToDisplay('8')">8</button>
              <button onclick="appendToDisplay('9')">9</button>
              <button onclick="appendToDisplay('-')">-</button>
              
              <button onclick="appendToDisplay('4')">4</button>
              <button onclick="appendToDisplay('5')">5</button>
              <button onclick="appendToDisplay('6')">6</button>
              <button onclick="appendToDisplay('+')">+</button>
              
              <button onclick="appendToDisplay('1')">1</button>
              <button onclick="appendToDisplay('2')">2</button>
              <button onclick="appendToDisplay('3')">3</button>
              <button onclick="calculate()" rowspan="2">=</button>
              
              <button onclick="appendToDisplay('0')" colspan="2">0</button>
              <button onclick="appendToDisplay('.')">.</button>
            </div>
          </div>
          ```

          ### JavaScript部分
          ```javascript
          function appendToDisplay(value) {
            document.getElementById('display').value += value;
          }

          function clearDisplay() {
            document.getElementById('display').value = '';
          }

          function deleteLast() {
            let display = document.getElementById('display');
            display.value = display.value.slice(0, -1);
          }

          function calculate() {
            let display = document.getElementById('display');
            try {
              display.value = eval(display.value);
            } catch (error) {
              display.value = 'エラー';
            }
          }
          ```

          ## 作成中に困ったこと

          ### 1. ボタンが反応しない
          最初、onclick属性を間違えて書いていました。
          `onclick="function_name"` ではなく `onclick="function_name()"` が正しいと学びました。

          ### 2. CSSのレイアウト
          ボタンを綺麗に並べるのに苦労しました。
          Grid layoutを使って解決できました。

          ```css
          .buttons {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
          }
          ```

          ### 3. エラーハンドリング
          無効な計算式を入力した時にエラーになることがありました。
          try-catchを使って対処しました。

          ## 学んだこと

          - DOMの操作方法
          - イベントハンドラーの使い方
          - エラーハンドリングの重要性
          - CSS GridLayout

          ## 次の目標

          - ToDoリストアプリを作る
          - Reactの学習を始める
          - GitHubにコードをアップする

          小さな成功体験を積み重ねていきたいと思います！
        MARKDOWN
      }
    ]

    # テストユーザー2の初学者向け記事  
    user2_articles = [
      {
        title: "HTML/CSS学習で躓いたポイントと解決方法",
        content: <<~MARKDOWN
          # HTML/CSS学習での躓きポイント

          プログラミング初学者の私が、HTML/CSS学習で実際に躓いたポイントと、
          どうやって解決したかをまとめました。

          ## 躓いたポイント1: 要素が思った位置に表示されない

          ### 問題
          divタグで作った要素が、思った位置に表示されない。

          ```html
          <div class="box1">ボックス1</div>
          <div class="box2">ボックス2</div>
          ```

          ```css
          .box1 {
            width: 200px;
            height: 100px;
            background-color: red;
          }

          .box2 {
            width: 200px;  
            height: 100px;
            background-color: blue;
          }
          ```

          ### 解決方法
          displayプロパティとpositionプロパティを理解することで解決！

          ```css
          .box1 {
            display: inline-block; /* 横並びにしたい場合 */
            width: 200px;
            height: 100px;
            background-color: red;
          }

          .box2 {
            display: inline-block;
            width: 200px;
            height: 100px;
            background-color: blue;
          }
          ```

          ## 躓いたポイント2: 中央揃えができない

          ### 問題
          テキストや要素を中央に配置したいのに、うまくいかない。

          ### 解決方法
          Flexboxを使うと簡単！

          ```css
          .container {
            display: flex;
            justify-content: center; /* 水平方向の中央揃え */
            align-items: center;     /* 垂直方向の中央揃え */
            height: 100vh;           /* 画面全体の高さ */
          }
          ```

          ## 躓いたポイント3: レスポンシブデザインがわからない

          ### 問題
          スマホで見ると表示が崩れる。

          ### 解決方法
          メディアクエリを使って、画面サイズごとにスタイルを変更。

          ```css
          /* PC用 */
          .container {
            width: 1200px;
            margin: 0 auto;
          }

          /* タブレット用 */
          @media (max-width: 768px) {
            .container {
              width: 100%;
              padding: 0 20px;
            }
          }

          /* スマホ用 */
          @media (max-width: 480px) {
            .container {
              padding: 0 10px;
            }
          }
          ```

          ## 学習のコツ

          ### 1. 手を動かす
          理論だけでなく、実際にコードを書いて確認する。

          ### 2. 検証ツールを使う
          ブラウザの開発者ツール（F12）でスタイルを確認・編集。

          ### 3. 小さなプロジェクトから始める
          いきなり複雑なサイトを作ろうとせず、簡単なページから。

          ## 参考にしたサイト

          - MDN Web Docs
          - Progate
          - ドットインストール

          最初は分からないことばかりですが、継続して学習していれば
          必ずできるようになります！一緒に頑張りましょう💪
        MARKDOWN
      },
      {
        title: "プログラミング初学者がGitを使い始めるまで",
        content: <<~MARKDOWN
          # 初学者のGit入門体験記

          プログラミングを始めて「Gitを使った方がいい」と聞くけれど、
          何から始めればいいかわからない...そんな私のGit学習体験記です。

          ## Gitって何？なぜ必要？

          最初は全然わかりませんでしたが、調べてみると：

          - **バージョン管理ツール**: コードの変更履歴を管理
          - **バックアップ**: コードが消えても安心
          - **協力開発**: チームでの開発に必須

          要するに「コードの履歴を保存してくれる便利なツール」ということがわかりました。

          ## GitHubアカウント作成

          まずはGitHubでアカウントを作成しました。
          無料プランで十分です！

          ## 初めてのリポジトリ作成

          ### 1. GitHubでリポジトリ作成
          - Repository nameに「my-first-project」と入力
          - Publicを選択（後で変更可能）
          - 「Add a README file」にチェック

          ### 2. ローカルにクローン
          ```bash
          git clone https://github.com/username/my-first-project.git
          ```

          最初はコマンドが怖かったですが、慣れてきました。

          ## 基本的なGitコマンド

          ### ファイルの変更を記録
          ```bash
          # 変更をステージに追加
          git add .

          # コミット（変更を記録）
          git commit -m "初回コミット"

          # GitHubにアップロード
          git push
          ```

          ### 現在の状態確認
          ```bash
          # 変更状況を確認
          git status

          # コミット履歴を確認  
          git log
          ```

          ## 実際にやってみたこと

          ### 1. HTMLファイルを作成
          ```html
          <!DOCTYPE html>
          <html>
          <head>
            <title>私の初めてのWebサイト</title>
          </head>
          <body>
            <h1>Hello, Git!</h1>
            <p>Gitの練習をしています。</p>
          </body>
          </html>
          ```

          ### 2. Gitで管理
          ```bash
          git add index.html
          git commit -m "HTMLファイルを追加"
          git push
          ```

          ### 3. 変更を加える
          ```html
          <body>
            <h1>Hello, Git!</h1>
            <p>Gitの練習をしています。</p>
            <p>2回目の変更です！</p> <!-- 追加 -->
          </body>
          ```

          ```bash
          git add index.html
          git commit -m "説明文を追加"
          git push
          ```

          ## 困ったこと・解決方法

          ### 問題1: コミットメッセージを間違えた
          → あとから修正できることを学習（まだ使っていませんが）

          ### 問題2: プッシュができない
          → リモートリポジトリが更新されていた
          → `git pull`で最新版を取得してから`git push`

          ### 問題3: ファイルを間違って削除
          → Gitで管理していたおかげで復旧できました！

          ## 学んだこと

          - 小さな変更でもこまめにコミット
          - コミットメッセージは分かりやすく
          - バックアップの重要性

          ## 次の目標

          - ブランチの使い方を覚える
          - プルリクエストを試してみる
          - GitHubのIssue機能を使ってみる

          Gitは最初こそ難しく感じましたが、慣れてくると
          とても便利で安心してコーディングできます。

          初学者の皆さん、一緒に頑張りましょう！
        MARKDOWN
      },
      {
        title: "初学者がBootstrapで簡単なWebサイトを作った話",
        content: <<~MARKDOWN
          # Bootstrapで初めてのレスポンシブサイト

          CSS書くのって大変...そんな時に先輩から「Bootstrap使ってみたら？」と
          アドバイスをもらい、初めて使ってみました！

          ## Bootstrapとは？

          調べてみると：
          - **CSSフレームワーク**: 事前に用意されたスタイル
          - **レスポンシブ対応**: スマホでも自動で見やすく
          - **簡単**: クラスを指定するだけでおしゃれに

          ## セットアップ

          CDNを使って簡単にスタート！

          ```html
          <!DOCTYPE html>
          <html lang="ja">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>私のポートフォリオ</title>
            <!-- Bootstrap CSS -->
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
          </head>
          <body>
            <!-- コンテンツ -->
            
            <!-- Bootstrap JS -->
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
          </body>
          </html>
          ```

          ## 実際に作ったサイト

          ### ナビゲーションバー
          ```html
          <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
            <div class="container">
              <a class="navbar-brand" href="#">私のサイト</a>
              <div class="navbar-nav">
                <a class="nav-link" href="#about">About</a>
                <a class="nav-link" href="#projects">Projects</a>
                <a class="nav-link" href="#contact">Contact</a>
              </div>
            </div>
          </nav>
          ```

          ### ヒーローセクション
          ```html
          <section class="bg-light py-5">
            <div class="container">
              <div class="row align-items-center">
                <div class="col-md-6">
                  <h1 class="display-4">こんにちは！</h1>
                  <p class="lead">プログラミング初学者です</p>
                  <a href="#projects" class="btn btn-primary btn-lg">作品を見る</a>
                </div>
                <div class="col-md-6">
                  <img src="profile.jpg" class="img-fluid rounded" alt="プロフィール">
                </div>
              </div>
            </div>
          </section>
          ```

          ### プロジェクト紹介
          ```html
          <section id="projects" class="py-5">
            <div class="container">
              <h2 class="text-center mb-5">作品紹介</h2>
              <div class="row">
                <div class="col-md-4 mb-4">
                  <div class="card">
                    <img src="project1.jpg" class="card-img-top" alt="プロジェクト1">
                    <div class="card-body">
                      <h5 class="card-title">電卓アプリ</h5>
                      <p class="card-text">JavaScriptで作った簡単な電卓です。</p>
                      <a href="#" class="btn btn-outline-primary">詳細を見る</a>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 mb-4">
                  <div class="card">
                    <img src="project2.jpg" class="card-img-top" alt="プロジェクト2">
                    <div class="card-body">
                      <h5 class="card-title">ToDoアプリ</h5>
                      <p class="card-text">タスク管理ができるシンプルなアプリです。</p>
                      <a href="#" class="btn btn-outline-primary">詳細を見る</a>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 mb-4">
                  <div class="card">
                    <img src="project3.jpg" class="card-img-top" alt="プロジェクト3">
                    <div class="card-body">
                      <h5 class="card-title">天気アプリ</h5>
                      <p class="card-text">APIを使った天気予報アプリです。</p>
                      <a href="#" class="btn btn-outline-primary">詳細を見る</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          ```

          ## 使ってみて良かった点

          ### 1. 速い！
          自分でCSSを書くより断然早くできました。

          ### 2. レスポンシブが簡単
          `col-md-6`のようなクラスだけで、画面サイズに応じてレイアウトが変わります。

          ### 3. 統一感がある
          色やスタイルが統一されていて、見た目がプロっぽくなります。

          ## 困ったこと

          ### 1. カスタマイズが難しい
          デフォルトのデザインから変更したい時に、CSSの知識が必要でした。

          ### 2. クラス名を覚えるのが大変
          最初はどのクラスを使えばいいかわからず、ドキュメントを見まくりました。

          ## 今後の目標

          - Bootstrap以外のフレームワークも試してみる（TailwindCSSなど）
          - カスタムCSSとの組み合わせ方を覚える
          - Sassを使ったBootstrapのカスタマイズ

          ## 初学者へのアドバイス

          - 最初は公式ドキュメントのサンプルをコピーして試してみる
          - 小さなコンポーネントから始める
          - レスポンシブの仕組みを理解する

          Bootstrapのおかげで、見た目の良いサイトが簡単に作れました。
          初学者にはとてもおすすめです！

          まだまだ学ぶことは多いですが、楽しく続けていきたいと思います😊
        MARKDOWN
      }
    ]

    # テストユーザー1の記事作成
    user1_articles.each do |article_data|
      Article.find_or_create_by(title: article_data[:title], user: user1) do |article|
        article.content = article_data[:content]
        article.status = :published
      end
    end

    # テストユーザー2の記事作成
    user2_articles.each do |article_data|
      Article.find_or_create_by(title: article_data[:title], user: user2) do |article|
        article.content = article_data[:content]
        article.status = :published
      end
    end
  end