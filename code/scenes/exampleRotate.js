scenes["exampleRotate"] = new Scene(
    () => {
        // Init
        createSquare("bg", 0, 0, 1, 1, "green");
        createText("header1", 0.5, 0.1, "WGGJ Showcase", { size: 48 });
        createText("header2", 0.5, 0.15, "Part 7: Rotate", { size: 32 });
        createButton("returnToMainMenuButton", 0, 0, 0.05, 0.05, "#000000", () => { loadScene("mainmenu") });

        // EXAMPLE IMAGE
        createImage("exampleImage", 0.45, 0.45, 0.1, 0.1, "sosnog");
        createImage("exampleImage2", 0.45, 0.85, 0.1, 0.1, "sosnog");



        // EXAMPLE ROTATION
        // feel free to copy

        // one full spiiin
        createButton("anibtn1", 0, 0.45, 0.08, 0.08, "button", () => {
            createAnimation("ani1", "exampleImage", (t, d) => t.rotate += 365 * d, 1, false);
        });
        createButton("anibtn4", 0, 0.85, 0.08, 0.08, "button", () => {
            createAnimation("ani4", "exampleImage2", (t, d) => t.rotate -= 365 * d, 1, false);
        });

        // rotate clockwise
        createButton("anibtn2", 0.2, 0.45, 0.08, 0.08, "button", () => { }, { onHold: () => { objects["exampleImage"].rotate++; } });
        createButton("anibtn5", 0.2, 0.85, 0.08, 0.08, "button", () => { }, { onHold: () => { objects["exampleImage2"].rotate += 5; } });

        // rotate counter clockwise
        createButton("anibtn3", 0.8, 0.45, 0.08, 0.08, "button", () => { }, { onHold: () => { objects["exampleImage"].rotate--; } });
        createButton("anibtn6", 0.8, 0.85, 0.08, 0.08, "button", () => { }, { onHold: () => { objects["exampleImage2"].rotate -= 5; } });
    },
    (tick) => {
        // Loop
    }
);