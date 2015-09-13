var Dool = {
  score : 0,
  orientated: false
};

Dool.Boot = function(game){};

Dool.Boot.prototype = {
  // a method called when a state starts, it is passed an argument to enable sharing data between states
  //init: function() {},
  // a method called when a state starts, it is used for loading assets before anything else
  //preload: function() {},
  // a method called after preload, used for creating game objects.
  create: function() {
    this.input.maxPointers = 1;
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		//this.scale.setScreenSize(true);

    this.game.state.start("preload");
  }
  // a method called for every frame, which is used for user polling and collision detection
  // update: function() {}
  // a method called when a state is shutdown, which is used for cleaning up game objects
  // shutdown: function() {}
}
