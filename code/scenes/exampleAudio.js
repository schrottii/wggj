scenes["exampleAudio"] = new Scene(
    () => {
        // Init
        createSquare("bg", 0, 0, 1, 1, "green");
        createText("header1", 0.5, 0.1, "WGGJ Showcase", { size: 48 });
        createText("header2", 0.5, 0.15, "Part 6: Audio", { size: 32 });
        createButton("returnToMainMenuButton", 0, 0, 0.05, 0.05, "#000000", () => { loadScene("mainmenu") });

        // EXAMPLE IMAGE
        //createImage("exampleImage", 0.45, 0.45, 0.1, 0.1, "sosnog");



        // EXAMPLE AUDIO
        // these show off various ways how audio can be used
        // feel free to copy

        // play song B
        createButton("anibtn1", 0, 0.9, 0.08, 0.08, "button", () => {
            audioPlayMusic("garden");
        }, { aText: { text: "Song 1", size: 20 } });

        // play song A again
        createButton("anibtn2", 0.1, 0.9, 0.08, 0.08, "button", () => {
            audioPlayMusic("lofi");
        }, { aText: { text: "Song 2", size: 20 } });

        // higher volume
        createButton("anibtn3", 0.2, 0.9, 0.08, 0.08, "button", () => {
            audioChangeVolume("music", 0.5);
        }, { aText: { text: "Vol 0.5", size: 20 } });

        // lower volume
        createButton("anibtn4", 0.3, 0.9, 0.08, 0.08, "button", () => {
            audioChangeVolume("music", 0.2);
        }, { aText: { text: "Vol 0.2", size: 20 } });

        // pause
        createButton("anibtn5", 0.4, 0.9, 0.08, 0.08, "button", () => {
            audioPause("music");
            audioPause("sound");
        }, { aText: { text: "PAUSE", size: 20 } });

        // play sound (spam me :3)
        createButton("anibtn6", 0.5, 0.9, 0.08, 0.08, "button", () => {
            audioPlaySound("click");
        }, { aText: { text: "Click sound", size: 20 } });

        // music can be played as sounds and vice versa - also show-cases sound layering
        createButton("anibtn7", 0.6, 0.9, 0.08, 0.08, "button", () => {
            audioChangeVolume("sound", 0.3);
            audioPlaySound("lofi");
        }, { aText: { text: "Music as sound", size: 20 } });
    },
    (tick) => {
        // Loop
    }
);