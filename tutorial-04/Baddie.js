App.Baddie = function (game, x, y) {

    Phaser.Sprite.call(this, game, x, y, 'baddie', 0);

    this.game = game;
    this.x = x;
    this.y = y;

    this.game.physics.arcade.enable(this);

    this.body.gravity.y = 150;
    this.body.bounce.y = 0.2;
    
    this.body.collideWorldBounds = true;

    this.xSpeed = -1 * 75;

    this.animations.add('left', [0, 1], 10, true);
    this.animations.add('right', [2, 3], 10, true);

    this.play('left');

    return this;
}

App.Baddie.prototype = Object.create(Phaser.Sprite.prototype);
App.Baddie.prototype.constructor = App.Baddie;
