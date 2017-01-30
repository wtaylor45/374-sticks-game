
var menuState = {
	create: function() {
		game.add.tileSprite(0, 0, 1000, 600, 'bg');

		var title = game.add.sprite(game.width/2 - game.cache.getImage('title').width/2 ,80, 'title');

		this.howtoplay_button = game.add.button(game.width/2 - game.cache.getImage('how_to_play').width/6, 330, 'how_to_play', this.instructions, this, 0, 1, 2);
		this.start_button = game.add.button(game.width/2 - game.cache.getImage('start').width/6, 230, 'start', this.start, this, 0, 1, 2);
		this.sim_sprite = game.add.sprite(game.width/2 - game.cache.getImage('sim_title').width/2 , 500 - (game.cache.getImage('sim_title').height), 'sim_title');

			this.preTrain_0_button = game.add.button((game.width/2)-175, 500, 'preTrain0', function(){
				simGames = 0;
				this.play();
			}, this, 0, 1, 2);
			this.preTrain_50_button = game.add.button(game.width/2-75, 500, 'preTrain50', function(){
				simGames = 50;
				this.play();
			}, this, 0, 1, 2);
			this.preTrain_100_button = game.add.button(game.width/2+25, 500, 'preTrain100', function(){
				simGames = 100;
				this.play();
			}, this, 0, 1, 2);
			this.preTrain_500_button = game.add.button(game.width/2+125, 500, 'preTrain500', function(){
				simGames = 500;
				this.play();
			}, this, 0, 1, 2);

			this.preTrain_0_button.visible = false;
			this.preTrain_50_button.visible = false;
			this.preTrain_100_button.visible = false;
			this.preTrain_500_button.visible = false;
			this.sim_sprite.visible = false;

		this.sticks_dialogue = game.add.sprite(game.width/2 - game.cache.getImage('sticks_dialogue').width/2 , game.height/2 - 50 - (game.cache.getImage('sticks_dialogue').height), 'sticks_dialogue');
		this.numSticks_slider = game.add.sprite(game.width/2-game.cache.getImage('numsticks_slider').width/2, game.height/2 - 80, 'numsticks_slider');
    	this.numSticks_arrow = game.add.sprite(650, game.height/2-85, 'numSticks_arrow');

    	this.numSticks_arrow.inputEnabled = true;
    	boundingBox = new Phaser.Rectangle(300, game.height/2 - 80, 400, 40);
    	this.numSticks_arrow.input.enableDrag(false, false, false, 255, boundingBox, null);
    	this.numSticks_arrow.input.setDragLock(true, true);
    	this.numSticks_arrow.input.enableSnap(50, 50, true, true);


    	this.numSticks_slider.visible = false;
		this.numSticks_arrow.visible = false;
		this.sticks_dialogue.visible = false;
	},

	start: function() {
		this.start_button.visible = false;
		this.sim_sprite.visible = true;
		this.howtoplay_button.visible = false;
		this.preTrain_0_button.visible = true;
		this.preTrain_50_button.visible = true;
		this.preTrain_100_button.visible = true;
		this.preTrain_500_button.visible = true;
		this.sticks_dialogue.visible = true;

		this.numSticks_slider.visible = true;
		this.numSticks_arrow.visible = true;
		//console.log(numSticks_arrow.x);
		
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
