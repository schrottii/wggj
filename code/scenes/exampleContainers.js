var containerPoints = 0;

scenes["exampleContainers"] = new Scene(
    () => {
        // Init
        createSquare("bg", 0, 0, 1, 1, "green");
        createText("header1", 0.5, 0.1, "WGGJ Showcase", { size: 48 });
        createText("header2", 0.5, 0.15, "Part 4: Containers", { size: 32 });
        createButton("returnToMainMenuButton", 0, 0, 0.05, 0.05, "#000000", () => { loadScene("mainmenu") });

        createContainer("container", 0.2, 0.2, 0.6, 0.6, {
            color: "black",
            XScroll: true, XScrollMod: 5,
            YScroll: true, YScrollMod: 5
        }, [
            createImage("content1", 0.5, 0.5, 0.1, 0.1, "sosnog", { quadratic: true, centered: true }),
            createImage("content2", 0.2, 0.2, 0.15, 0.1, "sosnog"),
            createButton("content3", 0.7, 0.2, 0.1, 0.6, "sosnog", () => { containerPoints += 2; }),
            createText("textScoreDisplay", 0.5, 0.3, "Test", { color: "white", size: 40 }),
            createButton("increaserButton", 0.2, 0.6, 0.2, 0.1, "#FFFFFF", () => { containerPoints += 1; })
        ]);

        createButton("containerReset", 0.1, 0.85, 0.2, 0.1, "#FFFFFF", () => { objects["container"].resetScroll() });
        createText("containerResetText", 0.2, 0.925, "Reset Drag", { size: 40 });

        createButton("containerLockX", 0.4, 0.85, 0.2, 0.1, "#FFFFFF", () => { objects["container"].XScroll = !objects["container"].XScroll });
        createText("containerLockXText", 0.5, 0.925, "X: Unlocked", { size: 40 });

        createButton("containerLockY", 0.7, 0.85, 0.2, 0.1, "#FFFFFF", () => { objects["container"].YScroll = !objects["container"].YScroll });
        createText("containerLockYText", 0.8, 0.925, "Y: Unlocked", { size: 40 });
    },
    (tick) => {
        // Loop
        objects["textScoreDisplay"].text = "points: " + containerPoints;
        objects["containerLockXText"].text = objects["container"].XScroll ? "X: Unlocked" : "X: Locked";
        objects["containerLockYText"].text = objects["container"].YScroll ? "Y: Unlocked" : "Y: Locked";
    }
);