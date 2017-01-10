/* global Phaser */
var game = new Phaser.Game(500, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var gameOver = false;

/*
 * Load objects (sprites, images, etc)
 *
 */
function preload(){
    game.load.image('stick_key', '../assets/sprites/stick.png');
}

/*
 * Define global variables 
 */
var sticks;

function create(){

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



function Player(){
    this.takeTurn = function(choice){
        
    }
}

function AI(){
    this.takeTurn = function(){
        
    }
}

function removeStick(num){
    sticks.removeBetween(0, num - 1, true, true);
}

function main(){
    var player = new Player();
    var ai = new AI();
    
    while(!gameOver){

        ai.takeTurn();

    }
}



