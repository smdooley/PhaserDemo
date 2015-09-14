App.Menu = function(game) {

};

App.Menu.prototype = {
  create: function() {
    // add game background
    this.add.sprite(0, 0, 'sky');

    // add title
    var title = this.add.text(16, 16, "Phaser Demo", { fontSize: '32px', fill: '#000' });
    //title.anchor.setTo(0.5, 0.5);

    // add button
    var btn = this.add.button(160, 320, "play", this.startGame, this);
    btn.anchor.setTo(0.5, 0.5);
  },
  startGame: function() {
    this.state.start('Game');
  }
}
