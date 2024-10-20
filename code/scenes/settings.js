scenes["settings"] = new Scene(
    () => {
        // Init
        function updateSettings() {
            objects["settingText1"].text = "Music " + (game.settings.music ? "ON" : "OFF");
            objects["settingText2"].text = "Device " + game.settings.device.substr(0, 1).toUpperCase() + game.settings.device.substr(1);
        }

        createSquare("bg", 0, 0, 1, 1, "green");

        createImage("menuground2", 0, 0.9, 1, 0.1, "menuground2");

        createImage("menuground", 0, 0.8, 2, 0.1, "menuground");
        createImage("menuground3", 0, 0, 2, 0.1, "menuground");

        createText("header", 0.5, 0.2, "Settings", "black", 80);

        // Back button
        createButton("backbutton", 0.4, 0.875, 0.2, 0.1, "button", () => {
            save();
            loadScene("mainmenu");
        });
        createText("buttonText", 0.5, 0.95, "Save", "black", 40);

        // Settings
        createButton("setting1", 0.3, 0.3, 0.4, 0.1, "button", () => {
            game.settings.music = !game.settings.music;
            updateSettings();
        });
        createText("settingText1", 0.5, 0.375, "?", "black", 40);

        createButton("setting2", 0.3, 0.45, 0.4, 0.1, "button", () => {
            switch (game.settings.device) {
                case "automatic":
                    game.settings.device = "pc";
                    break;
                case "pc":
                    game.settings.device = "mobile";
                    break;
                case "mobile":
                    game.settings.device = "automatic";
                    break;
            }
            updateSettings();
        });
        createText("settingText2", 0.5, 0.525, "?", "black", 40);

        // Inite
        updateSettings();
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

    }
);