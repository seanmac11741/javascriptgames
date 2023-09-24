//global vars accessable everywhere
let cursors;
let keys;
var angle1 = 0;
var slap = false;
let lastDir = 'RIGHT';


class mainScene extends Phaser.Scene {

  constructor() {
    super({ key: 'mainScene' }); //this labels the scene for grabbing later 
  }

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


    this.player = this.physics.add
      .sprite(140, 60, 'Sheen')
      .setDisplaySize(32, 32);

    //collision between player and rock layer
    this.physics.add.collider(this.player, rockLayer);
    rockLayer.setCollisionBetween(1, 2);

    const camera = this.cameras.main;
    camera.startFollow(this.player, true);
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    //long grass layer on top of player, makes it look like player is going through grass 
    const longGrassLayer = map.createDynamicLayer("Long Grass", tileset, 0, 0);
    this.sword = this.physics.add
      .sprite(width / 2, height / 2, 'sword')
      .setScale(2, 2)
      .setCircle(10, -3, -5);
    this.sword.visible = true;
    this.swordfound = false;

    // this.rock = this.physics.add.staticImage(100, 50, 'Terrain', 1);
    // this.physics.add.collider(player, this.rock);

    this.swordCollider = this.physics.add.collider(this.player, this.sword, () => {
      // destroy sword
      this.sword.visible = false;
      this.swordfound = true;
      this.sword.setPosition(-200, -200);
      //pop up some text saying, "you have sword! use it with space or button!"
      console.log(`Sword found`);
      this.events.emit('setText', 'You found a sword! \n Press space or attack to swing it!');
      this.swordCollider.destroy();
    }, null, this);

    //sword and grass colider TODO: figure out how to grab a tile and "chop" the grass
    this.grassCollider = this.physics.add.collider(this.sword, longGrassLayer);

    //fullscreen button
    var fs = this.make.image({
      x: game.config.width - 20 / 2,
      y: 20 / 2,
      key: 'FSbutton',
      // scale: {
      //   x: scale,
      //   y: scale
      // },
      add: true
    }).setDisplaySize(20, 20)
      .setScrollFactor(0)
      .setInteractive().on('pointerdown', function () {
        if (this.scale.isFullscreen) {
          this.scale.stopFullscreen();
        } else {
          this.scale.startFullscreen();
        }
      }, this);

    var abut = this.make.image({
      x: game.config.width - 30 / 2,
      y: game.config.height - 30 / 2,
      key: 'Abutton',
      add: true
    }).setDisplaySize(30, 30)
      .setScrollFactor(0)
      .setInteractive().on('pointerdown', function () {
        slap = true;
        // console.log('slapp!');
      }, this)
      .on('pointerup', function () {
        slap = false;
      });

    cursors = this.input.keyboard.createCursorKeys();
    keys = this.input.keyboard.addKeys('W,S,A,D,SPACE');  // keys.W, keys.S, keys.A, keys.D

    const anims = this.anims;
    //player animations 
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

    //sword animations 
    let swordFrameRate = 7,
      swordRepeat = 0;
    anims.create({
      key: 'right-swing',
      frames: this.anims.generateFrameNumbers('sword', { start: 1, end: 3 }),
      frameRate: swordFrameRate,
      repeat: swordRepeat
    });
    anims.create({
      key: 'down-swing',
      frames: this.anims.generateFrameNumbers('sword', { start: 4, end: 6 }),
      frameRate: swordFrameRate,
      repeat: swordRepeat
    });
    anims.create({
      key: 'left-swing',
      frames: this.anims.generateFrameNumbers('sword', { start: 7, end: 9 }),
      frameRate: swordFrameRate,
      repeat: swordRepeat
    });
    anims.create({
      key: 'up-swing',
      frames: this.anims.generateFrameNumbers('sword', { start: 10, end: 12 }),
      frameRate: swordFrameRate,
      repeat: swordRepeat
    });

    this.swordLock = false; //only swing sword once per space push
    this.playerLock = false;

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
    const prevVelocity = this.player.body.velocity.clone();
    let up = false,
      down = false,
      left = false,
      right = false;
    // This method is called 60 times per second after create()
    // It will handle all the game's logic, like movements

    this.player.body.setVelocity(0);
    this.sword.body.setVelocity(0);


    //if player is locked for sword swinging, then lock player position 
    if (!this.playerLock) {
      if (keys.W.isDown || this.joyStick.up) {
        up = true;
        lastDir = 'UP';
        this.player.body.setVelocityY(-speed);
      } else if (keys.S.isDown || this.joyStick.down) {
        down = true;
        lastDir = 'DOWN';
        this.player.body.setVelocityY(speed);
      } else {
        this.player.body.setVelocityY(0);
      }

      if (keys.A.isDown || this.joyStick.left) {
        this.player.body.setVelocityX(-speed);
        left = true;
        lastDir = 'LEFT';
      } else if (keys.D.isDown || this.joyStick.right) {
        this.player.body.setVelocityX(speed);
        right = true;
        lastDir = 'RIGHT';
      } else {
        this.player.body.setVelocityX(0);
      }
    }

    this.player.body.velocity.normalize().scale(speed);


    //animation last so that we only play one animation
    if (left) {
      this.player.anims.play('left-walk', true);
    } else if (right) {
      this.player.anims.play('right-walk', true);
    } else if (up) {
      this.player.anims.play('back-walk', true);
    } else if (down) {
      this.player.anims.play('front-walk', true);
    } else {
      this.player.anims.stop();
    }

    //unlock sword for swinging once player lets go of space 
    if (keys.SPACE.isUp || !slap) {
      this.swordLock = false;
    }

    //sword move off screen and unlock player func 
    function unlockPlayer() {
      this.sword.setPosition(-200, -200);
      this.playerLock = false;
    }

    //sword swinging
    if ((keys.SPACE.isDown || slap || this.playerLock) && this.swordfound) {
      this.sword.visible = true;
      // this.text.setText('Space clicked');
      if (!this.swordLock) {
        //start swinging sword once
        this.swordLock = true;
        //lock player in place while swinging sword
        this.playerLock = true;
        if (lastDir == 'RIGHT') {
          this.sword.setPosition(this.player.x + this.player.width, this.player.y + this.player.width / 2);
          this.sword.anims.play('right-swing', true)
            .once(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, unlockPlayer, this);
        } else if (lastDir == 'LEFT') {
          this.sword.setPosition(this.player.x - this.player.width, this.player.y + this.player.width / 2);
          this.sword.anims.play('left-swing', true)
            .once(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, unlockPlayer, this);
        } else if (lastDir == 'UP') {
          this.sword.setPosition(this.player.x + this.player.width / 4, this.player.y - this.player.height);
          this.sword.anims.play('up-swing', true)
            .once(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, unlockPlayer, this);
        } else if (lastDir == 'DOWN') {
          this.sword.setPosition(this.player.x + this.player.width / 4, this.player.y + this.player.height * 1.5);
          this.sword.anims.play('down-swing', true)
            .once(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, unlockPlayer, this);
        }
      }

    } else if ((keys.SPACE.isUp || !slap) && this.swordfound) {
      this.sword.visible = false;
      this.sword.setPosition(-200, -200);
    }

    // Phaser.Math.RotateAroundDistance(this.sword, player.x, player.y, angle1, scale);
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

};

class UIScene extends Phaser.Scene {
  constructor() {
    super({ key: 'UIScene', active: true });

    this.score = 0;
  }

  create() {


    const helper = this.add.text(0, 0);
    var directions = 'Use WASD keys or the joystick to move';
    helper.setText(directions);

    //  Grab a reference to the Game Scene
    const ourGame = this.scene.get('mainScene')
    //  Listen for events from it
    ourGame.events.on('setText', function (text) {
      helper.setText(text);
    }, this);

  }
};



const gameConfig = {
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
  parent: "container",
  scene: [mainScene, UIScene]
};

const game = new Phaser.Game(gameConfig);