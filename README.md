# WGGJ
## WebGame Graphics Javascript
Schrottii's framework for managing objects and easy rendering of graphics using JavaScript/Canvas. Easy to use and fast performance (for Canvas standards). Primarily made for webgames but can be used for other things too. 

I mostly made this for myself but anyone else can use it too. Documentation on how to use it and how it works below in this file. 

All it needs is one file (wggj.js), it can simply be copied. Do not edit it. The usual files like index.html are obviously needed as well. Everything is explained below.

This repo includes a visual example of how it works, visit its page / index.html to see it in action. The code in these visual examples is free to be copied or used as reference. For more examples, consider looking at games I have made using this, such as Toasty Bird and QuoteQuiz (where the idea originated) 

## How it works
There are different elements: images, text, etc. - and scenes (for example a main menu, or a shop). Each scene has the init, where the objects) are defined. They are then automatically rendered and taken care of. Each scene also has the loop, which is executed constantly, and can be used for things like ticking down time, or checking the value of something and then updating objects accordingly. 

Beyond the basic element types, there are also Containers (acting as a parent for others, and allowing scrolling) and Animations (which get attached to an object, and the wAnis var contains some simple animations that can be re-used). 

It also comes with an audio system, that can play music and multiple sounds at once (and manage them). The global wggj var has some things that can be configured.

### Current Version: v1.7



# Getting started
This section explains how to implement WGGJ and its basic functionality

## Setup WGGJ
To setup wggj for a project, follow the simple steps:
1. Copy the wggj.js file (found in /code) into the code folder
2. Follow the instructions at the top of wggj.js (some code that needs to be put into main.js or a similar file, and index.html or in whatever html file the canvas should be)

This entire repo (the example scenes) is a simplistic visual example of how it can work

## Creating a Scene
Make a new file and add this structure (also found in example.js): 

scenes["example"] = new Scene(
    () => {
        // Init

    },
    (tick) => {
        // Loop

    }
); 

Replace "example" with the scene's name (used for loadScene and the like), the "mainmenu" scene is loaded by default, unless configured otherwise in the wggj var. Make sure its file is loaded onto the document (after wggj.js is loaded). 

## Adding objects to a Scene 
Objects of all kinds of elements can be added. The exact types, functions used, parameters and possible configs are explained later in the documentation. Put them into the init part of the scene they should appear in.


# Elements
These are the different types an object can have.

## List

### Square
This creates a simple single-color square element

Is visible but does nothing

createSquare(name, x, y, w, h, color, config?);

example: createSquare ("mySquare1", 0, 0, 1, 1, "black");

config:
- power: when turned to false, it becomes invisible/unclickable (disabled)
- clickableOnly: when turned to true, it becomes a clickable
- alpha: visibility (0 - 1)
- aText: attachment (button text)
- aImage: attachment (button image)

- onClick(): event when it's clicked
- onDrag(): event when the mouse is pressed down, moving and in the element's area
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
- alpha: visibility (0 - 1)
- rotate: 0~365, rotates the image around its own axis

- onClick(): event when it's clicked
- onDrag(): event when the mouse is pressed down, moving and in the element's area
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
- alpha: visibility (0 - 1)
- noScaling: when turned to true, it does not scale with screen width
- maxW: 0~1 max width in relation to screen width. text won't surpass that limit, but may become squished


### SmartText
It's like Text (and supports everything normal Text does), but has some extra things, at the expense of slightly slower performance, and interpreting characters inside the text (which can be undesired). The number() method can be used to remove those, for example when handling user input.

createSmartText(name, x, y, text, config?);

example: 
createSmartText("mySmartText", 0.5, 0.5, "Hello World", {
    size: 24,
    align: "center",
    autoLinebreak: 10,
    images: {
        inlineImage: createImage("inlineUsage", 0, 0, 0.05, 0.05, "gradient"),
        sosnog: createImage("sosnog", 0, 0, 1, 1, "sosnog")
    }
});

symbols:
- \n: next line
- i{name}: inserts an image into the text, where name is the image name defined in images config

config:
- same as Text
- images: array. define the images here
- autoLinebreak: 0 = disabled. automatically adds a line break every x characters


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

### RenderLayer
This element does nothing but execute its render function, and can be used to directly draw to the canvas (useful when you have something in that format that should not be converted), or to execute code in that moment of time. Turning power off makes it not render.

createRenderLayer(name, renderer function);

example: createRenderLayer("customCanvasRender", () => { myCustomParticles.render(); });

config:
- power



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

### Attachments
Squares and Buttons can have text and image directly attached to them. This is done within the config, like so:
{ aText: {text: "Text", size: 40 }, [... other config]} 

It supports all configs that texts and images have normally. Images are centered. X, Y, width and height are set automatically. These button texts and button images are stored as normal objects, with the parent name and :text or :image suffix ("button1:text", for example) and can be changed like normal. If you want to make an attachment later on (and not during the creation of the parent Square/Button), execute their init() method - it is needed to do the proper binding.



# Scenes
## Basics
A scene consists of two parts, the init and the loop. The init is called once, when the scene is loaded. This is where elements like buttons and texts are defined. The loop is consistently called every frame, and is used for ticking timers or updating objects. Both are very important, but easy to understand.

A scene is called with loadScene(sceneName). The default scene has to be called mainmenu, as the game goes to the mainmenu scene when opened. Example: you want to load a scene called upgrades, so you do loadScene("upgrades").

## Creating a new scene
The scenes/example.js file here has an empty scene. I recommend copying that whenever you create a new one. Decide on a scene name, for example upgrades, and call your file that. I recommend saving it in a folder called scenes. So it could be something like code/scenes/upgrades.js 

At the top you see scenes["example"]. Change example to the name of your scene. Load the scene in a html file such as index.html, like how you load other code files. Below that you see two comments, "Init" and "Loop", one of them is the init, the other is the loop.



# Audio
WGGJ is capable of handling audio. There is one music channel, and 16 for sounds. If you wish to play multiple music tracks at the same time, use sounds instead. Audio is defined in the audio var, similar to images. wggjAudioInit() is required, like wggjLoadImages(). Volume of the music player and sound player channels can be adjusted, or they can be muted.

## Functions
- wggjAudioInit()
- audioPlayMusic(name)
- audioPlaySound(name)
- audioChangeVolume(type, volume, unmute?): type is "music" or "sound", volume is 0~1, if unmute is true then it will override wggj.audio.musicPlayer.muted (or for soundPlayer)
- audioPause(type): type is "music" or "sound"



# Animations
## Creation
Animations are created like this: 
createAnimation(name, target, effect, dur?, keep?) 
- name: name of the animation, only relevant when further using it (such as deleting it manually)
- target: name of the object it is meant to target
- effect: (t, d, a) => where t is the target object (allowing for access like t.x), d is delta ticks (adding * d makes it take one second), a is the animation itself (a.pct). Can be lambda or use multiple lines. 
- dur: duration in seconds. after it is over, the animation will be terminated. default is 0
- keep: if set to false, the target will return to its previous state. if set to true, all changes done by the animation will be kept. default is false

## Termination
Animations are deleted automatically when they end, but can also be removed manually:
killAnimation(name) 
- kills the animation with this name

## wAnis
the wAnis var provides some built-in example animations which can be re-used at will. 
createAnimation("ani1", "exampleImage", wAnis.fadeIn, 1, false); 

If you made animations yourself that you want to re-use, they can be added to wAnis and used the same way, or stored in a separate (similarly working) var. It saves time and keeps things consistent.

wAnis:
- empty
- fadeIn
- fadeOut
- clickBounce
- clickPretty
- moveIn (top, bottom, left, right)
- moveOut (top, bottom, left, right)


# Patch notes
See PATCHNOTES.md for patch notes. Includes compability notes to know what needs to be done when updating

## Future plans
Some of the things that are planned

- Stronger hitbox/render functions
- Particles
- More SmartText stuff
- Input element
- Keybinds
- More customization