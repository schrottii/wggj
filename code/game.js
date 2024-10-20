// Game made by Schrottii - don't steal or cheat

class SaveGame {
    new() {
        this.id = Math.random().toString(16).slice(2);
        this.name = "Player";

        this.coins = 0;
        this.skin = 0;
        this.skins = [0];
        this.skills = [];
        this.selSkills = [0, 0, 0, 0, 0, 0];
        this.lastGift = "0";

        this.stats = {
            highscore: 0,
            normalpoints: 0,
            normalplays: 0,
            normaljumps: 0,
            normalcoins: 0,

            totalpoints: 0,
            totalplays: 0,
            totaljumps: 0,
            totalcoins: 0,

            totaltime: 0,
            totalgifts: 0,
        }
        this.settings = {
            music: true,
            device: "automatic",
        }
    }
    loadFromSaveGame(sg) {
        this.id = sg.id;
        this.name = sg.name;

        this.skin = sg.skin != undefined ? sg.skin : 0;
        this.coins = sg.coins != undefined ? sg.coins : 0;
        this.lastGift = sg.lastGift != undefined ? sg.lastGift : "0";

        let tempEmptyStats = new SaveGame();
        tempEmptyStats.new();
        this.stats = Object.assign({}, tempEmptyStats.stats, sg.stats);
        this.settings = Object.assign({}, tempEmptyStats.settings, sg.settings);
        this.skins = Object.assign([], tempEmptyStats.skins, sg.skins);
        this.skills = Object.assign([], tempEmptyStats.skills, sg.skills);
        this.selSkills = Object.assign([], tempEmptyStats.selSkills, sg.selSkills);
    }
}

var game = new SaveGame();
game.new();