
var menuState = {

	create: function() {
		//var nameLabel1 = game.add.text(80, 40, 'MENU', 
			//{font: '25px Arial', fill: '#ffffff' });
		var title = game.add.sprite(game.width/2 - game.cache.getImage('title').width/2 ,80, 'title');
		//var nameLabel2 = game.add.text(80, 120, 'Press \'w\' to go to the game.', 
			//{font: '25px Arial', fill: '#ffffff' });

		var howtoplay_button = game.add.button(game.width/2 - game.cache.getImage('how_to_play').width/6, 330, 'how_to_play', this.instructions, this, 0, 1, 2);
		var start_button = game.add.button(game.width/2 - game.cache.getImage('start').width/6, 230, 'start', this.start, this, 0, 1, 2);

		//var wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
		//wKey.onDown.addOnce(this.start, this);
		//var iKey = game.input.keyboard.addKey(Phaser.Keyboard.I);
		//iKey.onDown.addOnce(this.instructions, this);

	},

	start: function() {
		simGames = 100;
		game.state.start('preplay');
	},

	instructions: function(){
		game.state.start('howtoplay');
	},

};
