var game = new Phaser.Game(1000, 600, Phaser.AUTO, 'gameDiv');

//load the game states:
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('howtoplay', instructionState);
game.state.add('preplay', preplayState);

game.state.start('boot');