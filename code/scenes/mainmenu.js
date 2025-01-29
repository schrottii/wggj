scenes["mainmenu"] = new Scene(
    () => {
        // SEE exampleText.js FOR BETTER CODE EXPLANATIONS
        // Init
        createSquare("bg", 0, 0, 1, 1, "green");

        // Header
        createText("header1", 0.5, 0.1, "WGGJ Showcase", { size: 48 });
        createText("header2", 0.5, 0.15, "Main Menu", { size: 32 });

        createButton("button1", 0.2, 0.4, 0.2, 0.1, "#FFFFFF", () => {
            loadScene("exampleText");
        });
        createText("buttonText1", 0.2 + 0.2 / 2, 0.475, "Text", { size: 40 });

        createButton("button2", 0.6, 0.4, 0.2, 0.1, "#FFFFFF", () => {
            loadScene("exampleImages");
        });
        createText("buttonText2", 0.6 + 0.2 / 2, 0.475, "Images", { size: 40 });

        createButton("button3", 0.2, 0.6, 0.2, 0.1, "#FFFFFF", () => {
            loadScene("exampleButtons");
        });
        createText("buttonText3", 0.2 + 0.2 / 2, 0.675, "Buttons", { size: 40 });
        
        createButton("button4", 0.6, 0.6, 0.2, 0.1, "#FFFFFF", () => {
            loadScene("exampleContainers");
        });
        createText("buttonText4", 0.6 + 0.2 / 2, 0.675, "Containers", { size: 40 });
    },
    (tick) => {
        // Loop

    }
);