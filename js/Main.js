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

}

function create(){
    var graphics = game.add.graphics(0, 0); 
    graphics.beginFill(0x00FFF0, 1);
    graphics.drawCircle(200, 200, 25);
    player = new Player();
    ai = new AI();
    //console.log(ai);
    main();

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



