var playState = {

	var moves;
	var map;
	var stickschosen;

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

	player: function() {
		this.takeTurn = function(choice){
	    	game.debug.text("Choose # of Sticks", 40, 40);
	        sticksLeft -= choice;
	        if(sticksLeft <= 0){
	            gameOver = true;
	            humanLost = true;
	        }
	    }
	},

	ai: function() {

		function AI(){
		    this.takingTurn = false;
		    this.floor = 0;
		    this.ceiling = 100;

		    this.init = function(){
		        map = {};
		        for(var i = 21; i > 0; i--){
		            map[i.toString()] = [i, 33.33, 33.33, 33.34];
		        }
		        //Hard code rules, cannot choose more sticks than are available
		        map['2'] = [2, 50, 50, 0];
		        map['1'] = [1, 100, 0, 0];

		    }

		    this.takeTurn = function(){
		      quit_btn.inputEnabled = false;
		      console.log('AI taking turn: ', sticksLeft);

		        //Random pick from weighted map of choices
		        var weighted = map[sticksLeft.toString()];
		        var randNum = Math.floor((Math.random() * 100) + 1);
		        var num;

		        console.log('ranges: ', weighted[1], ', ', (weighted[1]+weighted[2]), ', ', (weighted[1]+weighted[2]+weighted[3]), ', num is:', randNum);
		        if(randNum <= weighted[1]){
		            num = 1;
		        }
		        else if((weighted[1] < randNum) && (randNum <= (weighted[1]+weighted[2]))){
		            num = 2;
		        }
		        else if(((weighted[1]+weighted[2]) < randNum) && (randNum <= 100)){
		            num = 3;
		        }
		        else{
		            console.log('ERROR: Rand num not in range of percentiles')
		        }
		        stickschosen = num;
		        if(num > sticksLeft){
		            num = sticksLeft;
		            console.log('ERROR: Impossible move chosen, changed');
		        }

		        //Create a lag time if this is not simulation mode
		        var lag = 0;
		        if(!simulation){
		            lag = 2500
		        }
		        setTimeout(function(){
		          moves[sticksLeft.toString()] = num;
		          removeSticks(num);

		          quit_btn.inputEnabled = true;
		        }, lag);
		    }

		    this.updateAI = function(){
		        var change = 5;
		        if(playerWin){
		            change *= -1; //Decrement values for chosen moves
		        }

		        var keys = Object.keys(moves);
		        for(var i in keys){
		            var key = keys[i]
		            //If key is in map (should always be true) update map values
		            if(key in map){
		                console.log(key + ":" + moves[key]);
		                var cur_vals = map[key];
		                console.log(cur_vals);
		                var spot = moves[key];
		                /*
		                for(var j=1; j<cur_vals.length; j++){
		                    var val = cur_vals[j];
		                    if (j == spot){
		                        cur_vals[j] = val + change;
		                    }
		                    else{
		                        cur_vals[j] = val - change/2;
		                    }
		                }
		                */


		                map[key] = this.calculateVals(cur_vals, spot, change);
		                cur_vals = [];
		                console.log(map[key]);
		            }
		        }
		        console.log(map);
		        $('#excelDataTable').empty();
		        buildHtmlTable('#excelDataTable');

		    }

		    //start_vals is array from map for a specific sticksLeft values
		    //move is the number (1, 2, or 3) that was chosen by the AI
		    //change is the max change value 
		    this.calculateVals = function(start_vals, move, change){
		        console.log('inside function');
		        var new_vals = start_vals;

		        //Calculate actual change
		        //If the AI won, check against the ceiling, otherwise against the floor
		        
		        var check = (change > 0) ? this.ceiling : this.floor;
		        
		        /*var check, opp_check;
		        if(change > 0){
		            check = this.ceiling;
		            opp_check = this.floor;
		        }
		        else{
		            check = this.floor;
		            opp_check = this.ceiling;
		        }*/

		        //The change is the lower of either the set change value or the maximum that 
		        //can be added or subtracted without making the percentage outside of the floor:ceiling bounds
		        var r_change = (Math.abs(change) < Math.abs(check - start_vals[move])) ? change : (check - start_vals[move]);
		        var total = 0;
		        var length = start_vals.length;
		        var div = 2;
		        //Check special case rules
		        if(start_vals[0] == 1){
		            length = 1;
		        }
		        else if(start_vals[0] == 2){
		            length = 3;
		            div = 1;
		        }

		        for(var count = 1; count < length; count++){
		            if(count == move) {
		                continue;
		            }

		            //If the change puts the percentage outside of the bounds, set the percentage equal to the bound
		            if( (start_vals[count] - r_change/div) > this.floor){
		                if( (start_vals[count] - r_change/div) < this.ceiling){
		                    new_vals[count] = Math.floor((start_vals[count] - r_change/div)*100)/100;
		                    console.log('Value at ', count, ' is: ', new_vals[count]);
		                }
		                else{
		                    new_vals[count] = this.ceiling;
		                }
		            }
		            else{
		                new_vals[count] = this.floor;
		            }
		            total += new_vals[count];
		        }

		        //Make sure move percentages add up to 100
		        new_vals[move] = Math.floor((100 - total)*100)/100;
		        return new_vals;
		    }

		    this.trainAI = function(num){
		        for(var i = 0; i < num; i++){
		            this.simulateGame();
		            //Reset variables
		            initVars();
		        }
		    }

		    this.simulateGame = function(){

		        while(sticksLeft > 0){
		            //AI takes turn
		            this.takeTurn();

		            //Next turn is random number between 1 and 3 if not game over
		            if(sticksLeft > 0){
		                var num = Math.floor((Math.random() * 3) + 1);
		                if(num > sticksLeft){
		                    num = sticksLeft;
		                }
		                removeSticks(num);
		            }
		        }

		        this.updateAI();
		    }

		}
	},

	create: function() {
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

	},

	update: function() {
		if(!simulation){
	      if(gameOver == false){
	        if(sticksLeft <= 0){
	            gameOver = true;
	            if(!turn){
	                playerWin = true;
	            }

	            endGame();
	        }
	      }

	    }

	},
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
	        if(map[i][0] in moves){
	          if(playerWin) row$.css('background-color', '#faa');
	          else row$.css('background-color', '#afa');
	        }
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


};

