function buySkin(skinID) {
    skinID = parseInt(skinID);
    if (!hasSkin(skinID) & game.coins >= getSkinPrice(skinID)) {
        game.coins -= getSkinPrice(skinID);
        game.skins.push(skinID);
        save();
    }
}

scenes["shop"] = new Scene(
    () => {
        // Init
        createSquare("bg", 0, 0, 1, 1, "green");

        createText("header", 0.5, 0.1, "Shop", "black", 80);

        // Back button
        createButton("backbutton", 0.4, 0.875, 0.2, 0.1, "button", () => {
            save();
            loadScene("mainmenu");
        });
        createText("buttonText", 0.5, 0.95, "Back", "black", 40);

        createText("coinText", 0.5, 0.15, "0 Coins", "orange", 40);

        // Daily Gift
        createButton("dailygift", 0.95, 0, 0.1, 0.1, "whiteGift", () => {
            let bob = new Date();
            let today = bob.getUTCFullYear() + "0" + bob.getUTCMonth() + (bob.getUTCDate() < 10 ? "0" + bob.getUTCDate() : bob.getUTCDate());
            if (parseInt(game.lastGift) < parseInt(today)) {
                game.lastGift = today;

                let amount = 5;

                game.coins += amount;
                game.stats.totalcoins += amount;
                game.stats.totalgifts += 1;
            }
            objects["dailygift"].image = "claimedGift";
        }, { quadratic: true });

        let bob = new Date();
        let today = bob.getUTCFullYear() + "0" + bob.getUTCMonth() + (bob.getUTCDate() < 10 ? "0" + bob.getUTCDate() : bob.getUTCDate());
        if (parseInt(game.lastGift) == parseInt(today)) objects["dailygift"].image = "claimedGift";

        createSquare("underyourskin", 0, 0.2, 1, 0.6, "#006800");

        // the offer

        // skin 1
        let ski = (new Date().getUTCDate() /** new Date().getUTCMonth()*/) % skins.length;
        createButton("skin0", 0.2, 0.2, 0.15, 0.15, "unknown", (me) => {
            buySkin(objects[me].config.id);
        }, { quadratic: true, centered: true, id: ski });
        objects["skin0"].snip = [0, 0, 32, 32];

        createText("skinname0", 0.2, 0.4, "...", "black", 32, "center");
        createText("skintext0", 0.2, 0.433, "...", "black", 24, "center");

        // skin 2
        ski = (ski + 1) % skins.length;
        createButton("skin1", 0.8, 0.2, 0.15, 0.15, "unknown", (me) => {
            buySkin(objects[me].config.id);
        }, { quadratic: true, centered: true, id: ski });
        objects["skin1"].snip = [0, 0, 32, 32];

        createText("skinname1", 0.8, 0.4, "...", "black", 32, "center");
        createText("skintext1", 0.8, 0.433, "...", "black", 24, "center");

        // skin 3
        ski = (ski * 33) % skins.length;
        createButton("skin2", 0.2, 0.5, 0.15, 0.15, "unknown", (me) => {
            buySkin(objects[me].config.id);
        }, { quadratic: true, centered: true, id: ski });
        objects["skin2"].snip = [0, 0, 32, 32];

        createText("skinname2", 0.2, 0.7, "...", "black", 32, "center");
        createText("skintext2", 0.2, 0.733, "...", "black", 24, "center");

        // skill
        ski = ski % skills.length;
        createButton("skill0", 0.8, 0.5, 0.15, 0.15, "unknown", (me) => {
            getSkill(objects[me].config.id).buy();
        }, { quadratic: true, centered: true, id: skills[ski].ID });

        createText("skillname0", 0.8, 0.7, "...", "black", 32, "center");
        createText("skilltext0", 0.8, 0.733, "...", "black", 24, "center");
        createText("skilldesc0", 0.975, 0.8, "...", "black", 20, "right");

        // music
        musicPlayer.src = "audio/toasty-shop.mp3";
        musicPlayer.volume = game.settings.music ? 1 : 0;
        if (game.settings.music) musicPlayer.play();
    },
    (tick) => {
        // Loop
        groundAnimation += tick;
        if (groundAnimation > 2) groundAnimation = 0;

        objects["coinText"].text = game.coins + " Coins";

        for (i = 0; i < 3; i++) {
            let thisSkin = objects["skin" + i].config.id;

            objects["skin" + i].image = !hasSkin(thisSkin) ? "skins/" + getSkin(thisSkin) : "unknown";
            objects["skin" + i].snip = [0, groundAnimation >= 1 ? 32 : 0, 32, 32];

            if (hasSkin(thisSkin)) objects["skintext" + i].text = "Already bought!";
            else objects["skintext" + i].text = getSkinPrice(thisSkin) + " Coins";
            objects["skinname" + i].text = getSkinName(thisSkin);
        }

        let thisSkill = getSkill(objects["skill0"].config.id);

        objects["skill0"].image = !thisSkill.isOwned() ? "skills/" + thisSkill.getImage() : "unknown";

        if (thisSkill.isOwned()) objects["skilltext0"].text = "Already bought!";
        else objects["skilltext0"].text = thisSkill.getPrice() + " Coins";
        objects["skillname0"].text = thisSkill.getName();
        objects["skilldesc0"].text = thisSkill.getDesc();
        objects["skillname0"].color = thisSkill.getRarityColor();
    }
);