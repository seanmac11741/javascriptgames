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

    }

    game = new Phaser.Game(gameConfig);
    //global vars for the game
    let cursors;
    let player;
    let frog;
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
  this.load.spritesheet('frog', 'assets/Frog.png', {
    frameWidth: 64, frameHeight: 44
  });
}

function create(){
  //create start ______________________________________________________

  window.focus();
  resize();
  window.addEventListener("resize", resize, false);

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
  // layer.resizeWorld();

  //player
  player = this.physics.add.sprite(100, 100, 'josh');

  this.physics.add.collider(player, map); //TODO replace this with a collision layer

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





//basic directions for user
  // this.add
  //   .text(16, 16, "Arrow keys to walk", {
  //     font: "18px monospace",
  //     fill: "#ffffff",
  //     padding: { x: 20, y: 10 },
  //     backgroundColor: "#000000"
  //   })
  //   .setScrollFactor(0);



  //end of create
}

//UPDATE START //////////////////////////////////////////////////////////////////////////////////
function update(time, delta){
  resize();
  const speed = 175;
  const prevVelocity = player.body.velocity.clone();
  const pointer1 = this.input.activePointer;
  var camera = this.cameras.main;
  var worldView = camera.worldView;
  var midx = camera.midPoint.x;
  var midy = camera.midPoint.y;
  // Stop any previous movement from the last frame
    player.body.setVelocity(0);

    // var debug = "pointerx and y: " + pointer1.x + ", " + pointer1.y + "\n"
    //             + "playerx: " + player.x + "\n" +
    //             "worldViewleft: " + worldView.left;



    //add pointer touch/left mouse button input and just move chicken right
    if(pointer1.isDown){
      //new x movement
      var adjPlayerx = Math.round(player.x -worldView.left);
      var adjPlayery = Math.round(player.y-worldView.top);
      var ptx = Math.round(pointer1.x);
      var pty = Math.round(pointer1.y);
      var right, left, up, down = false;


      var debug = "pointery: " + pty + "\n"
                  + "adjplayery: " + adjPlayery + "\n"
                  + "WVtop: " + Math.round(worldView.top) + "\n";

      //new x movement, working
      if(Math.abs(ptx - adjPlayerx) < 20){
        debug += "Close enough x" + "\n";
        player.body.setVelocityX(0);
      }
      else if(ptx > adjPlayerx){
        debug += "right" + "\n";
        right = true;
        player.body.setVelocityX(speed);
        player.anims.play("right-walk", true);
      }
      else if(ptx < adjPlayerx){
        debug += "left" + "\n";
        left = true;
        player.body.setVelocityX(-speed);
        player.anims.play("left-walk", true);
      }

      //new y movement working
      if(Math.abs(pty - adjPlayery) < 20){
        debug += "Close enough y" + "\n";
        player.body.setVelocityY(0);
      }
      else if (pty > adjPlayery){
        debug += "down" + "\n";
        player.body.setVelocityY(speed);
        if(!left && !right){
          player.anims.play("front-walk", true);
        }
      }
      else if(pty < adjPlayery){
        debug += "up" + "\n";
        player.body.setVelocityY(-speed);
        if(!left && !right){
          player.anims.play("back-walk", true);
        }
      }



    } else {
      player.anims.stop();
    }

    // old removed arrow key movement
    // // Horizontal movement
    // if (cursors.left.isDown) {
    //   player.body.setVelocityX(-speed);
    // } else if (cursors.right.isDown) {
    //   player.body.setVelocityX(speed);
    // }
    //
    // // Vertical movement
    // if (cursors.up.isDown) {
    //   player.body.setVelocityY(-speed);
    // } else if (cursors.down.isDown) {
    //   player.body.setVelocityY(speed);
    // }
    this.add
      .text(0, 0, debug, {
        font: "10px monospace",
        fill: "#ffffff",
        padding: { x: 20, y: 10 },
        backgroundColor: "#000000"
      })
      .setScrollFactor(0);
    // Normalize and scale the velocity so that player can't move faster along a diagonal
    player.body.velocity.normalize().scale(speed);

    window.focus();
    resize();
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
