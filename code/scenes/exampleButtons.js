var coins = 0;

scenes["exampleButtons"] = new Scene(
    () => {
        // Init
        createSquare("bg", 0, 0, 1, 1, "green");
        createText("header1", 0.5, 0.1, "WGGJ Showcase", { size: 48 });
        createText("header2", 0.5, 0.15, "Part 3: Buttons", { size: 32 });

        createText("currentPage", 0.5, 0.875, "", { size: 80 });
        objects["currentPage"].page = 1;

        createButton("button2", 0.7, 0.8, 0.2, 0.1, "#FFFFFF", () => {
            if (objects["currentPage"].page <= 5) objects["currentPage"].page++;

            let page = objects["currentPage"].page;

            if (page == 2) {
                objects["exampleButton"].quadratic = true;
                objects["myText"].text = "Now it's quadratic";
            }
            if (page == 3) {
                objects["exampleButton"].centered = true;
                objects["myText"].text = "Now it's centered too";
            }
            if (page == 4) {
                objects["exampleButton"].power = false;
                objects["myText"].text = "Power off: it can't be clicked anymore";
            }
            if (page == 5) {
                objects["myText"].text = "Back to the start?";
                objects["buttonText2"].text = "End";
            }
            if (page == 6) {
                loadScene("mainmenu");
            }
        });

        createText("buttonText2", 0.7 + 0.2 / 2, 0.875, "Next Page", { size: 40 });

        // EXAMPLE IMAGE
        createButton("exampleButton", 0.5, 0.5, 0.1, 0.1, "sosnog", () => {
            objects["myText"].text = "You clicked the button!";

            objects["exampleButton"].w = objects["exampleButton"].h = 0.05;
            objects["exampleButton"].clickAnimationTimer = 0.5;

            coins += 1;

            if (coins == 25) objects["coinAmount"].size = 64;
            if (coins == 50) objects["header1"].size = 80;
            if (coins == 75) objects["header1"].color = "yellow";
            if (coins == 100) objects["exampleButton"].image = "sosnog2";
        });

        createText("myText", 0.5, 0.4, "This is a button. (Square + Clickable)", { size: 32 });
        createText("coinAmount", 0.5, 0.8, "", { size: 32 });
    },
    (tick) => {
        // Loop

        objects["coinAmount"].text = coins + " Coins";

        objects["exampleButton"].clickAnimationTimer -= tick;
        if (objects["exampleButton"].clickAnimationTimer <= 0) {
            objects["exampleButton"].w = objects["exampleButton"].h = 0.1;
        }
    }
);