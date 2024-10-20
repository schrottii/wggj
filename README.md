==========================

# WGGJ
## WebGame Graphics Javascript
Schrottii's framework for managing objects and easy rendering of graphics using JavaScript/Canvas. Easy to use and fast performance (for Canvas standards). Primarily made for webgames but can be used for other things too. 
I mostly made this for myself but anyone else can use it too. Explanation how to use it and how it works below in this file. 
All it needs is one file (wggj.js), it can simply be copied. Do not edit it. The usual files like index.html are obviously needed as well. Everything is explained below.
This repo includes a visual example of how it works, visit its page to see it in action. For more examples, check games I have made using this, including Toasty Bird and QuoteQuiz (where the idea originated)

## Current Version: v1.0

==========================

# Getting started
## This section explains how to implement WGGJ and its basic functionality

To setup wggj for a project, follow the simple steps:
1. Copy the wggj.js file into the code folder
2. Follow the instructions at the top of wggj.js (some code that needs to be put into main.js or a similar file, and index.html or in whatever html file the canvas should be)

This entire repo is a barebones example of how it can work

==========================

# Functions
## All the functions explained

### Square
This creates a simple single-color square
Is visible but does nothing

createSquare(name, x, y, w, h, color, config?);
example: createSquare ("mySquare1", 0, 0, 1, 1, "black");
config:
- power: when turned to false, it becomes invisible/unclickable (disabled)

### Clickable
This creates a simple clickable area
Can be clicked, but is invisible

createClickable(clickableName, x, y, w, h, onClick);
example: createClickable("myClickable1", 0, 0, 1, 1, () => { console.log("Screen clicked!") });
no config

### Image
This creates an image
Is visible but can not be clicked

createImage(name, x, y, w, h, image, config?);
example: createImage("myImage1", 0.4, 0.4, 0.2, 0.2, "placeholder", { quadratic: true });
config:
- quadratic: makes width and height the same
- centered: normally, it begins in the top left corner of the x and y. with this it's in the middle instead
- power: when turned to false, it becomes invisible/unclickable (disabled)

### Button
This creates a button
Is visible (simple color or image) and can be clicked

createButton(clickableName, x, y, w, h, color, onClick, config?);
example: createButton("myButton1", 0, 0, 0.2, 0.2, "#FFFFFF", () => { coins += 1 }, { quadratic: true });
config:
- same as createImage
- NOTE: color can act as an image or a color. if it's a hex code starting with # such as #FFFFFF the button becomes a solid color, if it's anything else it's interpreted as an image

### Text
This creates text
Is visible but can not be clicked

createText(name, x, y, text, config?);
example: createText("myText1", 0.5, 0.5, "Hello World", { size: 40 });
config:
- color: text color, default is black
- size: font size, default is 12px
- align: horizontal text align, default is center
- power: when turned to false, it becomes invisible/unclickable (disabled)

## Magic
### Changing objects
Objects can be changed very easily, here are three examples:
- objects["myText1"].text = "Coins: " + coins;
- objects["myImage1"].image = "completed";
- objects["myButton1"].power = false;

### Adding variables to objects
Variables can be added to objects pretty easily. This makes it possible to access them from the loop. Example:
- clickables["myClickable1"].timesClicked = 0;

### Self-reference in onClick
If you want an object to reference itself in its own onClick function, use c:
- clickables["myClickable1"].onClick = (c) => {
	c.timesClicked++;
}

==========================

# Patch notes
## What's new in every update

### v1.0
- Release

### Future plans
- More customization
- Power on/off for clickables?
- Better audio support
- Animations