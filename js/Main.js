/* global Phaser */
var game = new Phaser.Game(500, 600, Phaser.CANVAS, '', { preload: preload, create: create, update: update, render: render });
var gameOver = false;
var sticksLeft = 21;
var humanLost;
var ai;
var player;
var turnsLeft = 3;

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

function create(){
    button_1 = game.add.button(0, game.height-100, 'button_1', function(){
      console.log(1);
    }, this, 0,1, 2);
    button_2 = game.add.button(100, game.height-100, 'button_2', function(){
      removeStick(2)
    }, this, 0, 1, 2);
    button_3 = game.add.button(200, game.height-100, 'button_3', function(){
      console.log(3);
    }, this, 0, 1, 2);


    player = new Player();
    ai = new AI();
    //console.log(ai);
    main();

    // Create and show the stick objects
    sticks = game.add.group();
    var stick;

    for (var y = 0; y < 3; y++){
        for (var x = 0; x < 7; x++){
            stick = sticks.create(40 + (x * 60), 50 + (y * 130), 'stick_key', null, 7*x + y +1);
        }
    }
}

function update(){

}

function render(){
    game.debug.text("Sticks Left: " + sticksLeft, 32, 32);
}

function Player(){
    this.takeTurn = function(choice){
        sticksLeft -= choice;
        if(sticksLeft <= 0){
            gameOver = true;
            humanLost = true;
        }
    }
}

function AI(){
    this.takeTurn = function(){
        //Random pick from 1 to 3:
        this.rand = Math.floor((Math.random() * 3) + 1);
        sticksLeft -= this.rand;
        if(sticksLeft <= 0){
            gameOver = true;
            humanLost = false;
        }
    }
}
function newGame(){
    gameOver = false;
    sticksLeft = 21;
    main();
}

function removeStick(num){
    sticks.removeBetween(0, num - 1, true, true);
}

function main(){
    while(!gameOver){
        //AI PSEUDO-THINKING:
        //console.log(ai);
        setInterval(ai.takeTurn(), 2000);
        turnsLeft--;
        if(turnsLeft <= 0){
            gameOver = true;
        }

        //WAIT FOR PLAYER TO CLICK A BUTTON:


        //WILL:
        //player.takeTurn(__buttonChoiceValue__)


    }
    //Display loser:

    //New Game:
    //game.time.events.add(Phaser.Timer.SECOND * 3, newGame(), this);

}
