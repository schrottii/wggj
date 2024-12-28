function changeHeaderRandomly() {
    objects["header1"].align = ["left", "center", "right"][Math.ceil(Math.random() * 3) - 1]
    objects["header1"].color = ["black", "yellow", "red", "white", "blue"][Math.ceil(Math.random() * 5) - 1]
    objects["header1"].size = [48, 24, 64][Math.ceil(Math.random() * 3) - 1]
    objects["header2"].align = ["left", "center", "right"][Math.ceil(Math.random() * 3) - 1]
    objects["header2"].color = ["black", "yellow", "red", "white", "blue"][Math.ceil(Math.random() * 5) - 1]
    objects["header2"].size = [48, 24, 64][Math.ceil(Math.random() * 3) - 1]
}

scenes["mainmenu"] = new Scene(
    () => {
        // Init
        // This whole pack gets executed every time the scene is loaded! Define objects here, variables only needed within this scene (-> this file), etc.

        // This creates a square that covers the entire background
        createSquare("bg", 0, 0, 1, 1, "green");

        // Header
        createText("header1", 0.5, 0.1, "WGGJ Showcase", { size: 48 });
        createText("header2", 0.5, 0.15, "Part 1: Introduction & Text", { size: 32 });

        // Display current page
        // and add the var to the object (allows global access)
        createText("currentPage", 0.5, 0.875, "", { size: 80 });
        objects["currentPage"].page = 1;

        // Buttons to change page
        createButton("button1", 0.1, 0.8, 0.2, 0.1, "#FFFFFF", () => {
            if (objects["currentPage"].page > 1) objects["currentPage"].page--;
            changeHeaderRandomly();
        });
        createButton("button2", 0.7, 0.8, 0.2, 0.1, "#FFFFFF", () => {
            if (objects["currentPage"].page <= 6) objects["currentPage"].page++;
            changeHeaderRandomly();
        });

        // Text for the buttons (note: button text might become built-in soon)
        // for text in buttons the general rule is x + (w / 2) and y + (h * 3/4)
        createText("buttonText1", 0.1 + 0.2 / 2, 0.875, "Previous Page", { size: 40 });
        createText("buttonText2", 0.7 + 0.2 / 2, 0.875, "Next Page", { size: 40 });

        // button to get to the next part
        createButton("partButton", 0.3, 0.6, 0.4, 0.1, "gradient", () => {
            loadScene("exampleImages");
        });
        createText("partButtonText", 0.3 + 0.4 / 2, 0.65, "Next Part", { size: 40 });
        objects["partButton"].power = false; // makes it hidden at first
        objects["partButtonText"].power = false; // makes it hidden at first

        // page content for examples
        createText("myText", 0.5, 0.5, "Hello World", { size: 24 });

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

        objects["myText"].text =
            [
                "Welcome to the WGGJ example! (Click Next Page)",
                "Here you can see some basic things that WGGJ is capable of.",
                "But these basics can be used to create big things.",
                "Some of my games, such as Rain Collector and Toasty Bird, can show what it's capable of.",
                "For devs who want to use WGGJ, the relevant files for you are wggj.js and scenes/example.js",
                "The rest of this is just a showcase and examples.",
                "Press the button to get to the next part"
            ][page - 1];

        if (page == 7) {
            objects["partButton"].power = true;
            objects["partButtonText"].power = true;
        }
    }
);