
var instructionState = {
	
	create: function() {
		var nameLabel = game.add.text(80, 40, 'How to play', 
			{font: '25px Arial', fill: '#ffffff' });
		var nameLabel = game.add.text(80, 80, '...Instructions', 
			{font: '25px Arial', fill: '#ffffff' });

		var wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
		wKey.onDown.addOnce(this.start, this);

	},

	start: function() {
		game.state.start('menu');
	}
};