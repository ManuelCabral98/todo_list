FROM ruby:3.3-slim

# system dependencies
RUN apt-get update -qq && apt-get install -y \
    build-essential \
    libpq-dev \
    nodejs \
    libyaml-dev \
    && rm -rf /var/lib/apt/lists/*

#  work directory for backend
WORKDIR /app

# first copy currently installed gems and then run bundle install. This allows us to save execution time 
COPY Gemfile Gemfile.lock ./
RUN bundle install

# copy code inside /app
COPY . .

# Just for informational purposes
EXPOSE 3000

# run container
CMD ["rails","server","-b","0.0.0.0"]



