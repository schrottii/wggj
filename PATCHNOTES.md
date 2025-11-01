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
- Added wggj.config.imageSmoothing... in case you want to turn that thing on

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



### v1.2
Released 2025-01-29
-> New content:
- New Element: Container! (See section below)
- ADDED onUp, the on-release version of onClick
- Functions to create elements, like createButton, now return the name of the object, if it's created, or "" if not
- Added currentX, currentY, currentW and currentH functions for all elements except Text
- Added wggj.time.running: use it to stop the loop
- Added wggj.debug.scene: The debug messages when loading a scene are now off by default, but can be brought back by changing the new wggj.debug.scene to true
- Added wggj.config.startScene: The scene loaded on start can now be changed with wggj.config.startScene

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
- Added wggjMouse for more efficient mouse tracking, you can access it too (e. g. wggj.mouse.x)
- Added the 4 mouse functions: onClick, onHold, onMouseMove & onHover - to the documentation:
- onClick(): event when it's clicked
- onHold(): event when the mouse is pressed down and in the element's area
- onMouseMove(): event when the mouse is moving while in the area
- onHover(): event when the mouse is in the area, moving or not, clicking/holding or not

-> Hitboxes:
- Added isHit(x, y) for Squares, Images and Containers
- Used to check if something (such as the mouse) is within the element's boundaries
- The four mouse functions now use that, and you can use it too



## v1.4
Released 2025-08-19
-> Animations:
- New core feature: Animations!
- These can be bound to an object and change it every tick
- Create an animation with createAnimation(animationName, targetObject, effectFunction, maxDuration, kept)
- Kill an animation with killAnimation(name)
- Animation lifespans are ticked AFTER the effect, so they are guaranteed to execute at least once before dying
- Setting the max duration to 0 makes it unlimited (it will live forever, unless you kill it in some other way)
- The following are provided for the effect function: target object, delta, animation

-> Visual Examples:
- Added a visual example for Animations, with 10 different buttons to show various examples of how it can be used
- If you want to use animations but don't understand them, check the code in exampleAnimations.js

-> Configs:
- New config for Square, Button and Image: alpha (adjusts visibility, from 0 to 1)
- Setting power to off via config when creating an object now properly disables it
- Better config stability

-> Functions:
- Added isValid(v) function (checks for undefined and similar)
- Adjusted wggjUpdateTextScaling text scaling (smaller on wide screens)

-> Compability notes:
- Manually setting power off after creating an object is no longer needed, the config power off works now
- Make sure the adjusted text scaling doesn't break anything, to change it back, change 1920 to 780



## v1.4.1
Released 2025-08-27
- Adjusted wggjUpdateTextScaling text scaling again (should be better)
- Fixed issue with tapping on mobile



## v1.5
Released 2025-09-24
-> Content:
- Added music and sound player
- Moved loose variables into the big wggj variable
- Added wAnis, a collection of animations that can be used

-> Audio:
- Added integrated music player
- Added 16 sound channels (multiple can be played at the same time)
- Load via the audio dict (similar to images)
- Use wggjLoadAudio(); similar to images
- audioPlayMusic(name) to play a song
- audioPlaySound(name) to play a sound effect (channel chosen automatically)
- audioChangeVolume(type, vol, unmute?) to change volume. type is music or sound/sounds. vol from 0 to 1. unmute is false by default, enabling it will auto-unmute if volume is set higher than 0
- audioPause(type) to pause/unpause music or sound/sounds
- Players are stored in wggj.audio.musicPlayer and wggj.audio.soundChannels
- Volume is controlled via wggj.audio.musicVolume and wggj.audio.soundVolume
- Mutes are controlled via wggj.audio.musicMuted and wggj.audio.soundMuted

-> wggj variable:
- Put most solo variables into a big one: wggj
- This requires some work to go from v1.4.1 or earlier to v1.5
- but makes things easier to find or change later on, and avoids conflicts with your own variables
- wggjCanvas, wggjCTX, wggjAudio stay the same
- wggjDelta -> wggj.time.delta
- wggjTime -> wggj.time.time
- wggjTextScaling -> wggj.canvas.textScaling
- wggjCanvasWidth -> wggj.canvas.w
- wggjCanvasHeight -> wggj.canvas.h
- wggjMouseDown -> wggj.mouse.down
- wggjMouse.x -> wggj.mouse.x
- wggjMouse.y -> wggj.mouse.y
- wggjCanvasDesiredMobileWidthMulti -> wggj.canvas.mobileWidthMulti
- wggjCanvasDesiredPCWidthMulti -> wggj.canvas.pcWidthMulti
- wggjCanvasDesiredMobileHeightMulti -> wggj.canvas.mobileHeightMulti
- wggjCanvasDesiredPCHeightMulti -> wggj.canvas.pcHeightMulti
- wggjCanvasDesiredSquare -> wggj.canvas.quadratic
- wggjRunning -> wggj.time.running
- wggjImageSmoothing -> wggj.config.imageSmoothing
- wggjStartScene -> wggj.config.startScene
- wggjSceneDebug -> wggjSceneDebug
- FONT -> wggj.config.font
- GAMENAME -> wggj.config.gameName
- currentScene -> wggj.canvas.currentScene

-> Animations:
- Added pct property (percentage), same as doing dur / maxDur (0 - 1)
- Added tps property, same as targetPrestate but shorter
- Added wAnis, a library of example animations you can use
- Duration and keep are still up to you
- Example usage: createAnimation("a", "exampleImage", wAnis.fadeIn, 1);
- List below

-> wAnis:
- fadeIn
- fadeOut
- clickBounce
- clickPretty
- moveIn: top, bottom, left, right
- moveOut: top, bottom, left, right

-> .wggj.js file:
- Improved commentary at the beginning of the file a bit
- Divided code into sections

-> Compability notes:
- You may want to move old music/sounds into the now built-in audio system
- Loose variables being moved into the wggj var requires you to change any references to those now deprecated variables
- ie. FONT = "Arial"; -> wggj.config.font = "Arial";
- all those changes are listed above



## v1.5.1
Released 2025-11-01
-> Text:
- Text can now be multi-line using \n
- There is no limit for lines
- Automatic linebreaks are not implemented yet
- Added a page for this to the Text example

-> Other:
- Added preventDefault for PointerMove and PointerUp (to avoid issues such as zooming in Samsung's mobile browser)
- also for clicking, but not right mouse button
- Changed max width for isMobile() from 480 to 640 (mainly for testing purposes)

-> Compability notes:
- Make sure the changes with preventDefault and isMobile() don't break anything