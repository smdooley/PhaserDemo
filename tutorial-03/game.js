Dool.Game = function(game) {
  var platforms;
  var player;
  var baddies;
  var cursors;
  var stars;
  Dool.score = 0;
  Dool.scoreText;
};

Dool.Game.prototype = {
  create: function() {

    // enable arcade physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);


    // add game background
    this.game.add.sprite(0, 0, 'sky');


    // platforms group contains ground and ledges
    platforms = this.game.add.group();

    // enable physics for any object in the platforms group
    platforms.enableBody = true;

    // create the ground
    var ground = platforms.create(0, this.game.world.height - 64, 'ground');

    // scale ground to fit width of the game
    ground.scale.setTo(2, 2);

    // prevent ground from falling away when jumping on it
    ground.body.immovable = true;


    // create two ledges
    var ledge = platforms.create(400, 400, 'ground');

    // prevent ledge from falling away when jumping on it
    ledge.body.immovable = true;

    ledge = platforms.create(-150, 250, 'ground');

    // prevent ledge from falling away when jumping on it
    ledge.body.immovable = true;


    // PLAYER
    // create the player
    player = this.game.add.sprite(32, this.game.world.height - 150, 'dude');

    // enable physics on the player
    this.game.physics.arcade.enable(player);

    // player physics properties
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;

    // player animations
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    // setup player controls (populates the cursors object with four properties: up, down, left, right)
    cursors = this.game.input.keyboard.createCursorKeys();


    // BADDIES
    baddies = this.game.add.group();
    baddies.enableBody = true;
    for(var i = 0; i < 2; i++) {
      var baddie = baddies.create(i * 750, 200, 'baddie');

      this.game.physics.arcade.enable(baddie);

      baddie.body.gravity.y = 150;
      baddie.body.bounce.y = 0.2;
      baddie.body.collideWorldBounds = true;

      baddie.xSpeed = -1 * 75;

      baddie.animations.add('left', [0, 1], 10, true);
      baddie.animations.add('right', [2, 3], 10, true);

      baddie.play('left');
    }


    // STARS
    // stars group contains the stars
    stars = this.game.add.group();

    // enable physics for any object in the stars group
    stars.enableBody = true;

    // create stars (evenly spaced)
    for(var i = 0; i < 12; i++) {
      // create a star inside of the 'stars' group
      var star = stars.create(i * 70, 0, 'star');

      // set star gravity and random bounce value
      star.body.gravity.y = 150;
      star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }


    // SCORE
    Dool.scoreText = this.game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
  },
  update: function() {

    // collide the player and the stars with the platforms
    this.game.physics.arcade.collide(player, platforms);
    this.game.physics.arcade.collide(stars, platforms);
    //this.game.physics.arcade.collide(baddies, platforms);

    // check if player overlaps with a star or not
    this.game.physics.arcade.overlap(player, stars, this.collectStar, null, this);

    // reset the player velocity
    player.body.velocity.x = 0;

    if(cursors.left.isDown) {
      // move to the left
      player.body.velocity.x = -150;

      // set player animations
      player.animations.play('left');
    }
    else if (cursors.right.isDown) {
      // move to the right
      player.body.velocity.x = 150;

      // set player animations
      player.animations.play('right');
    }
    else {
      // stand still
      player.animations.stop();

      // set player animation to standing still frame
      player.frame = 4;
    }

    // allow the player to jump if they are touching the ground
    if(cursors.up.isDown && player.body.touching.down) {
      player.body.velocity.y = -350;
    }

    // update baddies
    for(var i = 0; i < baddies.children.length; i++) {
      var baddie = baddies.children[i];

      this.game.physics.arcade.collide(baddie, platforms, this.moveBaddie);
      this.game.physics.arcade.overlap(player, baddie, this.collideBaddie);

      baddie.body.velocity.x = baddie.xSpeed;

      if(baddie.xSpeed < 0) {
        baddie.animations.play('left');
      }
      else {
        baddie.animations.play('right');
      }
    }
  },
  levelComplete: function() {
    console.log('play', 'level complete');
  },
  gameOver: function() {
    console.log('play', 'game over');
    //this.game.state.start(state, clearWorld, clearCache, any variables passed to init method);
    this.game.state.start("gameover", true, false, score);
  },
  moveBaddie: function(baddie, platform) {
    if(
      (baddie.xSpeed < 0 && baddie.x < platform.x) // left edge of platform
      || (baddie.xSpeed < 0 && baddie.x <= 0) // left edge of world
      //|| (baddie.xSpeed > 0 && baddie.x + baddie.width >= this.game.world.width) // right edge of world
      || (baddie.xSpeed > 0 && baddie.x + baddie.width >= Dool.GAME_WIDTH) // right edge of world
      || (baddie.xSpeed > 0 && baddie.x + baddie.width > platform.x + platform.width) // right edge of platform
    ) {
      baddie.xSpeed *= -1;
    }
  },
  collideBaddie: function(player, baddie) {
    // deduct player score
    // Dool.score -= 10;
    // if(Dool.score < 0) {
    //   Dool.score = 0;
    // }
    // Dool.scoreText.text = 'Score: ' + Dool.score;
  },
  collectStar: function(player, star) {
    // remove star from the screen
    star.kill();

    // add and update the score
    Dool.score += 10;
    Dool.scoreText.text = 'Score: ' + Dool.score;
  }
}
