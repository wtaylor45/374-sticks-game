var game = new Phaser.Game(500, 600, Phaser.CANVAS, '', { preload: preload, create: create, update: update, render: render });

/*
 * Load objects (sprites, images, etc)
 *
 */
function preload(){
    game.load.spritesheet('button_1', 'assets/buttons/button_1.png', 100, 50);
    game.load.spritesheet('button_2', 'assets/buttons/button_2.png', 100, 50);
    game.load.spritesheet('button_3', 'assets/buttons/button_3.png', 100, 50);
    game.load.spritesheet('rematch', 'assets/buttons/rematch_button.png', 100, 50);
    game.load.spritesheet('quit', 'assets/buttons/button_quit.png', 100, 50);
    game.load.image('stick_key', '../assets/sprites/stick.png');
}

/*
 * Define global variables
 */
var sticks;
var button_1, button_2, button_3;
var rematch_btn, quit_btn;
var turn; //true = AI turn, false = player turn
var gameOver;
var ai;
var player;
var sticksLeft;
var playerWin;

function create(){
    player = new Player();
    ai = new AI();

    button_1 = game.add.button(0, game.height-110, 'button_1', function(){
      removeSticks(1);
      ai.takeTurn();
    }, this, 0,1, 2);
    button_2 = game.add.button(105, game.height-110, 'button_2', function(){
      removeSticks(2);
      ai.takeTurn();
    }, this, 0, 1, 2);
    button_3 = game.add.button(55, game.height-55, 'button_3', function(){
      removeSticks(3);
      ai.takeTurn();
    }, this, 0, 1, 2);

    rematch_btn = game.add.button(game.width-100, game.height-110, 'rematch', rematch, this, 0, 1, 2);
    quit_btn = game.add.button(game.width-100, game.height-55, 'quit', startGame, this, 0, 1, 2);

    // Create and show the stick objects
    sticks = game.add.group();

    startGame();
}

function update(){
  if(gameOver == false){
    if(sticksLeft <= 0){
        gameOver = true;
        if(!turn){
            playerWin = true;
        }
        ai.updateAI();

        rematch_btn.visible = true;
        moveButtonsEnabled(false);
    }
  }
}

function render(){
    game.debug.text("Sticks Left: " + sticksLeft, 32, 32);
}

function createSticks(){
  var stick;

  sticks.removeAll(true);

  for (var y = 0; y < 3; y++){
      for (var x = 0; x < 7; x++){
          stick = sticks.create(40 + (x * 60), 50 + (y * 130), 'stick_key', null, 7*x + y +1);
      }
  }
}

function startGame(callback){
  turn = true;
  gameOver = false;
  gameStarted = true;
  moves = {};
  playerWin = false;
  ai.init();

  sticksLeft = 21;
  createSticks();

  moveButtonsEnabled(false);
  rematch_btn.visible = false;
  ai.takeTurn();

  if(callback) callback();
}

function rematch(){
  turn = true;
  gameOver = false;
  moves = {};
  playerWin = false;

  sticksLeft = 21;
  createSticks();

  moveButtonsEnabled(false);
  rematch_btn.visible = false;
  ai.takeTurn();
}

function moveButtonsEnabled(bool){
  button_1.visible = bool;
  button_2.visible = bool;
  button_3.visible = bool;
}

function removeSticks(num){
    sticks.removeBetween(0, num - 1, true, true);
    sticksLeft -= num;

    moveButtonsEnabled(turn);
    turn = !turn;
}
