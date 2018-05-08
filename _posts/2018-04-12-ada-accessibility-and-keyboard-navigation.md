---
title: Building A Better Keyboard Navigation
description: Zen and the art of the focus ring. What I learned while making our navigation more accessible with a keyboard.
author: 
- Jaret Stezelberger
date: 2018-04-12
categories:
- front end
tags:
- WAI-ARIA
- Accessibility
- Navigation
- ADA
- Javascript
image:
  feature: ~
  credit: ~
  creditlink: ~
---

The simplest way to understand the importance of web acessiblility is to open a web browser, put on a blindfold, and try navigating a website. Despite a small percentage of users with disabilities, thier human right to navigate the internet still stands. In this post I'll share some of my learnings from making our navigation more accessible.

## W3C Reccomendations for Accessibility

Not familiar with this type of work, I referred to [WAI-ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices-1.1/#menu), and found the following reccomendations helpful. *Just in case, WAI stans for "Web Accessibility Initiative", and ARIA stands for "Accessible Rich Internet Application".*

- Leverage WAI-ARIA Roles, States, and Properties 
- Manage Focus Inside Composite Elements
- All Components Need To Be Reachable Via The Keyboard

	
### 1. Leverage Roles, States, & Properties 
Landmark roles are are defined by many of the [HTML5 elements](https://www.w3.org/TR/2017/NOTE-wai-aria-practices-1.1-20171214/examples/landmarks/HTML5.html), For example, the `<nav>` element gets the aria role `navigation`, by default. These default roles aid assitive technologies used to browse web pages, but to make our markup more accessible, we need to also utilize aria states.

Aria states like `aria-haspopup` or `aria-expanded` are what every screen reader dreams of. Using `aria-haspopup` lets screen readers know there's a submenu available. The `aria-expanded` attribute will indicate to a screen reader that a menu is expanded or callapsed, it's also great for applying UI changes with CSS, ie; opening and closing flyout menus that are being interacted with.

```scss
.nav_link[aria-expanded=true], a:hover {
	display: block;
}
```

When testing with screen readers, there were some less than useful audio feeback around the number of items in a popup menu. The screen reader didn't make it completely clear how man items were being displayed in a submenu. This was caused by various levels of nested `<UL>` elements. Stuck with our existing HTML markup for now, changing the role of each anchor element from `link` to `menuitem` produced more relevant audio feeback. I raised the idea of ditching the traditional navigation `<ul>` markup in favor of a `<span>` containing a bunch of `<a>` elements. Given everything has the correct aria attirbutes, i didn't forsee any issues, but it seams the internet still favors `<ul>` for nav structures. 


### 2. Manage the Focus Ring. (own it, don't hide it)
Not every element on a page needs to be in the "tab order", but all interactive elements should be focusable through scripting. It's obviously not a good idea to manually set the 'tab-index' property, but setting it to '-1' allows us to focus that element with javascript. Regardless if it's a focusable elemement by default. Changing `tab-index` from -1 to 0, or using the "Roving Tab Index", is a great way to manage the focus ring and tab sequence. This also helps isolate parts of a form or a page into focusable groups, minimizing the number of tab stops to navigate. The other way is using the `aria-activedescendant`, but the benefit of `tab-index` is the user agent will scroll to bring the element into view if it's not. 

WAI-ARIA Authoring Practices reccomends the tab sequence should include only one focusable element of a composite UI component. Or, the element that is to be included in the tab sequence has tabindex of "0" and all other focusable elements contained in the composite component have tabindex of "-1". For example, a nav item in a menu bar. Once a composite component contains focus, the menu bar in this case, pressing the enter key will shift focus to the first element inside of it and keys other than Tab and Shift + Tab will move focus among its focusable elements. See the section on "expected keyboard navigation" below.

The important thing to highlight here, is that this technique removes unnessecary elements from the natural tab sequence, simplifying the user experience for keyboard users by not focusing every single element while tabing through a page. Instead, users can tab from component to component, choosing to dive deeper or move on. This creates a more efficient navigation and limits the number of key presses required to get to a specific part of the page. If a user is using a mouth stick to type, this is extemely helpful.  

You can learn more about this technique in [5.5 Keyboard Navigation Between Components (The Tab Sequence)](https://www.w3.org/TR/wai-aria-practices-1.1/#kbd_general_between)
and [5.6 Keyboard Navigation Inside Components](https://www.w3.org/TR/wai-aria-practices-1.1/#kbd_general_within).

### 3. Create Expected Keyboard Navigation
When the user decides to dive deeper into a composite component, there are some standard key strokes and expected functionality. Some of these may not be familiar to mouse users, but are to users relying on the keyboard. W3C specifies the following keys and actions when developing a keyboard interface. A few have optional reccomendations, but specify that it's up to the author to decide. Bottom line here is to maintain a consistent functionality across your application and it's composite components. Also, making sure to move the focus ring in an expected direction or location. 

Key              | Action                          
-----------------|----------------------------------------------------
**Space or Enter** | Opens the submenu and places focus on its first item.
**Down Arrow** | Opens its submenu and places focus on the first item in the submenu.
**Up Arrow** | Moves focus to the previous item, optionally wrapping from the first to the last.
**Right Arrow** | Moves focus to the next item, optionally wrapping from the last to the first.
**Left Arrow** | Moves focus to the previous item, optionally wrapping from the last to the first.
**Home** | Moves focus to the first item in the current menu or menubar.
**End** | Moves focus to the last item in the current menu or menubar.
**Any key** that corresponds to a printable character | Moves focus to the next menu item in the current menu whose label begins with that printable character.
**Escape** | Closes the menu that contains focus and return focus to the element or context
**Tab** | Moves focus to the next element in the tab sequence, and if the item that had focus is not in a menubar, closes its menu and all open parent menu containers.
**Shift + Tab** | Moves focus to the previous element in the tab sequence, and if the item that had focus is not in a menubar, closes its menu and all open parent menu containers.

For the full spec on keyboard navigation, you can refer to the W3C spec [here](https://www.w3.org/TR/wai-aria-practices-1.1/#keyboard-interaction-11).


### Implementation Tid Bits
We started with the example scripts that W3C provides in their [menubar demos](https://www.w3.org/TR/wai-aria-practices-1.1/examples/menubar/menubar-1/menubar-1.html). These are free to use, fairly simple to follow and made a great starting point. The main class is applied during the React lifecycle at `componentDidMount()` and passed our navigation `<ul>`. It simply traverses the DOM for `<ul>`, `<li>` and `<a>` elements setting the appropriate states and attributes for each. We added a data-column attribute to our react template to help traverse back up the dom tree to easily provide users with the ability to navigate between columns using the left and right arrow keys. 

Below is a quick screen capture demonstrating the roving tab index technique.
<video width="100%" autoplay="true" loop="true" name="keyboard navigation demo" src="./assets/images/ada-keyboard-navigation/keyboard-navigation-demo.mov" style="margin-top: 40px; border-bottom: solid 1px #ccc;"></video>

### Challenges
1. In our submenus, few links in our small breakpoint menu are hidden from our large breakpoint. We needed a `setTimeout()` to put a break in the order of operations so the browser would parse the CSS and then apply our keyboard navigation code. This allowed us use 'getComputedStyle()' to skip over any elements that had `display: none;`. Otherwise, the hidden elements broke our tab sequence because the script indexed the anchor in the DOM, but because it was hidden there was nothing to focus.

2. Another `setTimeout()` was needed to properly focus the first item when a submenu was opened. This was because of our "fancy" transition on the submenu `<ul>` from `opacity: 0` to `opactiy: 1`. A similar problem again, focusing an item isn't possible if it's hidden, so we needed to pause our script to let that transition to run, allow the browser to render the changes and report them back, allowing javascript to get the latest, updated styles. 

3. Having 2 actions for each nav item, one for the category landing page, and the other for the popup. This isn't apparent when using a mouse and having the hover effect, but with just a keyboard, it needs to be clear to the user that there are 2 options. For now, we've styled the element with a down arrow when it's in focus, gave the element a role of `link`, and an attribute of `aria-haspopup`. This provides visual and audio feedback. Optionally, and perhaps a future improvement would be to create a second element to focus and control the popup menu, separating it from the link to the category page. The W3C provides their own guidance on this [here](https://www.w3.org/WAI/tutorials/menus/flyout/#flyoutnavkbbtn).

4. Smaller breakpoints still need to be included and we have to go back and work on this. It's possible a user may have a bluetooth keyboard connected to a tablet.

### Conclusions
It's fairly easy to make your navigation more keyboard friendly and there are some great resources from the Web Accessibility Initiative that will help you do it. Going through this exercise exposed a few areas we could apply this same logic and improve our site's overall accessibility. This work also highlighted the need to internally communicate this persepctive in our [styleguide](https://styleguide.hbc.com) so our teams designing and developing new components can be aligned.
- Web Accessibility is a human right
- Create efficient keyboard navigation patterns
- Limit the number of key presses required to get to a specific part of the page

So, if you're updating your site's navigation, hopefully what I've shared from our experience will help you make your nav more accessible to users who rely on a keyboard to surf the web.
