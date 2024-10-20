var inventoryMode = "skins";
var playerUpdate = "";

scenes["player"] = new Scene(
    () => {
        // Init
        createSquare("bg", 0, 0, 1, 1, "green");

        createImage("menuground2", 0, 0.9, 1, 0.1, "menuground2");

        createImage("menuground", 0, 0.8, 2, 0.1, "menuground");
        createImage("menuground3", 0, 0, 2, 0.1, "menuground");

        // Back button
        createButton("backbutton", 0.4, 0.875, 0.2, 0.1, "button", () => {
            save();
            loadScene("mainmenu");
        });
        createText("buttonText", 0.5, 0.95, "Back", "black", 40);

        // Shop
        createButton("shopbutton", 0.95, 0, 0.1, 0.1, "whiteShop", () => {
            loadScene("shop");
        }, { quadratic: true });

        // Meeeeeeeee
        createSquare("meBg", 0.05, 0.16, 0.2, 0.615, "#006800");
        createText("meText", 0.15, 0.15, "Your skin", "lightgray", 24, "center")

        createImage("playerskin", 0.15, 0.175, 0.4, 0.4, "skins/" + getSkin(game.skin), { quadratic: true, centered: true });
        objects["playerskin"].snip = [0, 0, 32, 32];
        createText("playerskinName", 0.15, 0.65, "", "white", 32, "center")

        // Bottom

        createButton("buttonExport", 0.05, 0.875, 0.1, 0.1, "export", () => {
            exportGame();
            playerUpdate = "Exported the game!";
        }, { quadratic: true, centered: true });
        createButton("buttonImport", 0.25, 0.875, 0.1, 0.1, "import", () => {
            importGame();
            playerUpdate = "Imported the game!";
        }, { quadratic: true, centered: true });

        createText("playerUpdate", 0.15, 0.925, "", "white", 20, "center")

        // Skills
        createSquare("skillsBg", 0.275, 0.16, 0.08, 0.615, "#006800");
        createText("skillsText", 0.315, 0.15, "Skills", "lightgray", 24, "center")

        createImage("skillsListBg0", 0.315, 0.225, 0.1, 0.1, "invBg", { quadratic: true, centered: true });
        createImage("skillsListPic0", 0.315, 0.225, 0.1, 0.1, "", { quadratic: true, centered: true, power: false });

        // Inventory
        createSquare("invBg", 0.4, 0.16, 0.55, 0.615, "#25571a");

        for (inv = 0; inv < 35; inv++) {
            createImage("inv" + inv + "Bg", 0.45 + 0.075 * (inv % 7), 0.175 + 0.12 * Math.floor(inv / 7), 0.1, 0.1, "invBg", { quadratic: true, centered: true });
            createButton("inv" + inv + "Con", 0.45 + 0.075 * (inv % 7), 0.175 + 0.12 * Math.floor(inv / 7), 0.1, 0.1, "invBg", (me) => {
                if (inventoryMode == "skins") {
                    clickSkin(me.split("inv")[1].split("Con")[0]);
                    playerUpdate = "Skin selected!";
                }
                if (inventoryMode == "skills") {
                    getSkill(parseInt(me.split("inv")[1].split("Con")[0]) + 1).select();
                    playerUpdate = "Skill selected!";
                }
            }, { quadratic: true, centered: true, power: false, inv: inv });
            createText("inv" + inv + "Txt", 0.45 + 0.075 * (inv % 7), 0.175 + 0.12 * Math.floor(inv / 7), "", "white", 10, "center");
        }

        createButton("invSel1", 0.4, 0.11, 0.15, 0.05, "#25571a", () => {
            inventoryMode = "skins";
        })
        createText("invSelText1", 0.475, 0.135, "Skins", "white", 20, "center");
        
        createButton("invSel2", 0.6, 0.11, 0.15, 0.05, "#25571a", () => {
            inventoryMode = "skills";
        })
        createText("invSelText2", 0.675, 0.135, "Skills", "white", 20, "center");

        musicPlayer.src = "audio/menu-theme.mp3";
        musicPlayer.volume = game.settings.music ? 1 : 0;
        if (game.settings.music) musicPlayer.play();
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

        // Updates
        objects["playerUpdate"].text = playerUpdate;

        objects["playerskinName"].text = getSkinName(game.skin);
        objects["playerskin"].image = "skins/" + getSkin(game.skin);
        objects["playerskin"].snip = [0, groundAnimation >= 0.5 ? 32 : 0, 32, 32];

        if (game.selSkills[0] != 0) objects["skillsListPic0"].image = "skills/" + getSkill(game.selSkills[0]).getImage();
        objects["skillsListPic0"].power = game.selSkills[0] != 0;

        if (inventoryMode == "skins") {
            objects["invSel1"].color = "#25571a";
            objects["invSel2"].color = "#45c129";
        }
        if (inventoryMode == "skills") {
            objects["invSel1"].color = "#45c129";
            objects["invSel2"].color = "#25571a";
        }

        for (let inv = 0; inv < 35; inv++) {
            objects["inv" + inv + "Con"].power = false;
            objects["inv" + inv + "Txt"].text = "";
            objects["inv" + inv + "Txt"].color = "white";

            if (isMobile()) {
                objects["inv" + inv + "Bg"].w = objects["inv" + inv + "Bg"].h = 0.033;
                objects["inv" + inv + "Con"].w = objects["inv" + inv + "Con"].h = 0.033;
            }

            if (inventoryMode == "skins") {
                if (inv < skins.length) {
                    objects["inv" + inv + "Con"].power = true;
                    objects["inv" + inv + "Con"].image = game.skins.includes(inv) ? "skins/" + getSkin(inv) : "unknown";
                    objects["inv" + inv + "Con"].snip = [0, groundAnimation >= 0.5 && game.skins.includes(inv) ? 32 : 0, 32, 32];
                    objects["inv" + inv + "Txt"].text = game.skins.includes(inv) ? getSkinName(inv) : "locked";
                }
                else {
                    objects["inv" + inv + "Con"].power = false;
                }
            }

            if (inventoryMode == "skills") {
                if (inv < skills.length) {
                    let thisSkill = skills[inv];
                    objects["inv" + inv + "Con"].power = true;
                    objects["inv" + inv + "Con"].image = game.skills.includes(thisSkill.ID) ? "skills/" + thisSkill.getImage() : "unknown";
                    objects["inv" + inv + "Con"].snip = false;
                    objects["inv" + inv + "Txt"].text = game.skills.includes(thisSkill.ID) ? thisSkill.getName() : "locked";
                    objects["inv" + inv + "Txt"].color = thisSkill.getRarityColor();
                }
                else {
                    objects["inv" + inv + "Con"].power = false;
                }
            }
        }

        if (isMobile()) {
            objects["playerskin"].w = objects["playerskin"].h = 0.1;
            objects["playerskin"].y = 0.4;
            objects["buttonExport"].w = objects["buttonExport"].h = 0.05;
            objects["buttonImport"].w = objects["buttonImport"].h = 0.05;
        }
    }
);