!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.rexvirtualjoystickplugin=e():t.rexvirtualjoystickplugin=e()}(window,function(){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(r,i,function(e){return t[e]}.bind(null,i));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=286)}({126:function(t,e,n){"use strict";var r=n(50),i=n(19),o=n.n(i),s=n(77),u=n(78);function c(t){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function a(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function h(t,e){return!e||"object"!==c(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function f(t){return(f=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function l(t,e){return(l=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var y=Phaser.Utils.Objects.GetValue,p=Phaser.Math.Distance.Between,v=Phaser.Math.Angle.Between,b=function(t){function e(t){var n;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),(n=h(this,f(e).call(this))).resetFromJSON(t),n}var n,i,c;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&l(t,e)}(e,r["a"]),n=e,(i=[{key:"resetFromJSON",value:function(t){void 0==this.start&&(this.start={}),void 0==this.end&&(this.end={}),this.setEnable(y(t,"enable",!0)),this.setMode(y(t,"dir","8dir")),this.setDistanceThreshold(y(t,"forceMin",16));var e=y(t,"start.x",null),n=y(t,"start.y",null),r=y(t,"end.x",null),i=y(t,"end.y",null);return this.setVector(e,n,r,i),this}},{key:"toJSON",value:function(){return{enable:this.enable,dir:this.dirMode,forceMin:this.forceMin,start:{x:this.start.x,y:this.start.y},end:{x:this.end.x,y:this.end.y}}}},{key:"setMode",value:function(t){return"string"==typeof t&&(t=s.a[t]),this.dirMode=t,this}},{key:"setEnable",value:function(t){if((t=void 0==t||!!t)!==this.enable)return!1===t&&this.clearVector(),this.enable=t,this}},{key:"setDistanceThreshold",value:function(t){return t<0&&(t=0),this.forceMin=t,this}},{key:"clearVector",value:function(){return this.start.x=0,this.start.y=0,this.end.x=0,this.end.y=0,this.clearAllKeysState(),this}},{key:"setVector",value:function(t,e,n,r){if(this.clearVector(),!this.enable)return this;if(null===t)return this;if(void 0===n&&(n=t,t=0,r=e,e=0),this.start.x=t,this.start.y=e,this.end.x=n,this.end.y=r,this.forceMin>0&&this.force<this.forceMin)return this;var i=Object(u.a)(this.angle,this.dirMode,!0);for(var o in i)i[o]&&this.setKeyState(o,!0);return this}},{key:"forceX",get:function(){return this.end.x-this.start.x}},{key:"forceY",get:function(){return this.end.y-this.start.y}},{key:"force",get:function(){return p(this.start.x,this.start.y,this.end.x,this.end.y)}},{key:"rotation",get:function(){return v(this.start.x,this.start.y,this.end.x,this.end.y)}},{key:"angle",get:function(){return o()(this.rotation)}},{key:"octant",get:function(){var t=0;return this.rightKeyDown?t=this.downKeyDown?45:0:this.downKeyDown?t=this.leftKeyDown?135:90:this.leftKeyDown?t=this.upKeyDown?225:180:this.upKeyDown&&(t=this.rightKeyDown?315:270),t}}])&&a(n.prototype,i),c&&a(n,c),e}(),d=n(2);function m(t){return(m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function w(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function g(t,e){return!e||"object"!==m(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function E(t,e,n){return(E="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=k(t)););return t}(t,e);if(r){var i=Object.getOwnPropertyDescriptor(r,e);return i.get?i.get.call(n):i.value}})(t,e,n||t)}function k(t){return(k=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function O(t,e){return(O=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var _=Phaser.Utils.Objects.GetValue,K=Phaser.Geom.Circle,j=Phaser.Geom.Circle.Contains,S=function(t){function e(t,n){var r;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),r=g(this,k(e).call(this,n));var i=_(n,"eventEmitter",void 0),o=_(n,"EventEmitterClass",void 0);return r.setEventEmitter(i,o),r.scene=t.scene,r.gameObject=t,r.radius=_(n,"radius",100),t.setInteractive(new K(t.displayOriginX,t.displayOriginY,r.radius),j),r.boot(),r}var n,r,i;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&O(t,e)}(e,b),n=e,(r=[{key:"resetFromJSON",value:function(t){return E(k(e.prototype),"resetFromJSON",this).call(this,t),this.pointer=void 0,this}},{key:"toJSON",value:function(){var t=E(k(e.prototype),"toJSON",this).call(this);return t.radius=this.radius,t}},{key:"boot",value:function(){this.gameObject.on("pointerdown",this.onKeyDownStart,this),this.gameObject.on("pointerover",this.onKeyDownStart,this),this.scene.input.on("pointermove",this.onKeyDown,this),this.scene.input.on("pointerup",this.onKeyUp,this),this.gameObject.once("destroy",this.destroy,this)}},{key:"shutdown",value:function(){this.scene&&(this.scene.input.off("pointermove",this.onKeyDown,this),this.scene.input.off("pointerup",this.onKeyUp,this)),this.destroyEventEmitter(),this.pointer=void 0,this.scene=void 0,this.gameObject=void 0}},{key:"destroy",value:function(){this.shutdown()}},{key:"onKeyDownStart",value:function(t){t.isDown&&void 0===this.pointer&&(this.pointer=t,this.onKeyDown(t))}},{key:"onKeyDown",value:function(t){if(this.pointer===t){var e=this.gameObject,n=t;this.setVector(e.x,e.y,n.x,n.y),this.emit("update")}}},{key:"onKeyUp",value:function(t){this.pointer===t&&(this.pointer=void 0,this.clearVector(),this.emit("update"))}}])&&w(n.prototype,r),i&&w(n,i),e}();Object.assign(S.prototype,d.a);var x=S;e.a=x},19:function(t,e){var n=180/Math.PI;t.exports=function(t){return t*n}},2:function(t,e,n){"use strict";e.a={setEventEmitter:function(t,e){return void 0===e&&(e=Phaser.Events.EventEmitter),this._privateEE=void 0===t,this._eventEmitter=this._privateEE?new e:t,this},destroyEventEmitter:function(){this._eventEmitter&&this._privateEE&&this._eventEmitter.shutdown()},getEventEmitter:function(){return this._eventEmitter},on:function(){return this._eventEmitter&&this._eventEmitter.on.apply(this._eventEmitter,arguments),this},once:function(){return this._eventEmitter&&this._eventEmitter.once.apply(this._eventEmitter,arguments),this},off:function(){return this._eventEmitter&&this._eventEmitter.off.apply(this._eventEmitter,arguments),this},emit:function(){return this._eventEmitter&&this._eventEmitter.emit.apply(this._eventEmitter,arguments),this},addListener:function(){return this._eventEmitter&&this._eventEmitter.addListener.apply(this._eventEmitter,arguments),this},removeListener:function(){return this._eventEmitter&&this._eventEmitter.removeListener.apply(this._eventEmitter,arguments),this},removeAllListeners:function(){return this._eventEmitter&&this._eventEmitter.removeAllListeners.apply(this._eventEmitter,arguments),this},listenerCount:function(){return this._eventEmitter?this._eventEmitter.listenerCount.apply(this._eventEmitter,arguments):0},listeners:function(){return this._eventEmitter?this._eventEmitter.listeners.apply(this._eventEmitter,arguments):[]}}},215:function(t,e,n){"use strict";var r=n(126),i=n(2);function o(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var s=Phaser.Utils.Objects.GetValue,u=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),void 0===n&&(n={});var r=s(n,"eventEmitter",void 0),i=s(n,"EventEmitterClass",void 0);this.setEventEmitter(r,i),n.eventEmitter=this.getEventEmitter(),this.scene=e,this.base=void 0,this.thumb=void 0,this.touchCursor=void 0,this.setRadius(s(n,"radius",100)),this.addBase(s(n,"base",void 0),n),this.addThumb(s(n,"thumb",void 0));var o=s(n,"x",0),u=s(n,"y",0);this.base.setPosition(o,u),this.thumb.setPosition(o,u),s(n,"fixed",!0)&&this.setScrollFactor(0),this.boot()}var e,n,i;return e=t,(n=[{key:"destroy",value:function(){this.destroyEventEmitter(),this.base.destroy(),this.thumb.destroy(),this.base=void 0,this.thumb=void 0,this.touchCursor=void 0}},{key:"createCursorKeys",value:function(){return this.touchCursor.createCursorKeys()}},{key:"setPosition",value:function(t,e){return this.x=t,this.y=e,this}},{key:"setVisible",value:function(t){this.visible=t}},{key:"toggleVisible",value:function(){this.visible=!this.visible}},{key:"setEnable",value:function(t){return this.enable=t,this}},{key:"toggleEnabl",value:function(){this.enable=!this.enable}},{key:"setRadius",value:function(t){return this.radius=t,this}},{key:"setVisible",value:function(t){return this.visible=t,this}},{key:"addBase",value:function(t,e){return this.base&&this.base.destroy(),void 0===t&&(t=this.scene.add.circle(0,0,this.radius).setStrokeStyle(3,255)),this.touchCursor=new r.a(t,e),this.base=t,this}},{key:"addThumb",value:function(t){return this.thumb&&this.thumb.destroy(),void 0===t&&(t=this.scene.add.circle(0,0,40).setStrokeStyle(3,65280)),this.thumb=t,this}},{key:"setScrollFactor",value:function(t){this.base.setScrollFactor(t),this.thumb.setScrollFactor(t)}},{key:"boot",value:function(){this.touchCursor.on("update",this.update,this)}},{key:"update",value:function(){var t=this.touchCursor;if(t.anyKeyDown)if(t.force>this.radius){var e=t.rotation;this.thumb.x=t.start.x+Math.cos(e)*this.radius,this.thumb.y=t.start.y+Math.sin(e)*this.radius}else this.thumb.x=t.end.x,this.thumb.y=t.end.y;else this.thumb.x=this.base.x,this.thumb.y=this.base.y;return this}},{key:"forceX",get:function(){return this.touchCursor.forceX}},{key:"forceY",get:function(){return this.touchCursor.forceY}},{key:"force",get:function(){return this.touchCursor.force}},{key:"rotation",get:function(){return this.touchCursor.rotation}},{key:"angle",get:function(){return this.touchCursor.angle}},{key:"up",get:function(){return this.touchCursor.upKeyDown}},{key:"down",get:function(){return this.touchCursor.downKeyDown}},{key:"left",get:function(){return this.touchCursor.leftKeyDown}},{key:"right",get:function(){return this.touchCursor.rightKeyDown}},{key:"noKey",get:function(){return this.touchCursor.noKeyDown}},{key:"pointerX",get:function(){return this.touchCursor.end.x}},{key:"pointerY",get:function(){return this.touchCursor.end.y}},{key:"pointer",get:function(){return this.touchCursor.pointer}},{key:"x",set:function(t){this.base.x=t},get:function(){return this.base.x}},{key:"y",set:function(t){this.base.y=t},get:function(){return this.base.y}},{key:"visible",get:function(){return this.base.visible},set:function(t){this.base.visible=t,this.thumb.visible=t}},{key:"enable",get:function(){return this.touchCursor.enable},set:function(t){this.touchCursor.setEnable(t)}}])&&o(e.prototype,n),i&&o(e,i),t}();Object.assign(u.prototype,i.a);var c=u;e.a=c},286:function(t,e,n){"use strict";n.r(e);var r=n(215);function i(t){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function s(t,e){return!e||"object"!==i(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function u(t){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function c(t,e){return(c=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var a=function(t){function e(t){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),s(this,u(e).call(this,t))}var n,i,a;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&c(t,e)}(e,Phaser.Plugins.BasePlugin),n=e,(i=[{key:"start",value:function(){this.game.events.once("destroy",this.destroy,this)}},{key:"add",value:function(t,e){return new r.a(t,e)}}])&&o(n.prototype,i),a&&o(n,a),e}();e.default=a},50:function(t,e,n){"use strict";function r(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var i=Phaser.Input.Keyboard.Key,o=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.cursorKeys={up:new i,down:new i,left:new i,right:new i},this.noKeyDown=!0}var e,n,o;return e=t,(n=[{key:"createCursorKeys",value:function(){return this.cursorKeys}},{key:"setKeyState",value:function(t,e){var n=this.cursorKeys[t];return n.enabled?(e&&(this.noKeyDown=!1),n.isDown!==e&&(s.timeDown=Date.now(),e?n.onDown(s):n.onUp(s)),this):this}},{key:"clearAllKeysState",value:function(){for(var t in this.noKeyDown=!0,this.cursorKeys)this.setKeyState(t,!1);return this}},{key:"getKeyState",value:function(t){return this.cursorKeys[t]}},{key:"upKeyDown",get:function(){return this.cursorKeys.up.isDown}},{key:"downKeyDown",get:function(){return this.cursorKeys.down.isDown}},{key:"leftKeyDown",get:function(){return this.cursorKeys.left.isDown}},{key:"rightKeyDown",get:function(){return this.cursorKeys.right.isDown}},{key:"anyKeyDown",get:function(){return!this.noKeyDown}}])&&r(e.prototype,n),o&&r(e,o),t}(),s={altKey:!1,ctrlKey:!1,shiftKey:!1,metaKey:!1,location:0};e.a=o},77:function(t,e,n){"use strict";e.a={"up&down":0,"left&right":1,"4dir":2,"8dir":3}},78:function(t,e,n){"use strict";var r={};e.a=function(t,e,n){switch(void 0===n?n={}:!0===n&&(n=r),n.left=!1,n.right=!1,n.up=!1,n.down=!1,t=(t+360)%360,e){case 0:t<180?n.down=!0:n.up=!0;break;case 1:t>90&&t<=270?n.left=!0:n.right=!0;break;case 2:t>45&&t<=135?n.down=!0:t>135&&t<=225?n.left=!0:t>225&&t<=315?n.up=!0:n.right=!0;break;case 3:t>22.5&&t<=67.5?(n.down=!0,n.right=!0):t>67.5&&t<=112.5?n.down=!0:t>112.5&&t<=157.5?(n.down=!0,n.left=!0):t>157.5&&t<=202.5?n.left=!0:t>202.5&&t<=247.5?(n.left=!0,n.up=!0):t>247.5&&t<=292.5?n.up=!0:t>292.5&&t<=337.5?(n.up=!0,n.right=!0):n.right=!0}return n}}}).default});
