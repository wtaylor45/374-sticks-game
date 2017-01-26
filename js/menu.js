
var menuState = {
	
	create: function() {
		var nameLabel = game.add.text(80, 40, 'MENU', 
			{font: '25px Arial', fill: '#ffffff' });
		var nameLabel = game.add.text(80, 80, 'Press \'w\' to go to the next state.', 
			{font: '25px Arial', fill: '#ffffff' });

		var wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
		wKey.onDown.addOnce(this.start, this);
		var iKey = game.input.keyboard.addKey(Phaser.Keyboard.I);
		iKey.onDown.addOnce(this.instructions, this);

	},

	start: function() {
		game.state.start('play');
	},

	instructions: function(){
		game.state.start('howtoplay');
	},

};