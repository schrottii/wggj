scenes["exampleAnimations"] = new Scene(
    () => {
        // Init
        createSquare("bg", 0, 0, 1, 1, "green");
        createText("header1", 0.5, 0.1, "WGGJ Showcase", { size: 48 });
        createText("header2", 0.5, 0.15, "Part 5: Animations", { size: 32 });
        createButton("returnToMainMenuButton", 0, 0, 0.05, 0.05, "#000000", () => { loadScene("mainmenu") });

        // EXAMPLE IMAGE
        createImage("exampleImage", 0.45, 0.45, 0.1, 0.1, "sosnog");



        // EXAMPLE ANIMATIONS
        // these show off various ways how animations can be used
        // feel free to copy

        // makes image bigger for one second
        createButton("anibtn1", 0, 0.9, 0.08, 0.08, "button", () => {
            createAnimation("ani1", "exampleImage", (t) => { t.w *= 1.01; t.h *= 1.01; }, 1, false);
        });

        // makes image disappear (not kept, so it comes back)
        createButton("anibtn2", 0.1, 0.9, 0.08, 0.08, "button", () => {
            createAnimation("ani2", "exampleImage", (t, d) => { t.alpha -= 1 * d; }, 1, false);
        });

        // makes it disappear, but it doesn't re-appear
        createButton("anibtn3", 0.2, 0.9, 0.08, 0.08, "button", () => {
            createAnimation("ani3", "exampleImage", (t, d) => { t.alpha -= 1 * d; }, 1, true);
        });

        // makes it re-appear
        createButton("anibtn4", 0.3, 0.9, 0.08, 0.08, "button", () => {
            createAnimation("ani4", "exampleImage", (t, d) => { t.alpha += 0.5 * d; }, 2, true);
        });

        // makes it go right...
        createButton("anibtn5", 0.4, 0.9, 0.08, 0.08, "button", () => {
            createAnimation("ani5", "exampleImage", (t, d) => { t.x += 0.1 * d }, 0, false);
        });

        // until you stop it!
        createButton("anibtn6", 0.5, 0.9, 0.08, 0.08, "button", () => {
            killAnimation("ani5");
        });

        // forces image into top left corner, makes it bigger...
        createButton("anibtn7", 0.6, 0.9, 0.08, 0.08, "button", () => {
            createAnimation("ani7", "exampleImage", (t, d) => { t.x = 0; t.y = 0; t.w += 0.1 * d; t.h = t.w; }, 0, false);
        });

        // until you stop it!
        createButton("anibtn8", 0.7, 0.9, 0.08, 0.08, "button", () => {
            killAnimation("ani7");
        });

        // normal move in from the top
        createButton("anibtn9", 0.8, 0.9, 0.08, 0.08, "button", () => {
            createAnimation("ani9", "exampleImage", (t, d, a) => { t.y = ((a.targetPrestate.y + 1) * a.dur) - 1; }, 1, false);
        });

        // slide in from the left
        createButton("anibtn10", 0.9, 0.9, 0.08, 0.08, "button", () => {
            createAnimation("ani10", "exampleImage", (t, d, a) => {
                t.x = Math.min(a.targetPrestate.x, t.x + (a.targetPrestate.x - t.x + 0.01) * d * 3);
                if (t.x == a.targetPrestate.x) a.kill() }, 0, false);
            objects["exampleImage"].x = -1;
        });
    },
    (tick) => {
        // Loop
    }
);