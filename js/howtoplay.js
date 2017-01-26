
var instructionState = {
	
	create: function() {
		var nameLabel1 = game.add.text(40, 40, 'Training Ground', 
			{font: '25px Arial', fill: '#ffffff' });
		var nameLabel2 = game.add.text(40, 80, 'Instructions:', 
			{font: '25px Arial', fill: '#ffffff' });
		var instructionParag = "In this game, you start with a set number of" +
			"\nsticks and you go back and forth with the AI picking " +
			"\n1,2, or 3 sticks. Whoever picks the last stick wins." +
			"\nWatch how the AI\'\s (Nathaniel\'\s) picks change " +
			"\nthe more games he plays.";
		var text = game.add.text(40, 120, instructionParag,  { font: "18px Arial", fill: '#ffffff'});
		var nameLabel3 = game.add.text(40, 300, 'Press \'w\' to go back to the menu.', 
			{font: '25px Arial', fill: '#ffffff' });

		var wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
		wKey.onDown.addOnce(this.start, this);

	},

	start: function() {
		game.state.start('menu');
	}
};