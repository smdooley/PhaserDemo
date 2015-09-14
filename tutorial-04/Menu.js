App.Menu = function(game) {

};

App.Menu.prototype = {
  create: function() {
    // var title = this.game.add.sprite(160,160,"gametitle");
		// title.anchor.setTo(0.5,0.5);
		// var btn = this.game.add.button(160, 320, "play", this.play, this);
		// btn.anchor.setTo(0.5,0.5);

    var title = this.add.text(16, 16, "Phaser Demo", { fontSize: '32px', fill: '#000' });
    title.anchor.setTo(0.5, 0.5);

    var btn = this.add.button(160, 320, "play", this.startGame, this);
    btn.anchor.setTo(0.5, 0.5);
  },
  startGame: function() {
    this.state.start('Game');
  }
}
