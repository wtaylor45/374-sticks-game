/* global Phaser */
var game = new Phaser.Game(500, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var gameOver = false;
var sticksLeft = 21;
var humanLost;

/*
 * Load objects (sprites, images, etc)
 *
 */
function preload(){

}

function create(){
    
    var player = new Player();
    var ai = new AI();

}

function update(){
    
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
        game.time.events.add(Phaser.Timer.SECOND * 2, ai.takeTurn(), this);

        //WAIT FOR PLAYER TO CLICK A BUTTON:


        //WILL:
        player.takeTurn(__buttonChoiceValue__)


    }
    //Display loser:

    //New Game:
    game.time.events.add(Phaser.Timer.SECOND * 3, newGame(), this);

}



