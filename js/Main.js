/* global Phaser */
var game = new Phaser.Game(500, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var gameOver = false;

/*
 * Load objects (sprites, images, etc)
 *
 */
function preload(){

}

function create(){
    
    var graphics = game.add.graphics(0, 0);
    
    graphics.beginFill(0x00FF00, 1);
    graphics.drawCircle(200, 200, 25);

}

function update(){
    
}



function Player(){
    this.takeTurn = function(choice){
        
    }
}

function AI(){
    this.takeTurn = function(){
        
    }
}



function main(){
    var player = new Player();
    var ai = new AI();
    
    while(!gameOver){

        ai.takeTurn();

    }
}



