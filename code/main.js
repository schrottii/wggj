// Game made by Schrottii - don't steal or cheat

// variables
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var musicPlayer = document.getElementById("musicPlayer");

var delta = 0;
var time = Date.now();

var width = 0;
var height = 0;

// the holy quattroformaggi
var images = {
    placeholder: "sosnog.png",
    gameLogo: "toasty-bird-by-tpot.png",
    logo: "logo.png",
    button: "button.png",
    unknown: "unknown.png",
    invBg: "invBg.png",
    import: "import.png",
    export: "export.png",

    // skins
    "skins/player": "skins/player.png",
    "skins/bald": "skins/bald.png",
    "skins/female": "skins/player-female.png",
    "skins/elmenda": "skins/elmenda.png",
    "skins/deggame": "skins/deggame.png",
    "skins/cube": "skins/cube.png",
    "skins/gangsta": "skins/gangsta.png",
    "skins/lemon": "skins/lemon.png",
    "skins/roots": "skins/roots.png",
    "skins/plane": "skins/plane.png",
    "skins/arrow": "skins/arrow.png",
    "skins/tomato": "skins/tomato.png",

    // skills
    "skills/faststart": "skills/faststart.png",
    "skills/golddigger": "skills/golddigger.png",
    "skills/youngfeathers": "skills/youngfeathers.png",
    "skills/carefuljumper": "skills/carefuljumper.png",

    menuground: "menu-ground.png",
    menuground2: "menu-ground2.png",
    clouds: "clouds.png",
    coin: "coin.png",

    pipeUp: "pipe-up.png",
    pipeDown: "pipe-down.png",

    whiteDiscord: "white-dc-logo.png",
    whiteNotes: "white-patch-notes.png",
    whiteWebsite: "white-website.png",
    whiteStats: "white-stats.png",
    whiteShop: "shop.png",
    whiteGift: "gift.png",
    claimedGift: "gift2.png",
}

var scenes = {

}

var objects = {

}

var foregroundObjects = {

}

var clickables = {

}

// loading stuff
var loadingImages = 0;
var loadedImages = 0;

function loadImages() {
    for (let image in images) {
        let img = new Image();
        img.src = "images/" + images[image];
        img.onload = () => {
            loadedImages++;
            if (loadingImages == loadedImages) {
                console.log("all images loaded");
                init(); // start game
            }
        }
        images[image] = img;
        loadingImages++;
    }
}

// scene stuff
var currentScene = "none";

class Scene {
    constructor(init, loop) {
        this.init = init;
        this.loop = loop;
    }
}

function loadScene(sceneName) {
    console.log("loading scene: " + sceneName)
    if (scenes[sceneName] == undefined) return false;

    currentScene = sceneName;

    objects = {};
    foregroundObjects = {};
    clickables = {};

    scenes[sceneName].init();
}

// event listeners and their functions
canvas.addEventListener("pointerdown", onClick);
document.addEventListener('keydown', event => {
    if (event.code === 'Space') {
        console.log('Space pressed');
        jump();
    }
})

function onClick(e) {
    let mouseX = e.clientX;
    let mouseY = e.clientY;

    for (c in clickables) {
        //console.log(mouseX > clickables[c][0], mouseY > clickables[c][1]
        //    , mouseX < clickables[c][0] + clickables[c][2], mouseY < clickables[c][1] + clickables[c][3])
        if (clickables[c] == undefined) return false;
        if (mouseX > clickables[c][0] && mouseY > clickables[c][1]
            && mouseX < clickables[c][0] + clickables[c][2] && mouseY < clickables[c][1] + clickables[c][3]) {
            // is in the hitbox
            clickables[c][4](c);
        }
    }
}

// object functions
class Square {
    constructor(x, y, w, h, color) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
    }

    render() {
        ctx.fillStyle = this.color;
        ctx.fillRect(width * this.x, height * this.y, width * this.w, height * this.h);
    }
}

class Picture {
    constructor(x, y, w, h, image, config) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.image = image;

        this.quadratic = config.quadratic;
        this.centered = config.centered;
        this.power = config.power;

        this.config = config;
    }

    render() {
        if (this.power == false) return false;
        if (this.rotate) ctx.translate(this.x + (this.w / 2), this.y + (this.h / 2)); ctx.rotate(this.rotate);

        let Pquadratic = this.quadratic ? (width * this.x) : width * this.x;
        let Pquadratic2 = this.quadratic ? height * this.w : width * this.w;
        let Pcentered = this.centered ? (Pquadratic2 / 2) : 0;

        if (this.snip) ctx.drawImage(images[this.image], this.snip[0], this.snip[1], this.snip[2], this.snip[3], Pquadratic - Pcentered, height * this.y, Pquadratic2, height * this.h);
        else ctx.drawImage(images[this.image], Pquadratic - Pcentered, height * this.y, Pquadratic2, height * this.h);
        if (this.rotate) ctx.translate(-this.x - (this.w / 2), -this.y - (this.h / 2)); ctx.rotate(0);
    }
}

class Text {
    constructor(x, y, text, color, fontSize, textAlign) {
        this.x = x;
        this.y = y;
        this.text = text;
        this.color = color;
        this.fontSize = fontSize;
        this.textAlign = textAlign;
    }

    render() {
        ctx.fillStyle = this.color ? this.color : "black";
        ctx.font = ((this.fontSize ? this.fontSize : 20) * (isMobile() ? 0.5 : 1)) + "px Joystix";
        ctx.textBaseline = "bottom";
        ctx.textAlign = this.textAlign ? this.textAlign : "center";

        ctx.fillText(this.text, width * this.x, height * this.y);
    }
}

function isMobile() {
    if (game.settings.device == "pc") return false;
    if (game.settings.device == "mobile") return true;
    return /Mobi/i.test(window.navigator.userAgent) || width <= 480;
}

// create functions
function createSquare(name, x, y, w, h, color) {
    if (objects[name] == undefined) objects[name] = new Square(x, y, w, h, color);
}

function createImage(name, x, y, w, h, image, config = {}) {
    if (!config.foreground) {
        if (objects[name] == undefined) objects[name] = new Picture(x, y, w, h, image, config);
    }
    else if (foregroundObjects[name] == undefined) foregroundObjects[name] = new Picture(x, y, w, h, image, config);
}

function createText(name, x, y, text, color, fontSize, textAlign = "", foreground = false) {
    if (!foreground) {
        if (objects[name] == undefined) objects[name] = new Text(x, y, text, color, fontSize, textAlign);
    }
    else if (foregroundObjects[name] == undefined) foregroundObjects[name] = new Text(x, y, text, color, fontSize, textAlign);
}

function createClickable(clickableName, x, y, w, h, onClick) {
    if (clickables[clickableName] == undefined) {
        clickables[clickableName] = [width * x, height * y, width * w, height * h, onClick];
    }
}

function createButton(clickableName, x, y, w, h, color, onClick, config = {}) {
    if (objects[clickableName] == undefined && clickables[clickableName] == undefined) {
        if (color.substr(0, 1) == "#") objects[clickableName] = new Square(x, y, w, h, color, config);
        else objects[clickableName] = new Picture(x, y, w, h, color, config);
        clickables[clickableName] = [width * x - (config.centered ? ((config.quadratic ? height * h : width * w) / 2) : 0), height * y, config.quadratic ? height * h : width * w, height * h, onClick];
    }

}

// loop
function loop() {
    // The game's main loop

    // Tick time
    delta = Date.now() - time;
    time = Date.now();
    game.stats.totaltime += delta;

    // Resize the canvas
    canvas.style.width = (canvas.width = window.innerWidth) + "px";
    canvas.style.height = (canvas.height = window.innerHeight) + "px";

    width = window.innerWidth;
    height = window.innerHeight;
    ctx.imageSmoothingEnabled = false; // praise jesus

    // loop
    if (currentScene != "none") {
        scenes[currentScene].loop(delta / 1000);

        for (o in objects) {
            objects[o].render();
        }
        for (o in foregroundObjects) {
            foregroundObjects[o].render();
        }
    }
    else {
        // Loading images / no scene selected
        ctx.font = "40px Joystix";
        ctx.fillStyle = "white";
        ctx.textBaseline = "bottom";
        ctx.textAlign = "center";

        ctx.fillText("Toasty Bird", width / 2, height / 4);
        if (loadedImages == loadingImages) ctx.fillText("Click to start!", width / 2, height / 2);
        else ctx.fillText("Loaded: " + loadedImages + "/" + loadingImages, width / 2, height / 2);
    }

    requestAnimationFrame(loop);
}

function save() {
    localStorage.setItem("TOASTYBIRD1", "toasty" + btoa(JSON.stringify(game)));
}

function exportGame() {
    let save = game;
    save = JSON.stringify(save);
    save = "toasty" + btoa(save);
    navigator.clipboard.writeText(save);
}

function importGame() {
    let save = prompt("Insert the code here...");
    try {
        save = atob(save.slice(6));
        save = JSON.parse(save);

        game = new SaveGame();
        game.loadFromSaveGame(save);
    }
    catch {
        alert("Wrong!");
    }
}

// init the game
ctx.imageSmoothingEnabled = false;

loop();
loadImages();
function init() {
    let cachedGame = localStorage.getItem("TOASTYBIRD1");
    if (cachedGame != undefined) {
        game.loadFromSaveGame(JSON.parse(atob(cachedGame.slice(6))));
    }

    musicPlayer.loop = true;

    createClickable("startMusic", 0, 0, 1, 1, () => {
        loadScene("mainmenu");
    });
}