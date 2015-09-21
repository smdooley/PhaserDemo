App.Game = function(game) {
  this.platforms;
  this.player;
  this.baddies;
  this.cursors;
  this.stars;

  this.score;
  this.scoreText;
};

App.Game.prototype = {
  create: function() {
    // enable arcade physics system
    this.physics.startSystem(Phaser.Physics.ARCADE);

    // add game background
    this.add.sprite(0, 0, 'sky');

    // platforms group contains ground and ledges
    this.platforms = this.add.group();

    // enable physics for any object in the platforms group
    this.platforms.enableBody = true;

    // create the ground
    var ground = this.platforms.create(0, this.game.world.height - 64, 'ground');

    // scale ground to fit width of the game
    ground.scale.setTo(2, 2);

    // prevent ground from falling away when jumping on it
    ground.body.immovable = true;

    // create two ledges
    var ledge = this.platforms.create(400, 400, 'ground');

    // prevent ledge from falling away when jumping on it
    ledge.body.immovable = true;

    ledge = this.platforms.create(-150, 250, 'ground');

    // prevent ledge from falling away when jumping on it
    ledge.body.immovable = true

    // PLAYER
    // create the player
    this.player = this.game.add.sprite(32, this.game.world.height - 150, 'dude');

    // enable physics on the player
    this.game.physics.arcade.enable(this.player);

    // player physics properties
    this.player.body.bounce.y = 0.2;
    this.player.body.gravity.y = 300;
    this.player.body.collideWorldBounds = true;

    // player animations
    this.player.animations.add('left', [0, 1, 2, 3], 10, true);
    this.player.animations.add('right', [5, 6, 7, 8], 10, true);

    // setup player controls (populates the cursors object with four properties: up, down, left, right)
    this.cursors = this.game.input.keyboard.createCursorKeys();

    // BADDIES
    this.baddies = this.add.group();
    this.baddies.enableBody = true;
    // for(var i = 0; i < 2; i++) {
    //   var baddie = this.baddies.create(i * 750, 200, 'baddie');
    //
    //   this.physics.arcade.enable(baddie);
    //
    //   baddie.body.gravity.y = 150;
    //   baddie.body.bounce.y = 0.2;
    //   baddie.body.collideWorldBounds = true;
    //
    //   baddie.xSpeed = -1 * 75;
    //
    //   baddie.animations.add('left', [0, 1], 10, true);
    //   baddie.animations.add('right', [2, 3], 10, true);
    //
    //   baddie.play('left');
    // }
    this.baddies.add(new App.Baddie(this.game, 0, 200));
    this.baddies.add(new App.Baddie(this.game, 750, 200));

    // STARS
    // stars group contains the stars
    this.stars = this.game.add.group();

    // enable physics for any object in the stars group
    this.stars.enableBody = true;

    // create stars (evenly spaced)
    for(var i = 0; i < 12; i++) {
      // // create a star inside of the 'stars' group
      // var star = this.stars.create(i * 70, 0, 'star');
      //
      // // set star gravity and random bounce value
      // star.body.gravity.y = 150;
      // star.body.bounce.y = 0.7 + Math.random() * 0.2;

      this.stars.add(new App.Star(this.game, i * 70, 0, 200));
    }

    this.score = 0;
    this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
  },
  update: function() {
    // collide the player and the stars with the platforms
    this.physics.arcade.collide(this.player, this.platforms);
    this.physics.arcade.collide(this.stars, this.platforms);

    // check if player overlaps with a star or not
    this.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this);

    // reset the player velocity
    this.player.body.velocity.x = 0;

    if(this.cursors.left.isDown) {
      // move to the left
      this.player.body.velocity.x = -150;

      // set player animations
      this.player.animations.play('left');
    }
    else if (this.cursors.right.isDown) {
      // move to the right
      this.player.body.velocity.x = 150;

      // set player animations
      this.player.animations.play('right');
    }
    else {
      // stand still
      this.player.animations.stop();

      // set player animation to standing still frame
      this.player.frame = 4;
    }

    // allow the player to jump if they are touching the ground
    if(this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.body.velocity.y = -350;
    }

    // update baddies
    for(var i = 0; i < this.baddies.children.length; i++) {
      var baddie = this.baddies.children[i];

      this.physics.arcade.collide(baddie, this.platforms, this.moveBaddie, null, this);
      this.physics.arcade.overlap(this.player, baddie, this.gameOver, null, this);

      baddie.body.velocity.x = baddie.xSpeed;

      if(baddie.xSpeed < 0) {
        baddie.animations.play('left');
      }
      else {
        baddie.animations.play('right');
      }
    }

  },
  collectStar: function(player, star) {
    // remove star from the screen
    star.kill();

    // add and update the score
    this.score += 10;
    this.scoreText.text = 'Score: ' + this.score;
  },
  moveBaddie: function(baddie, platform) {
    if(
      (baddie.xSpeed < 0 && baddie.x < platform.x) // left edge of platform
      || (baddie.xSpeed < 0 && baddie.x <= 0) // left edge of world
      || (baddie.xSpeed > 0 && baddie.x + baddie.width >= this.game.world.width) // right edge of world
      || (baddie.xSpeed > 0 && baddie.x + baddie.width > platform.x + platform.width) // right edge of platform
    ) {
      baddie.xSpeed *= -1;
    }
  },
  gameOver: function() {
    this.state.start('GameOver');
  }
}
