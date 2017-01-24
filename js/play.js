var playState = {
	//AI globals

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
	    quit_btn = game.add.button(game.width-100, game.height-55, 'quit', goToMenu, this, 0, 1, 2);

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

	render: function(){
		game.debug.text("Sticks Left: " + sticksLeft, 32, 32,"#fff","16px Arial");
	    if(!turn && gameOver == false){
	      if(stickschosen == 1){
	        game.debug.text("Nathaniel chose " + stickschosen + " stick.", 150, 450,"#fff","16px Arial");
	      }
	      else{
	        game.debug.text("Nathaniel chose " + stickschosen + " sticks.", 150, 450,"#fff","16px Arial");
	      }
	      game.debug.text("Now you choose.", 150, 480,"#fff","16px Arial");
	    }
	    if(gameOver == true){
	      if(playerWin == true){
	        game.debug.text("You win!", 200, 300,"#fff","32px Arial");
	      }
	      else{
	        game.debug.text("Nathaniel wins", 150, 300, "#fff","32px Arial");
	      }

	    }
	    if(turn && gameOver == false){
	      game.debug.text("Nathaniel is thinking...", 170, 450,"#fff","16px Arial");

    	}

	},



};

