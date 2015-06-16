/// <reference path="typings/stats/stats.d.ts" />
/// <reference path="typings/tweenjs/tweenjs.d.ts" />
/// <reference path="typings/soundjs/soundjs.d.ts" />
/// <reference path="typings/preloadjs/preloadjs.d.ts" />
/// <reference path="typings/createjs-lib/createjs-lib.d.ts" />
/// <reference path="typings/easeljs/easeljs.d.ts" />
/* Header******************
 *      Jason Gunter
 *      game.ts
 *      June 16th, 2015
 *      A simple Dice roller - radnomly generated values
 *
 */
// Framework variables
var stat;
var canvas = document.getElementById("mc");
var stage;
var assets;
var manifest = [
    { id: "roll", src: "img/roll.png" },
    { id: "clicked", src: "sound/clicked.wav" },
    { id: "1", src: "img/1.png" },
    { id: "2", src: "img/2.png" },
    { id: "3", src: "img/3.png" },
    { id: "4", src: "img/4.png" },
    { id: "5", src: "img/5.png" },
    { id: "6", src: "img/6.png" }
];
// Global Game Variables
var die1lbl;
var die2lbl;
var btnRoll;
var die1;
var die2;
function init() {
    //initialize stage, stats, fps, and gameloop
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20);
    createjs.Ticker.setFPS(60);
    createjs.Ticker.on("tick", gameloop);
    setupStats();
    main();
}
function setupStats() {
    //setting up and positioning the 'stats' box
    stat = new Stats();
    stat.setMode(0);
    stat.domElement.style.position = 'absolute';
    stat.domElement.style.left = '320px';
    stat.domElement.style.top = '80px';
    document.body.appendChild(stat.domElement);
}
function preload() {
    //load assets like button images and sounds
    assets = new createjs.LoadQueue();
    assets.installPlugin(createjs.Sound);
    assets.on("complete", init, this);
    assets.loadManifest(manifest);
}
function gameloop() {
    stat.begin();
    stage.update();
    stat.end();
}
function drawButton() {
    //draw button - this won't change each time it is drawn
    btnRoll = new createjs.Bitmap(assets.getResult("roll"));
    btnRoll.on("click", btnRoll_Click);
    btnRoll.on("mouseover", btnRoll_Over);
    btnRoll.on("mouseout", btnRoll_Out);
    btnRoll.y = canvas.clientHeight - 150;
    btnRoll.x = canvas.clientWidth / 2 - 50;
    stage.addChild(btnRoll);
}
function main() {
    drawButton();
    // generate 2 random numbers
    var ranNum1 = getRanNum();
    var ranNum2 = getRanNum();
    //Generate 2 die faces and 2 die labels using the two random numbers
    //add text for die 1 
    die1lbl = new createjs.Text(ranNum1.toString(), "30px Consolas", "#000000");
    die1lbl.regX = die1lbl.getMeasuredWidth() * .5;
    die1lbl.regY = die1lbl.getMeasuredHeight() * .5;
    die1lbl.x = 100;
    die1lbl.y = 200;
    stage.addChild(die1lbl);
    //add text for die 2
    die2lbl = new createjs.Text(ranNum2.toString(), "30px Consolas", "#000000");
    die2lbl.regX = die2lbl.getMeasuredWidth() * .5;
    die2lbl.regY = die2lbl.getMeasuredHeight() * .5;
    die2lbl.x = 225;
    die2lbl.y = 200;
    stage.addChild(die2lbl);
    // Die 1
    die1 = new createjs.Bitmap(assets.getResult(ranNum1.toString()));
    die1.x = 75;
    die1.y = 125;
    stage.addChild(die1);
    // Die 2
    die2 = new createjs.Bitmap(assets.getResult(ranNum2.toString()));
    die2.x = 195;
    die2.y = 125;
    stage.addChild(die2);
}
function btnRoll_Over() {
    //change transparency
    btnRoll.alpha = 0.8;
}
function btnRoll_Out() {
    //change transparency
    btnRoll.alpha = 1.0;
}
function btnRoll_Click() {
    btnRoll.alpha = 0.6;
    // play sound
    createjs.Sound.play("clicked");
    //Remove all items from stage
    stage.removeAllChildren();
    //Re-generate all items on the stage
    main();
    // Set button back to normal after click is done..
    btnRoll.alpha = 1.0;
}
function getRanNum() {
    //return randomly generated number
    return Math.floor((Math.random() * 6) + 1);
}
//# sourceMappingURL=game.js.map