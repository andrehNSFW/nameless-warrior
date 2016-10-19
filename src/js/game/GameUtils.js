var gameUtils = {
  walkAnimations: function (player) {
    player.animations.add('down', [0, 1, 2], 10, true);
    player.animations.add('right', [3, 4, 5], 10, true);
    player.animations.add('up', [6, 7, 8], 10, true);
    player.animations.add('left', [9, 10, 11], 10, true);
  },

  walk: function(direction, character, velocity) {
    velocity = velocity || 50;

    switch(direction){
      case 'down':
        character.lastFrame = 0;
        character.body.velocity.y = velocity;
        character.body.velocity.x = 0;
        break;

      case 'right':
        character.lastFrame = 3;
        character.body.velocity.y = 0;
        character.body.velocity.x = velocity;
        break;

      case 'up':
        character.lastFrame = 6;
        character.body.velocity.y = -velocity;
        character.body.velocity.x = 0;
        break;

      case 'left':
        character.lastFrame = 9;
        character.body.velocity.x = -velocity;
        character.body.velocity.y = 0;
        break;

      case 'stop':
        character.body.velocity.x = 0;
        character.body.velocity.y = 0;
        character.frame = character.lastFrame;
        character.animations.stop();
        break;
    }

    character.animations.play(direction);
  },
  
  randomWalk: function(character, speed) {
    var _this = this,
        speed = speed || 150;

    setInterval(function() {
      var direction = Math.floor(Math.random() * (6 - 1)) + 1;

      switch(direction){
        case 1:
          _this.walk('down', character, speed);
          break;

        case 2:
          _this.walk('up', character, speed);
          break;

        case 3:
          _this.walk('left', character, speed);
          break;

        case 4:
          _this.walk('right', character, speed);
          break;

        case 5:
          _this.walk('stop', character, speed);
          break;
      }
    }, 1000);
  }
};
