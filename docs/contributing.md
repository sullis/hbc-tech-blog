# Contribution Guidelines

## Post Front Matter
Each post contains front matter, a header section with some auto-generated metadata (layout, title, author, date, categories, tags). Please always add the metadata as follows:

```
layout: article
title: "Enter Your Title Here. Format: YYYY-MM-DD-your-post-name.md"
description: "A short description of your post in 160 characters or less"
author: 
- First Last
date: 'YYYY-MM-DD'
categories:
- just one
tags: 
- your
- tags
- here
```

- `layout`: String, leave this set to article.
- `title`: String, your post title
- `description`: String, A short description of the page's content. Used for snippets in the article listing and in search engine results.
- `author`: Yaml list, can be more than one. Optionally, you can add your bio to the [contributors file](/_data/contributors.md).
- `date`: String, 'YYYY-MM-DD' format
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

### Linking An Image
```
[![the image alt text](http://the-image.jpg)](https://the-link-to-wrap-around-the-image/")
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

### Guest Posts
If you're an individual or organization and you'd like to contribute a guest post to our blog, please contact [jcoghlan@gilt.com](mailto:jcoghlan@gilt.com)
