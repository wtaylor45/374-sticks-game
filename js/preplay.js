var preplayState = {

	create: function(){
		var header = game.add.text(40, 40, 'Pre Training', 
			{font: '50px Arial', fill: '#ffffff' });

		start_button = game.add.button(game.width/2-50, game.height-50, 'button_start', function(){
	      this.play();
	    }, this, 0, 1, 2);
	    preTrain_1_button = game.add.button((game.width/4)-100, game.height/2, 'preTrain1', function(){
	      simGames = 1;
	    }, this, 0, 1, 2);
	    preTrain_10_button = game.add.button(game.width/4, game.height/2, 'preTrain10', function(){
	      simGames = 10;
	    }, this, 0, 1, 2);
	    preTrain_100_button = game.add.button((game.width/4)+100, game.height/2, 'preTrain100', function(){
	      simGames = 100;
	    }, this, 0, 1, 2);

	},

/*
	train1: function(){
		var startTime = new Date().getTime() / 1000;
  		ai.trainAI(1);
  		var endTime = new Date().getTime() / 1000;
  		var simTime = endTime - startTime;
  		Logger.info('%c Simulation took ' + simTime + ' seconds', 'background: #222; color: #fff');
  		Logger.debug('Done w simulation');

	},
	train10: function(){
		var startTime = new Date().getTime() / 1000;
  		ai.trainAI(10);
  		var endTime = new Date().getTime() / 1000;
  		var simTime = endTime - startTime;
  		Logger.info('%c Simulation took ' + simTime + ' seconds', 'background: #222; color: #fff');
  		Logger.debug('Done w simulation');

	},
	train100: function(){
		var startTime = new Date().getTime() / 1000;
  		ai.trainAI(100);
  		var endTime = new Date().getTime() / 1000;
  		var simTime = endTime - startTime;
  		Logger.info('%c Simulation took ' + simTime + ' seconds', 'background: #222; color: #fff');
  		Logger.debug('Done w simulation');

	},
*/
	play: function(){
		game.state.start('play');
	}

};