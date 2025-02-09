FROM ruby:3.1.2
RUN apt-get update -qq && apt-get install -y vim

RUN mkdir /myapp
WORKDIR /myapp

# entrypoint.shを先にコピーして権限を設定
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh

# その後でアプリケーションファイルをコピー
COPY Gemfile /myapp/Gemfile
COPY Gemfile.lock /myapp/Gemfile.lock

RUN gem update --system
RUN bundle update --bundler
RUN bundle install

# 最後にアプリケーションファイルをコピー
COPY . /myapp

ENTRYPOINT ["entrypoint.sh"]