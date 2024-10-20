// Game made by Schrottii - don't steal or cheat

scenes["stats"] = new Scene(
    () => {
        // Init
        createSquare("bg", 0, 0, 1, 1, "green");

        createImage("menuground2", 0, 0.9, 1, 0.1, "menuground2");

        createImage("menuground", 0, 0.8, 2, 0.1, "menuground");
        createImage("menuground3", 0, 0, 2, 0.1, "menuground");

        createText("header", 0.5, 0.2, "Stats", "black", 80);
        createText("playerName", 0.5, 0.3, "Player", "black", 80);
        createButton("playerNameButton", 0.75, 0.15, 0.05, 0.05, "button", () => {
            let newName = prompt("New player name?", "Peter").slice(0, 8);
            game.name = newName;
        });
        createText("playerNameButtonText", 0.775, 0.2, "*", "black", 40);

        // Back button
        createButton("backbutton", 0.4, 0.875, 0.2, 0.1, "button", () => {
            loadScene("mainmenu");
        });
        createText("buttonText", 0.5, 0.95, "Back", "black", 40);

        // Export button
        createButton("exportbutton", 0.25, 0.7, 0.2, 0.1, "button", () => {
            exportGame();
        });
        createText("buttonText2", 0.35, 0.775, "Export", "black", 40);

        // Import button
        createButton("importbutton", 0.55, 0.7, 0.2, 0.1, "button", () => {
            importGame();
        });
        createText("buttonText3", 0.65, 0.775, "Import", "black", 40);


        createText("stat1", 0.5, 0.35, "stat", "black", 30);
        createText("stat2", 0.5, 0.4, "stat", "black", 30);
        createText("stat3", 0.5, 0.45, "stat", "black", 30);
        createText("stat4", 0.5, 0.5, "stat", "black", 30);
        createText("stat5", 0.5, 0.55, "stat", "black", 30);
        createText("stat6", 0.5, 0.6, "stat", "black", 30);
        createText("stat7", 0.5, 0.65, "stat", "black", 30);
    },
    (tick) => {
        // Loop
        groundAnimation += tick;
        objects["menuground"].x -= tick;
        objects["menuground3"].x -= tick;
        if (groundAnimation >= 1) {
            groundAnimation = 0;
            objects["menuground"].x = 0;
            objects["menuground3"].x = 0;
        }

        objects["stat1"].text = "Highscore: " + game.stats.highscore;
        objects["stat2"].text = "Total Plays: " + game.stats.totalplays;
        objects["stat3"].text = "Total Points: " + game.stats.totalpoints;
        objects["stat4"].text = "Total Jumps: " + game.stats.totaljumps;
        objects["stat5"].text = "Total Time: " + Math.floor(game.stats.totaltime / 1000);
        objects["stat6"].text = "Total Coins: " + game.stats.totalcoins;
        objects["stat7"].text = "Skins: " + game.skins.length + "/" + skins.length;

        objects["playerName"].text = game.name;
    }
);