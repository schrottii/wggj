scenes["exampleTilesLayer"] = new Scene(
    () => {
        // Init
        createSquare("bg", 0, 0, 1, 1, "green");
        createText("header1", 0.5, 0.1, "WGGJ Showcase", { size: 48 });
        createText("header2", 0.5, 0.15, "Part 8: TilesLayer", { size: 32 });
        createButton("returnToMainMenuButton", 0, 0, 0.05, 0.05, "#000000", () => { loadScene("mainmenu") });



        // EXAMPLE FOR WGGJ TILES LAYER
        // feel free to copy

        document.addEventListener('keydown', (e) => {
            console.log(e, e.key)
            switch (e.key) {
                case "w":
                    objects["layer1"].move("down", 0.5);
                    break;
                case "a":
                    objects["layer1"].move("right", 0.5);
                    break;
                case "s":
                    objects["layer1"].move("up", 0.5);
                    break;
                case "d":
                    objects["layer1"].move("left", 0.5);
                    break;
            }
        });

        createTilesLayer("layer1", 12, 0.1, 0.2, 0.8, 0.8);
        
        objects["layer1"].changeAll((t) => {
            t.image = ["button", "sosnog", "sosnog2"][Math.floor(Math.random() * 3)];
            t.onHold = (c) => { objects[c].image = ["button", "sosnog", "sosnog2"][Math.floor(Math.random() * 3)]; }
        });

        createButton("funnybutton1", 0, 0.4, 0.1, 0.1, "button", (c) => {
            objects["layer1"].objectifyAll();
            objects[c].power = false;
        }, { aText: { text: "Objectify", size: 40 } });
    },
    (tick) => {
        // Loop
    }
);