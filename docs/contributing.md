# Contribution Guidelines

Download the latest copy of the blog
```
git clone https://github.com/saksdirect/hbc-tech-blog
cd hbc-tech-blog
```
Create a new branch for your post.

```
git checkout -b the-name-of-your-branch
```
 
## Create A Markdown File For Your Post
We've provided a [post starter file](./post-starter-file.md) to make life a little easier.
Use the following naming convention for your file: `YYYY-MM-DD-your-post-name.md`.
Your post markdown file should begin with `front matter`. This will define some basic attributes, see the example below to guide you. Save the **markdown** file in the `_posts` directory.

## Post Front Matter
Each post contains front matter, a header section with some auto-generated metadata (layout, title, author, date, categories, tags). Please always add the metadata as follows:

```
title: Your Title Here
description: A short description of your post in 160 characters or less
author: 
- First Name Last Name
date: YYYY-MM-DD
categories:
- just one please
tags: 
- your
- tags
- here
image:
  feature: assets-folder-named-to-match-your-post/name-of-your-image.jpg
  credit: ~
  creditlink: ~
```

- `title`: String, your post title. No need for quotes
- `description`: String, A short description of the page's content. Used for snippets in the article listing and in search engine results.
- `author`: Yaml list, can be more than one.
- `date`: String, YYYY-MM-DD format
- `categories`: Yaml list, Must be one of the following [categories](./contributing.md#predefined-categories).
- `tags`: Yaml list
- `image:
   feature:` Yaml string. image path or url

### Post Categories & Tags
Categories are used for navigation, ideally should be a short list. They also provide a quick overview to the content found on our blog. Limit your post category to one from the list below. Use tags for additional topic refinement. If you feel like your post can't be filed under one of these, we can create a new one. 

Tags are a free-form list. They're not used for navigation currently, but are parsed through the site search. These may become links in a future update.

#### Predefined Categories

```
back-end
data-science
events
infrastructure
product
culture
design
front-end
mobile
```


### Post Excerpts
Jekyll grabs post excerpts from the first paragraph by default. Tailor your post excerpt by using the '<!--more-->' excerpt separator. Limit post excerpts to less than 40 words or 200 characters.

## Writing Your Headline
Headlines, like poetry and songs, should have a rhythm about them. [Read these tips](http://web.ku.edu/~edit/heads.html) on writing good headlines before you start. Make sure they follow the ["dooh-dah"](http://web.ku.edu/~edit/heads.html) rule.

## Feature Images
Not a requirement, but it's strongly encouraged to include a feature image to your post.

#### Content Guidelines
- avoid using text/headlines in an image
- use simple, high quality images
- crop images at 16:9 (Landscape)
- use images with a central point of focus

#### Image Sizes
Providing images that are 2880px wide will support high resolution screens. Currently, we don't have a CDN in place to optimize images for mobile devices.

- Min image width *2880px*
- Min image height: *800px*
- JPG format
- Lossy compression
- Save images as “optimized for web” in tools such as Photoshop
- upload images to `/assets/images/[folder-named-to-match-your-post]/your-image.jpg` or your favorite CDN.

#### Examples
Images can be served from `/assets/images/`

```
image:
  feature: [folder-named-to-match-your-post]/my-feature-image.jpg
  credit: ~
  creditlink: ~
```


Or you can point to an image stored on a CDN:

```
image:
  feature: https://pbs.twimg.com/media/DEIosBJWAAAj87h.jpg
  credit: ~
  creditlink: ~
```

If you need some inspiration on images or you want a custom image, contact someone on the design team for help.


### Adding Inline Images
Follow this format to add additional images to your article. By default, all images will be displayed inline. See [Styling Your Image with Classes](#styling-your-image-with-classes) below for additional image display options.
```
![alt text](image url)
```

Images can be added in a couple ways;
1. locally hosted: can be added to this repo under `assets/images/`. In this case the URL for your image would be `./assets/images/[folder-named-to-match-your-post]/your-image.jpg`.
2. Remotely hosted: use an absolute URL to your image. ie: `http://some-domain.com/fancy-image.jpg`

### Linking An Image
Follow the example below when you want to link an image in your post.

```
[![the image alt text](http://the-image.jpg)](https://the-link-to-wrap-around-the-image/")
```

For links that navigate away from the site, target links in a new tab by adding `{:target="_blank"}` after the linked image.
```
[![the image alt text](http://the-image.jpg)](https://the-link-to-wrap-around-the-image/"){:target="_blank"}
```

### Styling Your Image with Classes
Sometimes you may want to have more control over how your image is displayed on the page. The following CSS classes are available:
- **left-align** (floats the image to the left, wraps text around image)
- **right-align** (floats the image to the right, wraps text around image)
- **center-image** (centers the image and takes up the full width of the page, no text wrap)
- **simple-border** (adds a simple border around an image, can be combined with above classes)

#### Examples

```
![the image alt text](http://the-image.jpg){:.center-image}

// or

![the image alt text](http://the-image.jpg){:.left-align .simple-border}

```

### Featured Authors
Featured authors are 

Become a featured author by contributing at least 3 articles and adding your bio to the [Featured Authors Collection](/_authors/).
Save your your bio as `firstName-lastName.html` using hyphen for spaces. Follow the YAML template below for your bio details:
```
---
name: Your Name
job-title: ~
mini-bio: > # 280 character limit! No html, no quotes, no line breaks, just one big string of 280 characters or less.
  Start your bio here. Note this line is indented 2 spaces. If it's not, the yaml parser breaks.

# list one or multiple
social-media-profiles:
- platform:
  url:
  handle:
- platform:
  url:
  handle:
---
```

