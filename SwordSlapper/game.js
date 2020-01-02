//global vars accessable everywhere
let game;
let player;
let cursors;
let gameOptions = {
  playerGrav: 0,
}

window.onload = function(){
  let gameConfig = {
    type: Phaser.AUTO,
    width: 400,
    height: 300,
    pixelArt: true,
    backgroundColor: 0x444444,
        physics: {
            default: "arcade",
            arcade: {
                gravity: {
                    y: 0
                }
            }
        },
       scene: mainScene
    }
    game = new Phaser.Game(gameConfig);
    resize();
  }

class mainScene {
  // The 3 methods currenlty empty

  preload() {
    // This method is called once at the beginning
    // It will load all the assets, like sprites and sounds
    this.load.spritesheet('Sheen', 'assets/Seanart1.png', {
      frameWidth: 16, frameHeight: 16
    });
  }
  create() {
    // This method is called once, just after preload()
    // It will initialize our scene, like the positions of the sprites
    player = this.physics.add
      .sprite(100, 100, 'Sheen')
      .setSize(100,100);

      cursors = this.input.keyboard.createCursorKeys();

  }
  update() {
    resize();
    const speed = 100;
    // This method is called 60 times per second after create()
    // It will handle all the game's logic, like movements

    if (cursors.left.isDown) {
    player.body.setVelocityX(-speed);
  } else if (cursors.right.isDown) {
    player.body.setVelocityX(speed);
  } else{
    player.body.setVelocityX(0);
  }

  // Vertical movement
  if (cursors.up.isDown) {
    player.body.setVelocityY(-speed);
  } else if (cursors.down.isDown) {
    player.body.setVelocityY(speed);
  } else{
    player.body.setVelocityY(0);
  }

  player.body.velocity.normalize().scale(speed);


  }
}

function resize(){
    let canvas = document.querySelector("canvas");
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let windowRatio = windowWidth / windowHeight;
    let gameRatio = game.config.width / game.config.height;
    if(windowRatio < gameRatio){
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else{
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}
