/* global Phaser */
var game = new Phaser.Game(500, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var gameOver = false;

/*
 * Load objects (sprites, images, etc)
 *
 */
function preload(){
    game.load.spritesheet('button_1', 'assets/buttons/button_1.png', 100, 50);
    game.load.spritesheet('button_2', 'assets/buttons/button_2.png', 100, 50);
    game.load.spritesheet('button_3', 'assets/buttons/button_3.png', 100, 50);
}

var button_1, button_2, button_3;

function create(){
    game.stage.backgroundColor = '#fff';

    moveButtons = game.add.group();

    button_1 = game.add.button(0, game.height-100, 'button_1', function(){
      console.log(1);
    }, this, 0,1, 2);
    button_2 = game.add.button(100, game.height-100, 'button_2', function(){
      console.log(2);
    }, this, 0, 1, 2);
    button_3 = game.add.button(200, game.height-100, 'button_3', function(){
      console.log(3);
    }, this, 0, 1, 2);
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
