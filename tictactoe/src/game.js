var game,
  xes,
  os,
  group,
  x,
  y,
  scale,
  gameover = false,
  text,
  xwins = 0,
  owins = 0;


var boxarray = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
var boxobjarr = [];
var player = 3; //2 for O and 3 for x

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
    height: 400,
    pixelArt: true,
    backgroundColor: 0x000000,
    plugins: {
    },
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
}

function checkwinner() {
  // boxarray is 1 for blank, 2 for O, 3 for X
  var cats = true;
  var winner = 0;
  console.log('checkwinner called');
  if (boxarray[1] == 3 && boxarray[2] == 3 && boxarray[3] == 3) { winner = 3; }
  else if (boxarray[1] == 2 && boxarray[2] == 2 && boxarray[3] == 2) { winner = 2; }
  else if (boxarray[4] == 2 && boxarray[5] == 2 && boxarray[6] == 2) { winner = 2; }
  else if (boxarray[4] == 3 && boxarray[5] == 3 && boxarray[6] == 3) { winner = 3; }
  else if (boxarray[7] == 2 && boxarray[8] == 2 && boxarray[9] == 2) { winner = 2; }
  else if (boxarray[7] == 3 && boxarray[8] == 3 && boxarray[9] == 3) { winner = 3; }
  else if (boxarray[1] == 3 && boxarray[5] == 3 && boxarray[9] == 3) { winner = 3; }
  else if (boxarray[1] == 2 && boxarray[5] == 2 && boxarray[9] == 2) { winner = 2; }
  else if (boxarray[3] == 2 && boxarray[5] == 2 && boxarray[7] == 2) { winner = 2; }
  else if (boxarray[3] == 3 && boxarray[5] == 3 && boxarray[7] == 3) { winner = 3; }
  else if (boxarray[1] == 3 && boxarray[4] == 3 && boxarray[7] == 3) { winner = 3; }
  else if (boxarray[1] == 2 && boxarray[4] == 2 && boxarray[7] == 2) { winner = 2; }
  else if (boxarray[2] == 3 && boxarray[5] == 3 && boxarray[8] == 3) { winner = 3; }
  else if (boxarray[2] == 2 && boxarray[5] == 2 && boxarray[8] == 2) { winner = 2; }
  else if (boxarray[3] == 3 && boxarray[6] == 3 && boxarray[9] == 3) { winner = 3; }
  else if (boxarray[3] == 2 && boxarray[6] == 2 && boxarray[9] == 2) { winner = 2; }


  for (var j = 1; j < 10; j++) {
    if (boxarray[j] == 1) {
      cats = false;
    }
  }

  if (cats && winner == 0) {
    console.log('cats!');
    text.setText('cats!');
    setTimeout(() => {
      resetgame();
    }, 1000);

  } else {
    if (winner == 2) {
      text.setText('O wins!');
      owins++;
      setTimeout(() => {
        resetgame();
      }, 1000);
    } else if (winner == 3) {
      text.setText('X wins!');
      xwins++;
      setTimeout(() => {
        resetgame();
      }, 1000);
    }
  }
}

function resetgame() {
  for (var j = 1; j < 10; j++) {
    boxarray[j] = 1;
    var currentbox = boxobjarr[j];
    currentbox.setTexture('blank').setDisplaySize(scale - 10, scale - 10);
  }
  player = 3;
  text.setText('X wins: ' + xwins + '\rO wins: ' + owins);
}

function changebox(boxpos) {
  console.log('changebox called with: ' + boxpos);
  if (boxarray[boxpos] == 1) {
    boxarray[boxpos] = player;
    var currentbox = boxobjarr[boxpos];
    if (player == 3) {
      currentbox.setTexture('ximg').setDisplaySize(scale - 10, scale - 10);
      player = 2;
    } else {
      // console.log('doink');
      currentbox.setTexture('oimg').setDisplaySize(scale - 10, scale - 10);
      player = 3;
    }
  }
  checkwinner();
}

class mainScene {
  preload() {
    this.load.image('ximg', 'assets/xpic.png');
    this.load.image('oimg', 'assets/xOpic.png');
    this.load.image('blank', 'assets/blank.png');
  }

  create() {
    var height = game.config.height;
    var width = game.config.width;
    scale = game.config.height / 3;


    var box1 = this.make.image({
      x: scale / 2,
      y: scale / 2,
      key: 'blank',
      add: true
    }).setDisplaySize(scale - 10, scale - 10)
      .setInteractive().on('pointerup', function () {
        changebox(1, box1);

      }, this);

    var box2 = this.make.image({
      x: scale / 2 + scale,
      y: scale / 2,
      key: 'blank',
      add: true
    }).setDisplaySize(scale - 10, scale - 10)
      .setInteractive().on('pointerup', function () {
        changebox(2, box2);
      }, this);

    var box3 = this.make.image({
      x: scale / 2 + scale * 2,
      y: scale / 2,
      key: 'blank',
      add: true
    }).setDisplaySize(scale - 10, scale - 10)
      .setInteractive().on('pointerup', function () {
        changebox(3, box3);
      }, this);

    var box4 = this.make.image({
      x: scale / 2,
      y: scale / 2 + scale,
      key: 'blank',
      add: true
    }).setDisplaySize(scale - 10, scale - 10)
      .setInteractive().on('pointerup', function () {
        changebox(4, box4);
      }, this);

    var box5 = this.make.image({
      x: scale / 2 + scale,
      y: scale / 2 + scale,
      key: 'blank',
      add: true
    }).setDisplaySize(scale - 10, scale - 10)
      .setInteractive().on('pointerup', function () {
        changebox(5, box5);
      }, this);

    var box6 = this.make.image({
      x: scale / 2 + scale * 2,
      y: scale / 2 + scale,
      key: 'blank',
      add: true
    }).setDisplaySize(scale - 10, scale - 10)
      .setInteractive().on('pointerup', function () {
        changebox(6, box6);
      }, this);

    var box7 = this.make.image({
      x: scale / 2,
      y: scale / 2 + scale * 2,
      key: 'blank',
      add: true
    }).setDisplaySize(scale - 10, scale - 10)
      .setInteractive().on('pointerup', function () {
        changebox(7, box7);
      }, this);

    var box8 = this.make.image({
      x: scale / 2 + scale,
      y: scale / 2 + scale * 2,
      key: 'blank',
      add: true
    }).setDisplaySize(scale - 10, scale - 10)
      .setInteractive().on('pointerup', function () {
        changebox(8, box8);
      }, this);

    var box9 = this.make.image({
      x: scale / 2 + scale * 2,
      y: scale / 2 + scale * 2,
      key: 'blank',
      add: true
    }).setDisplaySize(scale - 10, scale - 10)
      .setInteractive().on('pointerup', function () {
        changebox(9, box9);
      }, this);

    boxobjarr = ['asdf', box1, box2, box3, box4, box5, box6, box7, box8, box9];
    text = this.add.text(10, 10, 'X starts!', {
      color: '#b30c00'
    });
  }

  update() {
    // if(gameover){
    //   text.setText('Someone won!');
    // }
  }
}