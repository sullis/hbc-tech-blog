## Development setup
- Make sure you have a recent version of Ruby Installed. Instructions [here](https://www.ruby-lang.org/en/downloads/)


- Install bundler to make life easier
```
gem install bundler
```

- If you haven't installed Node.js, you can find an installer [here](https://nodejs.org/en/download/)

```
npm install -g gulp
git clone https://github.com/saksdirect/hbc-tech-blog
cd hbc-tech-blog
bundle install && npm install
gulp
```

The default gulp task will build the jekyll blog, open the browser, and reload any assets that are changed during development.

See the gulpfile for additional tasks 
