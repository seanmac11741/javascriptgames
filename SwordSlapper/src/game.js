//global vars accessable everywhere
let game;
let player;
let sword;
let cursors;
let keys;
var angle1 = 0;
var swordfound = false;
var slap = false;
let lastDir = 'RIGHT';

window.onload = function () {
  let gameConfig = {
    parent: game,
    type: Phaser.AUTO,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
    },
    input: {
      keyboard: {
        target: window
      },
      mouse: {
        target: null,
        capture: true
      },
      activePointers: 4,
      touch: {
        target: null,
        capture: true
      },
      smoothFactor: 0,
      gamepad: false,
      windowEvents: true,
    },
    width: 400,
    height: 300,
    pixelArt: true,
    roundPixels: true,
    backgroundColor: 0x444444,
    plugins: {
    },
    physics: {
      default: "arcade",
      arcade: {
        // debug: true, //toggle this to see collisions boundaries 
        gravity: {
          y: 0
        }
      }
    },
    scene: mainScene
  }

  game = new Phaser.Game(gameConfig);
}

class mainScene extends Phaser.Scene {

  preload() {
    // This method is called once at the beginning
    // It will load all the assets, like sprites and sounds
    this.load.spritesheet('Sheen', 'assets/Seanart1.png', {
      frameWidth: 16, frameHeight: 16
    });
    this.load.spritesheet('sword', 'assets/sword.png', {
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet('Terrain', 'assets/GrassandRocks.png', {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.image("tiles", "assets/GrassandRocks.png");
    this.load.tilemapTiledJSON('map', "assets/map1.json");

    this.load.image('FSbutton', 'assets/fullscreen.png');
    this.load.image('Abutton', 'assets/abutton.png');

    var url;
    url = 'plugins/rexvirtualjoystickplugin.min.js';
    this.load.plugin('rexvirtualjoystickplugin', url, true);

  }

  create() {
    // This method is called once, just after preload()
    this.scale.lockOrientation('landscape');
    // It will initialize our scene, like the positions of the sprites
    var height = game.config.height;
    var width = game.config.width;
    var scale = game.config.height / 10;

    const map = this.make.tilemap({
      key: "map",
      tileWidth: 32,
      tileHeight: 32
    });

    const tileset = map.addTilesetImage("GrassandRocks", "tiles");
    const groundLayer = map.createStaticLayer("Ground", tileset, 0, 0);
    const rockLayer = map.createStaticLayer("Rocks", tileset, 0, 0);


    player = this.physics.add
      .sprite(140, 140, 'Sheen')
      .setDisplaySize(32, 32);

    //collision between player and rock layer
    this.physics.add.collider(player, rockLayer);
    rockLayer.setCollisionBetween(1, 2);

    const camera = this.cameras.main;
    camera.startFollow(player, true);
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    //long grass layer on top of player, makes it look like player is going through grass 
    const longGrassLayer = map.createDynamicLayer("Long Grass", tileset, 0, 0);
    sword = this.physics.add
      .sprite(width / 2, height / 2, 'sword');
    sword.setScale(2, 2);


    var helper = this.text = this.add.text(camera.x, camera.y);
    var directions = 'Use WASD keys or the joystick to move';
    helper.setText(directions);
    // this.rock = this.physics.add.staticImage(100, 50, 'Terrain', 1);
    // this.physics.add.collider(player, this.rock);

    var collider = this.physics.add.overlap(player, sword, function () {
      if (!swordfound) {
        //destroy sword
        sword.visible = false;
        //destroy this collider
        collider.destroy();
        swordfound = true;
        //pop up some text saying, "you have sword! use it with space or button!"
        var s = 'You found a sword! \n Press space or attack to swing it!';
        helper.setText(s);
      }
    });

    //todo need to make these buttons into its own ui scene
    //fullscreen button
    // var fs = this.make.image({
    //   x: game.config.width - 20 / 2,
    //   y: 20 / 2,
    //   key: 'FSbutton',
    //   // scale: {
    //   //   x: scale,
    //   //   y: scale
    //   // },
    //   add: true
    // }).setDisplaySize(20, 20)
    //   .setInteractive().on('pointerdown', function () {
    //     if (this.scale.isFullscreen) {
    //       this.scale.stopFullscreen();
    //     } else {
    //       this.scale.startFullscreen();
    //     }
    //   }, this);

    // var abut = this.make.image({
    //   x: scale / 2,
    //   y: scale / 2,
    //   key: 'Abutton',
    //   add: true
    // }).setDisplaySize(scale, scale)
    //   .setInteractive().on('pointerdown', function () {
    //     slap = true;
    //     // console.log('slapp!');
    //   }, this)
    //   .on('pointerup', function () {
    //     slap = false;
    //   });

    cursors = this.input.keyboard.createCursorKeys();
    keys = this.input.keyboard.addKeys('W,S,A,D,SPACE');  // keys.W, keys.S, keys.A, keys.D

    const anims = this.anims;
    anims.create({
      key: 'right-walk',
      frames: this.anims.generateFrameNumbers('Sheen', { start: 3, end: 4 }),
      frameRate: 10,
      repeat: -1
    });
    anims.create({
      key: 'left-walk',
      frames: this.anims.generateFrameNumbers('Sheen', { start: 5, end: 6 }),
      frameRate: 10,
      repeat: -1
    });
    anims.create({
      key: 'front-walk',
      frames: this.anims.generateFrameNumbers('Sheen', { start: 0, end: 2 }),
      frameRate: 10,
      repeat: -1
    });
    anims.create({
      key: 'back-walk',
      frames: this.anims.generateFrameNumbers('Sheen', { start: 7, end: 7 }),
      frameRate: 10,
      repeat: -1
    });

    this.joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
      x: scale * 1.5,
      y: game.config.height - (scale * 1.5),
      radius: scale,
      base: this.add.circle(this.x, this.y, scale, 0x888888),
      thumb: this.add.circle(this.x, this.y, scale / 2, 0xcccccc),
      dir: '8dir',   // 'up&down'|0|'left&right'|1|'4dir'|2|'8dir'|3
      forceMin: 1,
      enable: true
    })
      .on('update', this.dumpJoyStickState, this);

    this.joyStick.setScrollFactor(0);
    this.dumpJoyStickState();

  }

  update() {
    const speed = 100;
    const prevVelocity = player.body.velocity.clone();
    let up = false,
      down = false,
      left = false,
      right = false;
    // This method is called 60 times per second after create()
    // It will handle all the game's logic, like movements

    player.body.setVelocity(0);
    if (keys.W.isDown || this.joyStick.up) {
      up = true;
      lastDir = 'UP';
      player.body.setVelocityY(-speed);
    } else if (keys.S.isDown || this.joyStick.down) {
      down = true;
      lastDir = 'DOWN';
      player.body.setVelocityY(speed);
    } else {
      player.body.setVelocityY(0);
    }

    if (keys.A.isDown || this.joyStick.left) {
      player.body.setVelocityX(-speed);
      left = true;
      lastDir = 'LEFT';
    } else if (keys.D.isDown || this.joyStick.right) {
      player.body.setVelocityX(speed);
      right = true;
      lastDir = 'RIGHT';
    } else {
      player.body.setVelocityX(0);
    }

    player.body.velocity.normalize().scale(speed);

    //animation last so that we only play one animation
    if (left) {
      player.anims.play('left-walk', true);
    } else if (right) {
      player.anims.play('right-walk', true);
    } else if (up) {
      player.anims.play('back-walk', true);
    } else if (down) {
      player.anims.play('front-walk', true);
    } else {
      player.anims.stop();
    }

    //sword swinging
    if ((keys.SPACE.isDown || slap) && swordfound) {
      sword.visible = true;
      // this.text.setText('Space clicked');
      if (lastDir == 'RIGHT') {
        sword.setAngle(90);
        sword.setPosition(player.x + player.width, player.y + player.width / 2);
      } else if (lastDir == 'LEFT') {
        sword.setAngle(270);
        sword.setPosition(player.x - player.width, player.y + player.width / 2);
      } else if (lastDir == 'UP') {
        sword.setAngle(0);
        sword.setPosition(player.x + player.width / 4, player.y - player.height);
      } else if (lastDir == 'DOWN') {
        sword.setAngle(180);
        sword.setPosition(player.x - player.width / 2, player.y + player.height * 1.5);
        // Phaser.Math.RotateAroundDistance(sword, player.x, player.y, 10, .010);
        // Phaser.Actions.RotateAround(sword, { x: player.x, y: player.y }, 0.01);
        // Phaser.Actions.PlaceOnCircle(
        //   [sword],
        //   this.circle,
        //   this.startAngle.getValue(),
        //   this.endAngle.getValue()
        // );
      }

    } else if (swordfound) {
      sword.visible = false;
      sword.setPosition(-200, -200);
      // this.text.setText('No sword');
    }

    // Phaser.Math.RotateAroundDistance(sword, player.x, player.y, angle1, scale);
    // angle1 = Phaser.Math.Angle.Wrap(angle1, + -.02);

  }

  dumpJoyStickState() {
    var cursorKeys = this.joyStick.createCursorKeys();
    var s = 'Use WASD keys or the joystick to move';
    // var s = 'Key down: ';
    // for (var name in cursorKeys) {
    //   if (cursorKeys[name].isDown) {
    //     s += name + ' ';
    //   }
    // }
    // s += '\n';
    // s += 'Use WASD keys or the joystick';
    // s += ('Force: ' + Math.floor(this.joyStick.force * 100) / 100 + '\n');
    // s += ('Angle: ' + Math.floor(this.joyStick.angle * 100) / 100 + '\n');
    // this.text.setText(s);

    // this.joyStick.y = game.config.height - this.joyStick.radius;
  }

}
