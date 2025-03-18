# WGGJ
## WebGame Graphics Javascript
Schrottii's framework for managing objects and easy rendering of graphics using JavaScript/Canvas. Easy to use and fast performance (for Canvas standards). Primarily made for webgames but can be used for other things too. 

I mostly made this for myself but anyone else can use it too. Explanation how to use it and how it works below in this file. 

All it needs is one file (wggj.js), it can simply be copied. Do not edit it. The usual files like index.html are obviously needed as well. Everything is explained below.

This repo includes a visual example of how it works, visit its page / index.html to see it in action. For more examples, check games I have made using this, including Toasty Bird and QuoteQuiz (where the idea originated)

### Current Version: v1.3



# Getting started
## This section explains how to implement WGGJ and its basic functionality

To setup wggj for a project, follow the simple steps:
1. Copy the wggj.js file (found in /code) into the code folder
2. Follow the instructions at the top of wggj.js (some code that needs to be put into main.js or a similar file, and index.html or in whatever html file the canvas should be)

This entire repo is a barebones example of how it can work



# Elements
## All the element explained

### Square
This creates a simple single-color square element

Is visible but does nothing

createSquare(name, x, y, w, h, color, config?);

example: createSquare ("mySquare1", 0, 0, 1, 1, "black");

config:
- power: when turned to false, it becomes invisible/unclickable (disabled)
- clickableOnly: when turned to true, it becomes a clickable

- onClick(): event when it's clicked
- onHold(): event when the mouse is pressed down and in the element's area
- onMouseMove(): event when the mouse is moving while in the area
- onHover(): event when the mouse is in the area, moving or not, clicking/holding or not


### Clickable
This creates a simple clickable area (invisible square)

Can be clicked, but is invisible


createClickable(clickableName, x, y, w, h, onClick, config = {});

example: createClickable("myClickable1", 0, 0, 1, 1, () => { console.log("Screen clicked!") });
config:
- same as createSquare


### Image
This creates an image element

Is visible but can not be clicked

createImage(name, x, y, w, h, image, config?);

example: createImage("myImage1", 0.4, 0.4, 0.2, 0.2, "placeholder", { quadratic: true });

config:
- quadratic: makes width and height the same
- centered: normally, it begins in the top left corner of the x and y. with this it's in the middle instead
- power: when turned to false, it becomes invisible/unclickable (disabled)

- onClick(): event when it's clicked
- onHold(): event when the mouse is pressed down and in the element's area
- onMouseMove(): event when the mouse is moving while in the area
- onHover(): event when the mouse is in the area, moving or not, clicking/holding or not


### Button
This creates a button element

Is visible (simple color or image) and can be clicked

createButton(clickableName, x, y, w, h, color, onClick, config?);

example: createButton("myButton1", 0, 0, 0.2, 0.2, "#FFFFFF", () => { coins += 1 }, { quadratic: true });

config:
- same as createImage
- NOTE: color can act as an image or a color. if it's a hex code starting with # such as #FFFFFF the button becomes a solid color, if it's anything else it's interpreted as an image


### Text
This creates a text element

Is visible but can not be clicked

createText(name, x, y, text, config?);

example: createText("myText1", 0.5, 0.5, "Hello World", { size: 40 });

config:
- color: text color, default is black
- size: font size, default is 12px
- align: horizontal text align, default is center
- power: when turned to false, it becomes invisible/unclickable (disabled)
- noScaling: when turned to true, it does not scale with screen width


### Container
This creates a container element, which can be the parent of children objects, and be used to create a scrollable area. Invisible by default. 
Children can be added by directly generating them with the container, or by referencing their names.

createContainer(name, x, y, w, h, config, children);

example: createContainer("upgradesContainer", 0, 0.2, 0.2, 0.8, { YScroll: true, YLimit: [1, 0.2] }, [ ... ])

config:
- color: makes it visible, background color
- XScroll: enables scrolling on the X axis
- YScroll: enables scrolling on the Y axis
- XScrollMod: adjusts scroll speed on the X axis
- YScrollMod: adjusts scroll speed on the Y axis
- XLimit: left-right border
- YLimit: up-down border
- limitEffect: visual effect when hitting a limit, can have custom color


## Magic
### Changing objects
Objects can be changed very easily, here are three examples:
- objects["myText1"].text = "Coins: " + coins;
- objects["myImage1"].image = "completed";
- objects["myButton1"].power = false;

### Adding variables to objects
Variables can be added to objects pretty easily. This makes it possible to access them from the loop. Example:
- objects["myClickable1"].timesClicked = 0;

### Self-reference in onClick
If you want an object to reference itself in its own onClick function, use c:
- objects["myClickable1"].onClick = (c) => {
	c.timesClicked++;
}



# Scenes
## Basics
A scene consists of two parts, the init and the loop. The init is called once, when the scene is loaded. This is where elements like buttons and texts are defined. The loop is consistently called every frame, and is used for ticking timers or updating objects. Both are very important, but easy to understand.

A scene is called with loadScene(sceneName). The default scene has to be called mainmenu, as the game goes to the mainmenu scene when opened. Example: you want to load a scene called upgrades, so you do loadScene("upgrades").

## Creating a new scene
The scenes/example.js file here has an empty scene. I recommend copying that whenever you create a new one. Decide on a scene name, for example upgrades, and call your file that. I recommend saving it in a folder called scenes. So it could be something like code/scenes/upgrades.js 

At the top you see scenes["example"]. Change example to the name of your scene. Load the scene in a html file such as index.html, like how you load other code files. Below that you see two comments, "Init" and "Loop", one of them is the init, the other is the loop.



# Patch notes
## What's new in every update

### v1.0
- Release



### v1.1
Released on 2024-12-02
-> New content:
- REMOVED clickables and integrated them into objects
- ADDED onHold, the swipier version of onClick
- Added support for canvases that don't cover the entire screen: use wggjCanvasDesiredWidthMulti and wggjCanvasDesiredHeightMulti to adjust its size, temporarily or permanent
- Added wggjImageSmoothing... in case you want to turn that thing on

-> New configs:
- All: onClick & onHold
- Text: Added noScaling config (true/false) - for all your tight space needs
- Square: Added clickableOnly config (true/false) - makes it ALWAYS invisible (like clickables before)

-> Improvements:
- Changed text scaling formula for smooth 1 - 0.5 between PC - mobile
- Added a background for the loading screen
- Optimized Text and Square rendering (not Image (yet))
- Minor improvements

-> Compability notes:
- Note the following things when updating from v1.0 to v1.1:
- IMPORTANT: clickables[] has been removed entirely and integrated into objects[] - change all clickables[ to objects[ (createClickable still exists) and make sure nothing becomes a duplicate in objects now. also change clickables[x](y) or clickables[x][0] syntax
- Text scaling was changed, you may want to adjust it or use noScaling for certain elements



### v1.1.1
Released on 2024-12-28
-> Visual Example:
- Reworked the showcase / visual example
- It now has multiple scenes and goes into some detail on every element
- Texts explain how WGGJ works

-> Other:
- Added explanation for Scenes to the documentation



### Future plans
- Stronger hitbox/render functions
- Show hitboxes
- HOVER
- Sound system with channels
- Animations
- More customization



### v1.2
Released 2025-01-29
-> New content:
- New Element: Container! (See section below)
- ADDED onUp, the on-release version of onClick
- Functions to create elements, like createButton, now return the name of the object, if it's created, or "" if not
- Added currentX, currentY, currentW and currentH functions for all elements except Text
- Added wggjRunning: use it to stop the loop
- Added wggjSceneDebug: The debug messages when loading a scene are now off by default, but can be brought back by changing the new wggjSceneDebug to true
- Added wggjStartScene: The scene loaded on start can now be changed with wggjStartScene

-> Containers:
- New class WGGJ_Container
- This creates a container (invisible by default) that can be used to create a scrolling area
- Use the configs XScroll and YScroll to enable scrolling for an axis
- Use the configs XScrollMod and YScrollMod to adjust the scrolling speed
- Use the config color to make it visible
- Create elements inside the container, as children, which will make the container their parent. This is done via an array
- Alternatively, their names can be referenced, and they can be added later, this works too.
- Elements inside a container are rendered combined at the time of the container
- Elements inside a container can't leave it, if scrolled too much, they disappear smoothly

-> New configs:
- All: onUp
- Container: color, XScroll, YScroll, XScrollMod, YScrollMod

-> Changes:
- Renamed the element classes Square to WGGJ_Square, Picture to WGGJ_Image and Text to WGGJ_Text
- Renamed the custom loop() function to customWGGJLoop() and the custom init() to customWGGJInit(). This is to prevent using other loop/init functions, since it is a common name.
- Renamed onClick() to wggjEventsOnClick(), onPointerUp() to wggjEventsOnPointerUp() and onPointerMove() to wggjEventsOnPointerMove() to prevent more possible compability issues

-> Visual Examples:
- Added a new main menu (previous mainmenu file is now exampleText) which lets you directly select the thing you want to see
- Added a tutorial for containers, with some example children and three buttons to play around with
- Added "go back to main menu" buttons in the top left corner of every tutorial

-> Other:
- Squares, Images, etc. are now officially called elements, and referred to as such in the documentation
- Added documentation for Containers
- Minor code changes, and more comments added

-> Compability notes:
- If you used a custom loop() or init() function for WGGJ, you need to change the name (see Changes section above)
- If you interacted with WGGJ's onClick(), onPointerUp() or onPointerMove() functions, you need to change them to their new names (see Changes section above)



### v1.2.1
Released 2025-01-31
-> New configs:
- Container: XLimit and YLimit
- Container: limitEffect

-> Container limits:
- Define limits using XLimit and YLimit
- They are 2-element arrays (for example [0.5, 0.5])
- XLimit is left, right and YLimit is up, down
- The numbers are a fraction of the screen width/height like other element width/height, not pixels (for that, divide by the width/height)
- They can be turned off again at any time, which will push you back into the boundaries on the next drag
- limitEffect can be set to true (for default white), or to a color, to add a border when reaching a limit on any side. Only visible while holding

-> Other:
- Added limits and a button to disable them to the visual example
- Slightly expanded info text at the start of the wggj.js file



## v1.3
Released 2025-03-18
-> New configs:
- Square and Image: onMouseMove
- Square and Image: onHover

-> Mouse events:
- Added wggjMouse for more efficient mouse tracking, you can access it too (e. g. wggjMouse.x)
- Added the 4 mouse functions: onClick, onHold, onMouseMove & onHover - to the documentation:
- onClick(): event when it's clicked
- onHold(): event when the mouse is pressed down and in the element's area
- onMouseMove(): event when the mouse is moving while in the area
- onHover(): event when the mouse is in the area, moving or not, clicking/holding or not

-> Hitboxes:
- Added isHit(x, y) for Squares, Images and Containers
- Used to check if something (such as the mouse) is within the element's boundaries
- The four mouse functions now use that, and you can use it too