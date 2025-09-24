# WGGJ
## WebGame Graphics Javascript
Schrottii's framework for managing objects and easy rendering of graphics using JavaScript/Canvas. Easy to use and fast performance (for Canvas standards). Primarily made for webgames but can be used for other things too. 

I mostly made this for myself but anyone else can use it too. Explanation how to use it and how it works below in this file. 

All it needs is one file (wggj.js), it can simply be copied. Do not edit it. The usual files like index.html are obviously needed as well. Everything is explained below.

This repo includes a visual example of how it works, visit its page / index.html to see it in action. For more examples, check games I have made using this, including Toasty Bird and QuoteQuiz (where the idea originated)

### Current Version: v1.5



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
- size: wggj.config.font size, default is 12px
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
See PATCHNOTES.md

## Future plans
- Stronger hitbox/render functions
- Show hitboxes
- Particles
- More customization