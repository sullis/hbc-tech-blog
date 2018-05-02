---
title: ADA Accessibility & Better Keyboard Navigation
description: Zen and the art of the focus ring. What I learned while making our navigation more accessible with a keyboard.
author: 
- "Jaret Stezelberger"
date: 2018-04-12
categories:
- front-end
tags: 
- ADA
- Accessibility
- User Experience
- Javascript
image:
  feature: ~
  credit: ~
  creditlink: ~
---

The simplest way to understand the importance of website acessiblility is to fire up a browser and put on a blindfold. Without a sense of sight, you're relying on screenreaders.


## Reccomendations for Accessibility WAI-ARIA Authoring Practices

**All interactive UI components need to be reachable via the keyboard.**
[5.5 Keyboard Navigation Between Components (The Tab Sequence)](https://www.w3.org/TR/wai-aria-practices-1.1/#kbd_general_between)

**The tab sequence should include only one focusable element of a composite UI component.**
Once a composite contains focus, keys other than Tab and Shift + Tab enable the user to move focus among its focusable elements. Once the component has focus, manage focus using a roving tabIndex. Simply, the element that is to be included in the tab sequence has tabindex of "0" and all other focusable elements contained in the composite have tabindex of "-1".
[5.6 Keyboard Navigation Inside Components](https://www.w3.org/TR/wai-aria-practices-1.1/#kbd_general_within)



WAI-ARIA Roles, States, and Properties


What is ARIA

Accessible Rich Internet Application


## ADA Role and Aria Attributes 


## A technique called roving tabindex.
Roving tabindex works by setting tabindex to -1 for all children except the currently-active one


When focus is on a menubar
When focus is in a menu



## Helpful Tips
Adding the data-column attribute in react to help traverse up the dom tree, and let users navigate between columns



Space:
Enter: opens the submenu and places focus on its first item.

Down Arrow: opens its submenu and places focus on the first item in the submenu.

Up Arrow: moves focus to the previous item, optionally wrapping from the first to the last.

Right Arrow: moves focus to the next item, optionally wrapping from the last to the first.

Left Arrow: moves focus to the previous item, optionally wrapping from the last to the first.

Home: moves focus to the first item in the current menu or menubar.
End: moves focus to the last item in the current menu or menubar.

Any key that corresponds to a printable character: Move focus to the next menu item in the current menu whose label begins with that printable character.

Escape: Close the menu that contains focus and return focus to the element or context

Tab: Moves focus to the next element in the tab sequence, and if the item that had focus is not in a menubar, closes its menu and all open parent menu containers.
Shift + Tab: Moves focus to the previous element in the tab sequence, and if the item that had focus is not in a menubar, closes its menu and all open parent menu containers.