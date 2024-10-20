var gameVersion = "1.3.1";
var newestVersion = 5;
var selectedVersion = newestVersion;

const patchnotes = {
    "v1.0":
        [
            "- Game release",
        ],
    "v1.1":
        [
            "-> New content:",
            "- Added retro font!",
            "- Added the patch notes menu!",
            "- Added the settings menu!",
            "- Added 3 white buttons in the main menu",
            "  (server, patch notes, website)",
            "- Replaced the server button with settings",
            "-> Settings:",
            "- New Setting: Music (ON/OFF)",
            "- New Setting: Device (Automatic/Mobile/Pc)",
            "-> Other:",
            "- Added game logo made by tpot",
            "- Halfed pipe speed on mobile",
            "- Reduced swing speed & max. swing",
        ],
    "v1.2":
        [
            "The Skins & Shop Update",
            "",
            "-> Skins:",
            "- Added skins and coins!",
            "- Added the skins menu!",
            "- Added 4 skins (default + 3 new)",
            "- Coins are used to buy skins",
            "- One coin appears every 50th pipe",
            "-> Shop:",
            "- Added the shop menu!",
            "- Here two skins can be bought per day",
            "- Offers rotate every day UTC midnight",
            "- Added a new song (shop theme)",
            "-> Main menu:",
            "- Added skins button",
            "- Increased width of buttons",
            "- Update version is now lower on mobile",
            "- Moved tpot's logo",
            "-> Patch notes menu:",
            "- Reduced space between lines to increase",
            "lines per page from 16 to a whopping 32",
            "- Increased width for mobile readability",
            "- Sections are now bigger",
            "- Normal text is now indented",
            "-> Space support:",
            "- Space bar can now also be used to jump",
            "- It can be held to keep jumping",
        ],
    "v1.2.1":
        [
            "The More Skin Update",
            "",
            "-> Skins:",
            "- Added 4 new skins (8 total)",
            "- Added a second row for the new skins",
            "- Added skin names",
            "- Skin names are visible in the selection",
            "-> Shop:",
            "- Skin names are also visible here",
            "- Skins in the shop are now animated to offer",
            "a better preview",
            "- Added a gray background",
            "-> Stats:",
            "- Added Total Coins stat",
            "- Added Skins stat (e. g. 1/8)",
            "-> Other:",
            "- Update names are now shown in patch notes",
            "(e. g. The More Skin Update)",
        ],
    "v1.3":
        [
            "The Inventory Skills Update",
            "",
            "-> Inventory:",
            "- Added a new scene for the player, inventory,",
            "skin selection and more",
            "- Current Skin and Skill are shown on the left",
            "- Export and import are also available here",
            "- The right side has the inventory",
            "- Here many Skins or Skills can be shown",
            "at once and be selected",
            "-> Skills:",
            "- New feature: Skills",
            "- They can provide passive boosts",
            "- 1 Skill can be equipped at once",
            "- Added 4 Skills, 1 of each rarity",
            "-> Shop:",
            "- Expanded shop, 2 -> 3 skins",
            "- Added 1 skill offer",
            "-> Main menu:",
            "- Changed the buttons:",
            "Play, Stats, Settings, Skins ->",
            "Play, Player, Shop, Settings",
            "- Centered game logos",
            "- Added a fourth white button for stats",
            "- Moved white buttons even more to the left",
            "-> Other:",
            "- Added 4 new skins",
            "- Buying a skin now saves the game",
            "- Menda skin: fixed missing glass",
            "- Changed shop background color",
            "- Code and rendering improvements",
        ],
    "v1.3.1:":
        [
            "The Gifted Bird Update",
            "",
            "-> Daily Gift:",
            "- Added the daily gift",
            "- Can be claimed in the shop once per day",
            "- Contains 5 coins",
            "-> Skill Balance:",
            "- Gold Digger: Increased chance from 10% to 20%",
            "- Adjusted skill prices",
            "-> Skill prices:",
            "- Reduced prices:",
            "- Common: 50 -> 25",
            "- Uncommon: 100 -> 50",
            "- Rare: 250 -> 100",
            "- Epic: 400 -> 200",
            "- No refunds.",
            "-> Other:",
            "- Shop now displays skill description",
            "- Player: Added shop button in the top right",
            "- Shop: Added daily gift button",
        ],
}

scenes["patchnotes"] = new Scene(
    () => {
        // Init
        createSquare("bg", 0, 0, 1, 1, "green");

        createText("header", 0.5, 0.1, "Patch notes", "black", 80);

        // Back button
        createButton("backbutton", 0.4, 0.875, 0.2, 0.1, "button", () => {
            loadScene("mainmenu");
        });
        createText("buttonText", 0.5, 0.95, "Back", "black", 40);

        // Top navigation
        createSquare("topBgSquare", 0.1, 0.1, 0.8, 0.1, "darkgray");
        createSquare("midBgSquare", 0.1, 0.2, 0.8, 0.65, "gray");

        createButton("goLeft", 0.1, 0.1, 0.05, 0.1, "button", () => {
            if (selectedVersion > 0) selectedVersion -= 1;
            objects["versionText"].text = "Version " + Object.keys(patchnotes)[selectedVersion];
        });
        createText("goLeftText", 0.125, 0.185, "<", "black", 60);

        createButton("goRight", 0.85, 0.1, 0.05, 0.1, "button", () => {
            if (selectedVersion < newestVersion) selectedVersion += 1;
            objects["versionText"].text = "Version " + Object.keys(patchnotes)[selectedVersion];
        });
        createText("goRightText", 0.875, 0.185, ">", "black", 60);

        createText("versionText", 0.5, 0.185, "Version v" + gameVersion, "black", 40);

        for (vtc = 0; vtc < 32; vtc++) {
            createText("text" + vtc, 0.1125, 0.225 + (0.02 * vtc), "", "black", 20, "left");
        }
    },
    (tick) => {
        // Loop

        let currentVersionText = patchnotes[Object.keys(patchnotes)[selectedVersion]];
        for (vt = 0; vt < 32; vt++) {
            if (vt < currentVersionText.length) {
                objects["text" + vt].text = currentVersionText[vt];
                if (objects["text" + vt].text.substr(0, 2) == "->") {
                    objects["text" + vt].fontSize = 24;
                    objects["text" + vt].x = 0.1125;
                }
                else {
                    objects["text" + vt].fontSize = 20;
                    objects["text" + vt].x = 0.125;
                }
            }
            else {
                objects["text" + vt].text = "";
            }
        }
    }
);