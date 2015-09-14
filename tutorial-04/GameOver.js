App.GameOver = function(game) {

};

App.GameOver.prototype = {
  create: function() {
    var title = this.game.add.text(16, 16, "Game Over!", { fontSize: '32px', fill: '#000' });
    title.anchor.setTo(0.5, 0.5);

    var btn = this.game.add.button(160, 320, "play", this.startGame, this);
    btn.anchor.setTo(0.5, 0.5);
  },
  startGame: function() {
    this.state.start("Game");
  }
}
