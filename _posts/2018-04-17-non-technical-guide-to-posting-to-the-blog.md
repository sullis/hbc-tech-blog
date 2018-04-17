---
title: A Non-Technical Guide to Posting to the Tech Blog.
description: Step by step instructions explaining how to post to the tech blog without requiring a degree in computer science.
author: 
- Jaret Stezelberger
date: 2018-04-12
categories:
- Culture
tags: 
- Tech Blog
- Culture
image:
  feature: ~
  credit: ~
  creditlink: ~
---
Our tech organization is obviously made up of more than just developers.  Non-developers have great insight from their work too! This post is a nudge to all my fellow colleagues who are busy doing amazing work and would like to share, but feel like not knowing how to use the command line is blocking their chance to share. 

A guide for developers is available [here](https://github.com/saksdirect/hbc-tech-blog/blob/master/docs/contributing.md), for everyone else, read on.


## Step 1: Write Your Post

Probably the hardest part of this whole thing. All you need to do is open a new Google Doc and type one letter after the other. Organize your thoughts by utilizing built in headings, bulleted lists, and text styles already provided in Google Docs.


# Title


## Sub Title


# Heading 1


## Heading 2


### Heading 3

**Bold**

_Italic_

Bulleted List



*   item 
*   Item
*   item



---



## Step 2: Add Some Images

People like pictures! Illustrate your ideas with a few images, screen captures, or even cat GIFs if appropriate. Insert your images via the toolbar in Google Docs, but keep the original assets handy, we'll need to upload them to Github and adjust the image paths later. Don't worry about the technical stuff yet, just keep writing.


## Step 3: Convert Your Google Doc to Markdown

The Markdown stuff helps some web applications format text, create links, and embed images. Don't be scared, most of the conversion can be automated for you. There is a Google Docs Add-on called, you guessed it, Google Docs To Markdown, or GD2md for short. Follow [this link](https://chrome.google.com/webstore/detail/gd2md-html/igffnbdfnodiaphfmfaiiaegmoljbghf?utm_source=permalink) to add it to your Google Drive.


#### When you're happy with what you've written, follow the steps below:



1.  From the Google Docs **Add-ons** menu, select **GD2md-html > Convert**. The sidebar window opens.

2.  Use the Markdown button in the sidebar window to convert your document to Markdown. If you select part of the document, GD2md-html will convert only the selection. Otherwise it will convert the entire document. Click the Docs link for more information.

3.  Preview your post by copying and pasting the text from the sidebar into an online editor like [Stack Edit](https://stackedit.io/). 


## Step 4: Add Some YAML

We use YAML formatting to store information about each post ie: title, post date, category, etc. Copy the snippet below and change the values according to your post. _(make sure to copy the 3 dashes at the beginning and ending)_


```
---
title: A Non-Technical Guide to Posting to the Tech Blog.
description: Step by step instructions explaining how to post to the tech blog without requiring a degree in computer science.
author: Jaret Stezelberger
date: 2018-04-12
categories:
- Culture
tags: 
- Tech Blog
- How To
- Culture
---
```



## Step 5: Upload Everything To Github

If you don't already have GitHub account, get one [here](https://github.com/). It's the modern library card! Once you're signed into your Github Account, you're just a few simple steps away from posting.

1. Copy (Fork) HBC Tech Blog To Your GitHub Account 
2. Create A Copy For Your New Work (Create a New Branch)
3. Add Your Post File and Then Save (Commit) it
4. If Needed, Upload A Folder of Assets (Another Commit)
5. Let The Team Know You're Ready to Publish (Create A New Pull Request in GitHub)


### Here are those screens one by one:

Step 5.1 Fork It
![alt_text](./assets/images/blog-post-how-to/01-fork-button.png)

Step 5.2 Create A Branch For Your New Post
![alt_text](./assets/images/blog-post-how-to/02-create-new-branch.png)


Step 5.3 Navigate to the Posts Folder**
![alt_text](./assets/images/blog-post-how-to/03-navigate-to-posts-directory.png)

Step 5.4 Create Your Post File 
![alt_text](./assets/images/blog-post-how-to/04-create-new-file.png)


Step 5.5 Save Your Changes
![alt_text](./assets/images/blog-post-how-to/05-commit-new-file.png)


Step 5.6 Add Your Images
![alt_text](./assets/images/blog-post-how-to/06-navigate-to-images-directory.png)


Step 5.7 Upload your images
![alt_text](./assets/images/blog-post-how-to/07-upload-your-images.png)

Step 5.8 Update Image Your Paths
In the previous step, converting your Google Doc to Markdown, image paths were set with placeholders. You'll need to change these to correctly match the folder and file names you've uploaded to GitHub. In this example they would be ```./assets/images/blog-post-how-to/image-file-name.png```

Step 5.9 Create a New Pull Request
![alt_text](./assets/images/blog-post-how-to/08-create-pull-request.png)

