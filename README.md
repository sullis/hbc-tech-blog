<img src="img/hbc-digital-logo-with-background.png" alt="logo" width="200" height="200">
# HBC Digital Tech Blog
A simple [jekyll](https://jekyllrb.com/) based theme for rendering infinite technical knowledge.

## Quick setup

```
git clone https://github.com/saksdirect/hbc-tech-blog
cd hbc-tech-blog
jekyll server
```

Open `http://localhost:4000` in your browser.

## Running with Docker

```
docker run --rm -it --volume=$PWD:/srv/jekyll -p 4000:4000 jekyll/jekyll:pages jekyll serve --watch --force_polling
```