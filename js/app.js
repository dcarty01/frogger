// Enemies our player must avoid
var Enemy = function(x, y) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';

  this.x = x;
  this.y = y;
  this.speed = getRandomInt(100, 200);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x += this.speed * dt;

  if(this.x > 6 * 101) {
    this.x = -101;
  }

  // Handle collisions with the player
  if(Math.abs(this.x - player.x) < 101 &&
      Math.abs(this.y - player.y) < 83) {
    player.reset();
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
  this.sprite = 'images/char-boy.png';
  this.reset();
};

// Update the player's position, required method for game
Player.prototype.update = function() {
  if(this.col < 0) {
    this.col = 0;
  }

  if(this.col > 4) {
    this.col = 4;
  }

  if(this.row > 5) {
    this.row = 5;
  }

  // Reset the player's position... has reached the water
  if(this.row == 0) {
    this.reset();
  }

  this.x = this.col * 101;
  this.y = this.row * 83;
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Handle user input for controlling the player
Player.prototype.handleInput = function(key) {
  switch(key) {
    case 'left':
      this.col--;
      break;
    case 'right':
      this.col++;
      break;
    case 'up':
      this.row--;
      break;
    case 'down':
      this.row++;
      break;
  }
};

Player.prototype.reset = function() {
  this.col = 2;
  this.row = 5;
  this.x = this.col * 101;
  this.y = this.row * 83;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var numEnemies = 3;
var allEnemies = [];
for(var i = 0; i < numEnemies; i++) {
  allEnemies.push(new Enemy(i*101, (i+1)*83));
}

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

function getRandomInt(min, max) {
  return Math.floor((Math.random() * (max - min + 1)) + min);
};
