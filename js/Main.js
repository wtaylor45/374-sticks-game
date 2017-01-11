var game = new Phaser.Game(500, 600, Phaser.CANVAS, '', { preload: preload, create: create, update: update, render: render });

/*
 * Load objects (sprites, images, etc)
 *
 */
function preload(){
    game.load.spritesheet('button_1', 'assets/buttons/button_1.png', 100, 50);
    game.load.spritesheet('button_2', 'assets/buttons/button_2.png', 100, 50);
    game.load.spritesheet('button_3', 'assets/buttons/button_3.png', 100, 50);
    game.load.image('stick_key', '../assets/sprites/stick.png');
}

/*
 * Define global variables
 */
var sticks;
var button_1, button_2, button_3;
var turn; //0 = AI turn, 1 = player turn
var gameOver;
var ai;
var player;
var sticksLeft;
var playerWin;

function create(){
    button_1 = game.add.button(0, game.height-100, 'button_1', function(){
      turn = 0;
      removeSticks(1)
    }, this, 0,1, 2);
    button_2 = game.add.button(100, game.height-100, 'button_2', function(){
      turn = 0;
      removeSticks(2)
    }, this, 0, 1, 2);
    button_3 = game.add.button(200, game.height-100, 'button_3', function(){
      turn = 0;
      removeSticks(3)
    }, this, 0, 1, 2);

    player = new Player();
    ai = new AI();

    // Create and show the stick objects
    sticks = game.add.group();
    var stick;

    for (var y = 0; y < 3; y++){
        for (var x = 0; x < 7; x++){
            stick = sticks.create(40 + (x * 60), 50 + (y * 130), 'stick_key', null, 7*x + y +1);
        }
    }

    startGame();    
}

function update(){
    if(!gameOver){
        if(turn == 0){
            ai.takeTurn();
        }

        if(turn == 1){

        }
    }
}

function render(){
    game.debug.text("Sticks Left: " + sticksLeft, 32, 32);
}

function startGame(){
    turn = 0;
    gameOver = false;
    sticksLeft = 21;
    moves = {};
    playerWin = false;
    ai.init();
}

function removeSticks(num){
    sticks.removeBetween(0, num - 1, true, true);
    sticksLeft -= num;
}
