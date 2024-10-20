var coins = 0;

scenes["mainmenu"] = new Scene(
    () => {
        // Init
        // This whole pack gets executed every time the scene is loaded! Define objects here, variables only needed within this scene (-> this file), etc.

        // This creates a square that covers the entire background
        createSquare("bg", 0, 0, 1, 1, "green");

        // Display current page
        // and add the var to the object (allows global access)
        createText("currentPage", 0.5, 0.875, "", { size: 80 });
        objects["currentPage"].page = 1;

        // Buttons to change page
        createButton("button1", 0.1, 0.8, 0.2, 0.1, "#FFFFFF", () => {
            if (objects["currentPage"].page > 1) objects["currentPage"].page--;
        });
        createButton("button2", 0.7, 0.8, 0.2, 0.1, "#FFFFFF", () => {
            objects["currentPage"].page++;
        });

        // Text for the buttons (note: button text might become built-in soon)
        // for text in buttons the general rule is x + (w / 2) and y + (h * 3/4)
        createText("buttonText1", 0.1 + 0.2 / 2, 0.875, "Previous Page", { size: 40 });
        createText("buttonText2", 0.7 + 0.2 / 2, 0.875, "Next Page", { size: 40 });

        // page content for examples
        createSquare("mySquare1", 0.4, 0, 0.1, 0.1, "black");
        createClickable("myClickable1", 0, 0, 1, 1, () => { console.log("Screen clicked!") });
        createImage("myImage1", 0.4, 0.4, 0.2, 0.2, "placeholder", { quadratic: true });
        createButton("myButton1", 0, 0, 0.2, 0.2, "#FFFFFF", () => { coins += 1 }, { quadratic: true });
        createText("myText1", 0.5, 0.5, "Hello World", { size: 40 });

        // This sets the audio, reduces its volume and starts it
        // (note: audio system will get reworked eventually)
        wggjAudio.src = "audio/lofi-chill-rnb-logo-edit-201356.mp3";
        wggjAudio.volume = 0.2; // I prefer having the volume a bit down
        wggjAudio.play();
    },
    (tick) => {
        // Loop
        // The code here gets executed very frequently. Use this for animations, updating texts, movement, etc. - anything that isn't static
        // Once you understand it, it's really easy and fun to use. I believe in you! :)

        // Update current page display
        let page = objects["currentPage"].page;
        objects["currentPage"].text = "Page " + page;

        if (page == 1) objects["mySquare1"].y = 0;
        else objects["mySquare1"].y = 100;

        if (page == 2) clickables["myClickable1"].y = 0;
        else clickables["myClickable1"].y = 100;

        if (page == 3) objects["myImage1"].power = true;
        else objects["myImage1"].power = false;

        if (page == 4) objects["myButton1"].power = true;
        else objects["myButton1"].power = false;

        if (page == 5) objects["myText1"].power = true;
        else objects["myText1"].power = false;
    }
);