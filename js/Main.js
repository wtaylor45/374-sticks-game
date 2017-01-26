// BETA Version

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
var simGames;

//AI globals:
var moves;
var map;
var stickschosen;


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
  simulation = true;

  initVars();

  ai.init();

  sticksLeft = 21;
  createSticks();

  moveButtonsEnabled(false);
  rematch_btn.visible = false;

  $('#excelDataTable').empty();
  buildHtmlTable('#excelDataTable');

  var startTime = new Date().getTime() / 1000;
  ai.trainAI(simGames);
  var endTime = new Date().getTime() / 1000;
  var simTime = endTime - startTime;
  Logger.info('%c Simulation took ' + simTime + ' seconds', 'background: #222; color: #fff');

  Logger.debug('Done w simulation');
  ai.takeTurn();
}

function endGame(){
  gameOver = true;
  if(turn){
      playerWin = true;
  }else{
    playerWin = false;
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
        if(map[i][0] in moves && !simulation){
          if(playerWin) row$.css('background-color', '#ff0000');
          else row$.css('background-color', '#149800');
        }
      }
    //}
    $(selector).append(row$);
  }
}

function addAllColumnHeaders(selector) {
  var columnSet = ["# of sticks left", "1 stick", "2 sticks", "3 sticks"];

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

function goToMenu(){
  game.state.start('menu');
  $('#excelDataTable').html("");
}

