# Contribution Guidelines

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
```

- `title`: String, your post title. No need for quotes
- `description`: String, A short description of the page's content. Used for snippets in the article listing and in search engine results.
- `author`: Yaml list, can be more than one.
- `date`: String, YYYY-MM-DD format
- `categories`: Yaml list, Must be one of the following [categories](/_data/categories.md). Use tags for additional topic refinement.
- `tags`: Yaml list

### Post Excerpts
Jekyll grabs post excerpts from the first paragraph by default. Tailor your post excerpt by using the '<!--more-->' excerpt separator. Limit post excerpts to less than 40 words or 200 characters.

## Writing Your Headline
Headlines, like poetry and songs, should have a rhythm about them. [Read these tips](http://web.ku.edu/~edit/heads.html) on writing good headlines before you start. Make sure they follow the ["dooh-dah"](http://web.ku.edu/~edit/heads.html) rule.

## Feature Images
Not a requirement, but it's strongly encouraged to include a feature image to your post. If you need some inspiration on images or perhaps you want a custom image, email the design team for some help. 

### Content Guidelines
- avoid using text/headlines in an image
- use simple, high quality images
- crop images at 4:3
- use images with a central point of focus

### Adding Additional Images
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
