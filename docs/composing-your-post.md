# Composing Your Post

## The Art of the Headline
Headlines, like poetry and songs, should have a rhythm about them. [Read these tips](http://web.ku.edu/~edit/heads.html) on writing good headlines before you start. Make sure they follow the ["dooh-dah"](http://web.ku.edu/~edit/heads.html) rule.

## Images

### Content Guidelines
- avoid using text/headlines in an image
- use simple, high quality images
- crop images at 4:3
- use images with a central point of focus

### Adding Images
Follow this format to add inline images to your article. By default, all images will be displayed at thei
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
