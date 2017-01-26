
var instructionState = {
	
	create: function() {
		var title = game.add.sprite(game.width/2 - game.cache.getImage('title').width/2 ,80, 'title');
		var nameLabel2 = game.add.text(game.width/2 - game.cache.getImage('title').width/2 + 20, 180, 'Instructions:', 
			{font: '25px Arial', fill: '#ffffff'});
		var instructionParag = "In this game, you start with a set number of sticks" +
			"\nand you go back and forth with the AI picking " +
			"\n1, 2, or 3 sticks. Whoever picks the last stick wins." +
			"\nWatch how the AI\'\s (Nathaniel\'\s) picks change " +
			"\nthe more games he plays.";
		var text = game.add.text(game.width/2 - game.cache.getImage('title').width/2 + 20, 220, instructionParag,  { font: "18px Arial", fill: '#ffffff'});
		var menu_button = game.add.button(game.width/2 - game.cache.getImage('menu').width/6, 390, 'menu', this.start, this, 0, 1, 2);

	},

	start: function() {
		game.state.start('menu');
	}
};