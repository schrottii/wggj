scenes["exampleImages"] = new Scene(
    () => {
        // Init
        createSquare("bg", 0, 0, 1, 1, "green");
        createText("header1", 0.5, 0.1, "WGGJ Showcase", { size: 48 });
        createText("header2", 0.5, 0.15, "Part 2: Images", { size: 32 });
        createButton("returnToMainMenuButton", 0, 0, 0.05, 0.05, "#000000", () => { loadScene("mainmenu") });

        createText("currentPage", 0.5, 0.875, "", { size: 80 });
        objects["currentPage"].page = 1;

        createButton("button2", 0.7, 0.8, 0.2, 0.1, "#FFFFFF", () => {
            if (objects["currentPage"].page <= 5) objects["currentPage"].page++;

            let page = objects["currentPage"].page;

            if (page == 2) {
                objects["exampleImage"].quadratic = true;
                objects["myText"].text = "Now it's quadratic";
            }
            if (page == 3) {
                objects["exampleImage"].centered = true;
                objects["myText"].text = "Now it's centered too";
            }
            if (page == 4) {
                objects["exampleImage"].power = false;
                objects["myText"].text = "Now the power is off";
            }
            if (page == 5) {
                objects["exampleImage"].power = true;
                objects["myText"].text = "Now the image changes!";
            }
            if (page == 6) {
                loadScene("exampleButtons");
            }
        });

        createText("buttonText2", 0.7 + 0.2 / 2, 0.875, "Next Page", { size: 40 });

        // EXAMPLE IMAGE
        createImage("exampleImage", 0.5, 0.5, 0.1, 0.1, "sosnog");

        createText("myText", 0.5, 0.4, "This is an image.", { size: 32 });
    },
    (tick) => {
        // Loop
        let page = objects["currentPage"].page;

        if (page == 5) {
            // I can't recommend using random in the loop like this, but it WORKS lol
            if (Math.random() <= 0.01) {
                objects["exampleImage"].image = "sosnog";
            }
            if (Math.random() <= 0.01) {
                objects["exampleImage"].image = "gradient";
            }
        }
    }
);