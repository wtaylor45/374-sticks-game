
var menuState = {
	create: function() {
		game.add.tileSprite(0, 0, 1000, 600, 'bg');

		var title = game.add.sprite(game.width/2 - game.cache.getImage('title').width/2 ,80, 'title');

		this.howtoplay_button = game.add.button(game.width/2 - game.cache.getImage('how_to_play').width/6, 330, 'how_to_play', this.instructions, this, 0, 1, 2);
		this.start_button = game.add.button(game.width/2 - game.cache.getImage('start').width/6, 230, 'start', this.start, this, 0, 1, 2);
		this.sim_sprite = game.add.sprite(game.width/2 - game.cache.getImage('title').width/2 , 175, 'sim_title')

		this.preTrain_1_button = game.add.button((game.width/2)-50, game.height/2+20, 'preTrain1', function(){
			simGames = 1;
			this.play();
		}, this, 1, 0, 2);
		this.preTrain_10_button = game.add.button(game.width/2-50, game.height/2+80, 'preTrain10', function(){
			simGames = 10;
			this.play();
		}, this, 1, 0, 2);
		this.preTrain_100_button = game.add.button(game.width/2-50, game.height/2+140, 'preTrain100', function(){
			simGames = 100;
			this.play();
		}, this, 1, 0, 2);


		this.preTrain_1_button.visible = false;
		this.preTrain_10_button.visible = false;
		this.preTrain_100_button.visible = false;
		this.sim_sprite.visible = false;
	},

	start: function() {
		this.start_button.visible = false;
		this.sim_sprite.visible = true;
		this.howtoplay_button.visible = false;
		this.preTrain_1_button.visible = true;
		this.preTrain_10_button.visible = true;
		this.preTrain_100_button.visible = true;
	},

	instructions: function(){
		game.state.start('howtoplay');
	},

	train: function(x){
		var startTime = new Date().getTime() / 1000;
		ai.trainAI(x);
		var endTime = new Date().getTime() / 1000;
		var simTime = endTime - startTime;
		Logger.info('%c Simulation took ' + simTime + ' seconds', 'background: #222; color: #fff');
		Logger.debug('Done w simulation');

	},

	play: function(){
		game.state.start('play');
	}
};
