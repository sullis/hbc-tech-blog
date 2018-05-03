---
title: Building A Better Keyboard Navigation
description: Zen and the art of the focus ring. What I learned while making our navigation more accessible with a keyboard.
author: 
- "Jaret Stezelberger"
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

The simplest way to understand the importance of web acessiblility is to open a web browser, put on a blindfold, and try navigating a site. Despite a small percentage of users with disabilities, thier human right to navigate the internet is just as deserved as anyone elses. In this post I'll share some of my learnings from making our navigation more accessible.

## W3C Reccomendations for Accessibility

Not familiar with this type of work, I referred to [WAI-ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices-1.1/#menu), and found the following reccomendations helpful. *Just in case, WAI stans for "Web Accessibility Initiative", and ARIA stands for "Accessible Rich Internet Application".*

- Leverage WAI-ARIA Roles, States, and Properties 

- All Components Need To Be Reachable Via The Keyboard

- Manage Focus Inside Composite Elements

### Implementation
Adding the data-column attribute in react to help traverse up the dom tree, and let users navigate between columns
	
### Leveraging Roles, States, & Properties 
These aid assitive technologies used to browse web pages. Landmark roles are are defined by many of the [HTML5 elements](https://www.w3.org/TR/2017/NOTE-wai-aria-practices-1.1-20171214/examples/landmarks/HTML5.html), ie; the `<nav>` element defaults to the aria role `navigation`. This is great, but we need to do a more to make our markup more accessible.

When testing with screen readers, there was some less than useful audio feeback around the number of items in a popup menu. This was caused by various levels of nested `<UL>` elements. Stuck with the existing markup, changing the role of each anchor element from `link` to `menuitem` produced more relevant audio feeback.

States and properties like `tab-index`, `aria-haspopup`, or `aria-expanded` are the real meat and potatoes of making your navigation accessible. The `aria-expanded` attribute is also great for applying UI changes when flyout menus are interacted with.

### The Roving Tabindex Technique
This is how we chose to mange the focus. The other way is using the `aria-activedescendant`, but the benefit of `tab-index` is the user agent will scroll to bring the element into view if it's not. The tab sequence should include only one focusable element of a composite UI component. Once a composite contains focus, keys other than Tab and Shift + Tab enable the user to move focus among its focusable elements. Once the component has focus, manage focus using a roving tabIndex. Simply, the element that is to be included in the tab sequence has tabindex of "0" and all other focusable elements contained in the composite have tabindex of "-1". You can learn more about this in [5.5 Keyboard Navigation Between Components (The Tab Sequence)](https://www.w3.org/TR/wai-aria-practices-1.1/#kbd_general_between)
and [5.6 Keyboard Navigation Inside Components](https://www.w3.org/TR/wai-aria-practices-1.1/#kbd_general_within).

When focus is on a menubar
When focus is in a menu

### Expected Keyboard Navigation
W3C specifies the following keys and actions when developing a keyboard interface. A few have optional declarations, but specify that it's up to the author to maintain a consistent functionality across a website and it's composite components.

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

### Challenges
Having 2 actions for each nav item, one for the category landing page, and the other for the popup. This isn't apparent when using a mouse and having the hover effect, but with just a keyboard, it needs to be clear to the user that there are 2 options. For now, we've styled the element with a down arrow when it's in focus, gave the element a role of `link`, and an attribute of `aria-haspopup`. This provides visual and audio feedback. Optionally, and perhaps a future improvement would be to create a second element to focus and control the popup menu, separating it from the link to the category page.
