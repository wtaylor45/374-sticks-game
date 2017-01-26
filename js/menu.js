
var menuState = {

	create: function() {
		game.add.tileSprite(0, 0, 1000, 600, 'bg');

		//var nameLabel1 = game.add.text(80, 40, 'MENU',
			//{font: '25px Arial', fill: '#ffffff' });
		var title = game.add.sprite(40,80, 'title');
		//var nameLabel2 = game.add.text(80, 120, 'Press \'w\' to go to the game.',
			//{font: '25px Arial', fill: '#ffffff' });

		var howtoplay_button = game.add.button(200, 180, 'how_to_play', this.instructions, this, 0, 1, 2);
		var start_button = game.add.button(200, 280, 'start', this.start, this, 0, 1, 2);

		//var wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
		//wKey.onDown.addOnce(this.start, this);
		//var iKey = game.input.keyboard.addKey(Phaser.Keyboard.I);
		//iKey.onDown.addOnce(this.instructions, this);

	},

	start: function() {
		simGames = 100;
		game.state.start('play');
	},

	instructions: function(){
		game.state.start('howtoplay');
	},

};
