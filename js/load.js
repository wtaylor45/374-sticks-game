
var loadState = {
	
	preload: function() {


		var loadingLabel = game.add.text(80, 150, 'loading...',
			{font: '30px Arial', fill: '#ffffff' });

		simulation = false;

	    initVars();

	    map = {};
        for(var i = 21; i > 0; i--){
            map[i.toString()] = [i, 33.33, 33.33, 33.34];
        }
        //Hard code rules, cannot choose more sticks than are available
        map['2'] = [2, 50, 50, 0];
        map['1'] = [1, 100, 0, 0];

	    sticksLeft = 21;

	    $('#excelDataTable').empty();
	    buildHtmlTable('#excelDataTable');

		game.load.spritesheet('button_1', 'assets/buttons/button_1.png', 100, 50);
    	game.load.spritesheet('button_2', 'assets/buttons/button_2.png', 100, 50);
    	game.load.spritesheet('button_3', 'assets/buttons/button_3.png', 100, 50);
    	game.load.spritesheet('rematch', 'assets/buttons/rematch_button.png', 100, 50);
    	game.load.spritesheet('quit', 'assets/buttons/button_quit.png', 100, 50);
    	game.load.image('stick_key', 'assets/sprites/stick.png');

	},

	create: function() {
		game.state.start('menu');
	},
};