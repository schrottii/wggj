scenes["mainmenu"] = new Scene(
    () => {
        // SEE exampleText.js FOR BETTER CODE EXPLANATIONS
        // Init
        createSquare("bg", 0, 0, 1, 1, "green");

        // Header
        createText("header1", 0.5, 0.1, "WGGJ Showcase", { size: 48 });
        createText("header2", 0.5, 0.15, "Main Menu", { size: 32 });

        createButton("button1", 0.2, 0.2, 0.2, 0.1, "#FFFFFF", () => {
            loadScene("exampleText");
        }, { aText: { text: "Text", size: 40 } });

        createButton("button2", 0.6, 0.2, 0.2, 0.1, "#FFFFFF", () => {
            loadScene("exampleImages");
        }, { aImage: { image: "sosnog" } });

        createButton("button3", 0.2, 0.4, 0.2, 0.1, "#FFFFFF", () => {
            loadScene("exampleButtons");
        }, { aText: { text: "Buttons", size: 40 } });

        createButton("button4", 0.6, 0.4, 0.2, 0.1, "#FFFFFF", () => {
            loadScene("exampleContainers");
        }, { aText: { text: "Containers", size: 40 } });

        createButton("button5", 0.2, 0.6, 0.2, 0.1, "#FFFFFF", () => {
            loadScene("exampleAnimations");
        }, { aText: { text: "Animations", size: 40 } });

        createButton("button6", 0.6, 0.6, 0.2, 0.1, "#FFFFFF", () => {
            loadScene("exampleAudio");
        }, { aText: { text: "Audio", size: 40 } });

        createButton("button7", 0.2, 0.8, 0.2, 0.1, "#FFFFFF", () => {
            loadScene("exampleRotate");
        }, { aText: { text: "Rotate", size: 40 } });

        createButton("button8", 0.6, 0.8, 0.2, 0.1, "#FFFFFF", () => {
            loadScene("exampleTilesLayer");
        }, { aText: { text: "TilesLayer", size: 40 } });
    },
    (tick) => {
        // Loop

    }
);