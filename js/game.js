var game = new Phaser.Game(500, 600, Phaser.AUTO, 'gameDiv');

//load the game states:
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
//game.state.add('howToPlay', howToPlayState);
game.state.add('play', playState);
game.state.start('boot');