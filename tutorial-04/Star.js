App.Star = function (game, x, y) {

    Phaser.Sprite.call(this, game, x, y, 'star', 0);

    this.game = game;
    this.x = x;
    this.y = y;

    this.game.physics.arcade.enable(this);

    this.body.gravity.y = 150;
    this.body.bounce.y = 0.7 + Math.random() * 0.2;

    this.body.collideWorldBounds = true;

    return this;
}

App.Star.prototype = Object.create(Phaser.Sprite.prototype);
App.Star.prototype.constructor = App.Star;
