/* global Phaser */
var game = new Phaser.Game(800, 500, Phaser.AUTO, '', { preload: preload, create: create, update: update });

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