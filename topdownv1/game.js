window.onload = function() {

    // object containing configuration options
    let gameConfig = {
        type: Phaser.AUTO,
        width: 448,
        height: 320,
        pixelArt: true,
        physics: {
          default: "arcade",
          arcade: {
            gravity: {y:0}
          }
        },
        scene: {
          preload: preload,
          create: create,
          update: update
        },
        backgroundColor: 0x87CEEB,

        // physics settings
        physics: {
            default: "arcade"
        }
    }

    game = new Phaser.Game(gameConfig);
    //global vars for the game
    let cursors;
    let player;
    let showDebug =false;

    //these are for resizing the window dynamically
    window.focus();
    resize();
    window.addEventListener("resize", resize, false);
}

function preload(){
  this.load.image("tiles", "assets/Bush.png");
  this.load.spritesheet('josh', 'assets/Joshdabosh.png', {
    frameWidth: 64, frameHeight: 56
  });
}

function create(){
  //create start ______________________________________________________

  const level = [
    [  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1 ],
    [  1,  1,  2,  3,  1,  1,  1,  1,  2,  3,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1 ],
    [  1,  5,  6,  6,  1,  1,  1,  5,  6,  6,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1 ],
    [  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1 ],
    [  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1 ],
    [  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1 ],
    [  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1 ],
    [  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  5,  1,  1,  1,  1,  1,  1,  1,  1,  1 ],
    [  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1 ],
    [  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1 ],
    [  1,  1,  1,  1,  1,  1,  1,  1,  1,  5,  5,  1,  1,  1,  1,  1,  1,  1,  1,  1 ],
    [  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1 ],
    [  5,  6,  3,  1,  1,  1,  1,  1,  5,  5,  5,  1,  1,  1,  1,  1,  1,  1,  1,  1 ],
    [  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  1,  1,  1,  1,  1,  1,  1,  1,  1 ]
  ];

  const map = this.make.tilemap({data: level, tileWidth:32, tileHeight:32});
  const tiles = map.addTilesetImage("tiles");
  const layer = map.createStaticLayer(0, tiles, 0,0);

  //player
  player = this.physics.add.sprite(100, 450, 'josh');

  this.physics.add.collider(player, map);

  // Create the player's walking animations from the texture atlas. These are stored in the global
    // animation manager so any sprite can access them.
    const anims = this.anims;
    anims.create({
      key: 'right-walk',
      frames: this.anims.generateFrameNumbers('josh', {start:1, end:5}),
      frameRate: 10,
      repeat: -1
      });
    anims.create({
        key: 'left-walk',
        frames: this.anims.generateFrameNumbers('josh', {start:1, end:5}),
        frameRate: 10,
        repeat: -1
        });
    anims.create({
          key: 'front-walk',
          frames: this.anims.generateFrameNumbers('josh', {start:1, end:5}),
          frameRate: 10,
          repeat: -1
          });
    anims.create({
            key: 'back-walk',
            frames: this.anims.generateFrameNumbers('josh', {start:1, end:5}),
            frameRate: 10,
            repeat: -1
            });


  //camera
  const camera = this.cameras.main;
  camera.startFollow(player);
  camera.setBounds(0,0, map.widthInPixels, map.heightInPixels);


//dont need camera controls anymore, control player, camera follows, (holy shit this is easy)
  // const cursors = this.input.keyboard.createCursorKeys();
  // controls = new Phaser.Cameras.Controls.FixedKeyControl({
  //   camera: camera,
  //   left: cursors.left,
  //   right: cursors.right,
  //   up: cursors.up,
  //   down: cursors.down,
  //   speed: 0.5
  // });

cursors = this.input.keyboard.createCursorKeys();



//basic directions for user
  this.add
    .text(16, 16, "Arrow keys to walk", {
      font: "18px monospace",
      fill: "#ffffff",
      padding: { x: 20, y: 10 },
      backgroundColor: "#000000"
    })
    .setScrollFactor(0);

  //end of create
}

//UPDATE START //////////////////////////////////////////////////////////////////////////////////
function update(time, delta){
  const speed = 175;
  const prevVelocity = player.body.velocity.clone();
  // Stop any previous movement from the last frame
    player.body.setVelocity(0);

    // Horizontal movement
    if (cursors.left.isDown) {
      player.body.setVelocityX(-speed);
    } else if (cursors.right.isDown) {
      player.body.setVelocityX(speed);
    }

    // Vertical movement
    if (cursors.up.isDown) {
      player.body.setVelocityY(-speed);
    } else if (cursors.down.isDown) {
      player.body.setVelocityY(speed);
    }

    // Normalize and scale the velocity so that player can't move faster along a diagonal
    player.body.velocity.normalize().scale(speed);

    // Update the animation last and give left/right animations precedence over up/down animations
  if (cursors.left.isDown) {
    player.anims.play("left-walk", true);
  } else if (cursors.right.isDown) {
    player.anims.play("right-walk", true);
  } else if (cursors.up.isDown) {
    player.anims.play("back-walk", true);
  } else if (cursors.down.isDown) {
    player.anims.play("front-walk", true);
  } else {
    player.anims.stop();
  }
  //end of update
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
