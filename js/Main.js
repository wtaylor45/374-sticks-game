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
var simulation;

function create(){
    player = new Player();
    ai = new AI();

    button_1 = game.add.button(0, game.height-110, 'button_1', function(){
      takeTurn(1);
    }, this, 0, 1, 2);
    button_2 = game.add.button(105, game.height-110, 'button_2', function(){
      takeTurn(2);
    }, this, 0, 1, 2);
    button_3 = game.add.button(55, game.height-55, 'button_3', function(){
      takeTurn(3);
    }, this, 0, 1, 2);

    rematch_btn = game.add.button(game.width-100, game.height-110, 'rematch', rematch, this, 0, 1, 2);
    quit_btn = game.add.button(game.width-100, game.height-55, 'quit', startGame, this, 0, 1, 2);

    // Create and show the stick objects
    sticks = game.add.group();

    startGame();
}

function update(){
    if(!simulation){
      if(gameOver == false){
        if(sticksLeft <= 0){
            gameOver = true;
            if(!turn){
                playerWin = true;
            }
            ai.updateAI();

            endGame();
        }
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

function startGame(){
  //For alpha purposes, simulation is false
  simulation = false;

  initVars();

  ai.init();

  sticksLeft = 21;
  createSticks();

  moveButtonsEnabled(false);
  rematch_btn.visible = false;

  $('#excelDataTable').empty();
  buildHtmlTable('#excelDataTable');
  ai.takeTurn();
}

function endGame(){
  gameOver = true;
  if(!turn){
      playerWin = true;
  }
  ai.updateAI();

  rematch_btn.visible = true;
  moveButtonsEnabled(false);
}

function rematch(){
  initVars();
  createSticks();

  moveButtonsEnabled(false);
  rematch_btn.visible = false;
  ai.takeTurn();
}

function initVars(){
  turn = true;
  gameOver = false;
  moves = {};
  playerWin = false;
  //simulation = true;
  ai.init();

  sticksLeft = 21;
}

function moveButtonsEnabled(bool){
  button_1.visible = bool;
  button_2.visible = bool;
  button_3.visible = bool;
}

/*
 * Action of removing sticks, visual removal of sticks if simulate is false
 */
function removeSticks(num){
    if(!simulation){
        sticks.removeBetween(0, num - 1, true, true);
    }

    sticksLeft -= num;

    moveButtonsEnabled(turn);
    turn = !turn;
}

function buildHtmlTable(selector) {
 var columns = addAllColumnHeaders(selector);

  for (var i = 21; i > 0; i--) {
    var row$ = $('<tr/>');
    //for (var colIndex = 0; colIndex < columns.length; colIndex++) {
      for (var choices = 0; choices < columns.length; choices++){
        var cellValue = map[i][choices];
        if (cellValue == null) cellValue = "";
        row$.append($('<td/>').html(cellValue));
      }
    //}
    $(selector).append(row$);
  }
}

function addAllColumnHeaders(selector) {
  var columnSet = ["# of sticks left", "% AI picks 1 stick", "% AI picks 2 sticks", "% AI picks 3 sticks"];

  var headerTr$ = $('<tr/>');

  for (var i = 0; i < columnSet.length; i++) {

    headerTr$.append($('<th/>').html(columnSet[i]));

  }
  $(selector).append(headerTr$);


  return columnSet;
}

function takeTurn(num){
  if(num > sticksLeft){
      num = sticksLeft;
  }
  removeSticks(num);
  if(sticksLeft > 0) ai.takeTurn();
}
