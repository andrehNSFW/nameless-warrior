!function e(t,a,r){function n(s,o){if(!a[s]){if(!t[s]){var l="function"==typeof require&&require;if(!o&&l)return l(s,!0);if(i)return i(s,!0);var c=new Error("Cannot find module '"+s+"'");throw c.code="MODULE_NOT_FOUND",c}var u=a[s]={exports:{}};t[s][0].call(u.exports,function(e){var a=t[s][1][e];return n(a?a:e)},u,u.exports,e,t,a,r)}return a[s].exports}for(var i="function"==typeof require&&require,s=0;s<r.length;s++)n(r[s]);return n}({1:[function(e,t,a){t.exports={apiURL:"http://localhost:8080/"}},{}],2:[function(e,t,a){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(a,"__esModule",{value:!0});var n=function(){function e(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,a,r){return a&&e(t.prototype,a),r&&e(t,r),t}}(),i=function(){function e(t,a){r(this,e),this.trigger=t,this.target=a,this.bindEvents()}return n(e,[{key:"bindEvents",value:function(){var e=this,t=$(this.trigger),a=$(".overlay");t.each(function(){var t=$(this).data("target"),r=$(t),n=r.find(".formbox__close");n.click(function(e){e.preventDefault(),a.addClass("hide"),r.removeClass("active")}),a.click(function(){a.addClass("hide"),r.removeClass("active")}),$(this).click(function(t){t.preventDefault(),e.closeAll(),a.removeClass("hide"),r.addClass("active")})})}},{key:"closeAll",value:function(){var e=$(".formbox");e.each(function(){$(this).removeClass("active")}),$(".overlay").addClass("hide")}}]),e}();a["default"]=i},{}],3:[function(e,t,a){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var r={PLAYER:"player",NPC:"NPC",ENEMY:"enemy"};a["default"]=r},{}],4:[function(e,t,a){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(a,"__esModule",{value:!0});var i=function(){function e(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,a,r){return a&&e(t.prototype,a),r&&e(t,r),t}}(),s=e("config"),o=r(s),l=e("./Utils"),c=r(l),u=e("./Boxes"),h=r(u),d=e("../game/Game"),f=r(d),g=function(){function e(){n(this,e),this.utils=new c["default"],this.boxes=new h["default"](".open-formbox",".formbox"),this.formsSelector=".form",this.menuNotLogged=$(".menu--not-logged"),this.loggedMenu=$(".menu--logged"),this.notLoggedText=$(".not-logged--text"),this.loggedText=$(".logged--text"),this.loggedInfo=$(".logged--info"),this.bindEvents(),this.checkLogin()}return i(e,[{key:"bindEvents",value:function(){var e=this,t=$(this.formsSelector);t.each(function(){var t=$(this),a=t.data("target"),r=t.find(".formbox__result");t.submit(function(n){var i=e.utils.serializeObject($(this));n.preventDefault(),e.validation(a,t,r)||(e.ajaxPOST(a,r,i),e.cleanForms(t,a,r))})}),$(".logout").click(function(){e.logout()}),$(".character__wrapper").on("click",".character",function(t){var a=$(this).data("character-id");localStorage.setItem("NWarriorCharID",a),e.boxes.closeAll(),$(".content").addClass("hide"),$(".game__wrapper").removeClass("hide"),new f["default"]})}},{key:"validation",value:function(e,t,a){var r=!1;switch(e){case"users":var n=t.find("[name=signupPassword]").val(),i=t.find("[name=signupRepeatPassword]").val();n!=i&&(a.html("The passwords must be equal!"),r=!0);break;case"characters":var s=t.find(".remaining-stats").html();0!=s&&(a.html("You must distribute all attributes!"),r=!0)}return r}},{key:"cleanForms",value:function(e,t){switch(e.find("input[type=text]:not([readonly])").val(""),t){case"characters":e.find(".stats__input").val(5),e.find(".stats__counter").val(10)}}},{key:"ajaxPOST",value:function(e,t,a){var r=this,n=$(".loader"),i=o["default"].apiURL+e;n.addClass("active"),a.token=localStorage.getItem("NWarriorToken"),$.ajax({type:"POST",url:i,data:a,success:function(a){if(n.removeClass("active"),a.failedAuth)return r.logout();switch(e){case"users":r.handleSignUp(a,t);break;case"users/login":r.handleLogin(a,t);break;case"characters":r.handleCharacterCreation(a,t)}},error:function(e,t,a){403==t&&r.logout()}})}},{key:"handleSignUp",value:function(e,t){var a=this;t.html(e.message),e.created&&setTimeout(function(){a.boxes.closeAll(),$('[data-target="#formbox-login"]').click()},500)}},{key:"handleLogin",value:function(e,t){var a=this;t.html(e.message),e.logged&&(setTimeout(function(){a.boxes.closeAll()},500),this.saveSession(e),this.checkLogin())}},{key:"saveSession",value:function(e){localStorage.setItem("NWarriorUserID",e.userId),localStorage.setItem("NWarriorEmail",e.email),localStorage.setItem("NWarriorToken",e.token)}},{key:"checkLogin",value:function(){localStorage.getItem("NWarriorToken")?(this.loggedInfo.find("span").html(localStorage.getItem("NWarriorEmail")),this.loggedMenu.removeClass("hide"),this.loggedText.removeClass("hide"),this.loggedInfo.removeClass("hide"),this.menuNotLogged.addClass("hide"),this.notLoggedText.addClass("hide"),this.setupCharacterCreation(),this.updateCharacterList()):(this.loggedMenu.addClass("hide"),this.loggedText.addClass("hide"),this.loggedInfo.addClass("hide"),this.menuNotLogged.removeClass("hide"),this.notLoggedText.removeClass("hide"))}},{key:"setupCharacterCreation",value:function(){var e=$('[name="form_create"]'),t=e.find(".stats__group"),a=e.find(".remaining-stats"),r=e.find("[name=characterClass]");r.change(function(){var t=$(this).val();t?e.find(".create__img img").attr("src","img/classes/"+t+".png"):e.find(".create__img img").attr("src","")}),t.each(function(){var e=$(this),t=e.find(".stats__btn--plus"),r=e.find(".stats__btn--minus"),n=e.find(".stats__input");t.click(function(e){e.preventDefault();var t=a.html(),r=n.val();t>0&&(r++,n.val(r),t--,a.html(t))}),r.click(function(e){e.preventDefault();var t=a.html(),r=n.val();t<10&&r>5&&(r--,n.val(r),t++,a.html(t))})}),$("[name=userId]").val(localStorage.getItem("NWarriorUserID"))}},{key:"handleCharacterCreation",value:function(e,t){var a=this;t.html(e.message),setTimeout(function(){a.boxes.closeAll(),$('[data-target="#formbox-select"]').click(),t.html(""),$("[name=characterClass]").val(""),$(".create__img img").attr("src","")},500),this.updateCharacterList()}},{key:"updateCharacterList",value:function(){var e=this,t=$(".loader"),a=localStorage.getItem("NWarriorUserID"),r=o["default"].apiURL+"characters/byUser/"+a,n=$(".character__wrapper");t.addClass("active"),$(".character__wrapper > *").remove(),this.utils.getTemplate("characterSelection",function(a){var i=a,s={};s.token=localStorage.getItem("NWarriorToken"),$.ajax({url:r,type:"get",data:s,success:function(a){if(t.removeClass("active"),a.length)for(var r in a){var s=a[r],o=i;o=o.replace("{Nickname}",s.nickname),o=o.replace("{CharacterClass}",e.utils.formatClass(s.characterClass)),o=o.replace("{Strength}",s.strength),o=o.replace("{Constitution}",s.constitution),o=o.replace("{Dexterity}",s.dexterity),o=o.replace("{Intelligence}",s.intelligence),o=o.replace("{Charisma}",s.charisma),o=o.replace("{ClassImg}",s.characterClass),n.append('<div class="character" data-character-id="'+s._id+'">'+o+"</div>")}else n.append('<p>No characters found! Press "New Character" to create your first!</p>')},error:function(t,a,r){e.logout()}})})}},{key:"logout",value:function(){localStorage.clear(),location.reload()}}]),e}();a["default"]=g},{"../game/Game":7,"./Boxes":2,"./Utils":5,config:1}],5:[function(e,t,a){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(a,"__esModule",{value:!0});var n=function(){function e(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,a,r){return a&&e(t.prototype,a),r&&e(t,r),t}}(),i=function(){function e(){r(this,e)}return n(e,[{key:"formatClass",value:function(e){var t=void 0;switch(e){case 1:t="SwordsMan";break;case 2:t="Mage";break;case 3:t="Archer"}return t}},{key:"getTemplate",value:function(e,t){$.get("templates/"+e+".html",function(e){t(e)})}},{key:"serializeObject",value:function(e){var t={},a=e.serializeArray();return $.each(a,function(){t[this.name]?(t[this.name].push||(t[this.name]=[t[this.name]]),t[this.name].push(this.value||"")):t[this.name]=this.value||""}),t}}]),e}();a["default"]=i},{}],6:[function(e,t,a){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(a,"__esModule",{value:!0});var o=function(){function e(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,a,r){return a&&e(t.prototype,a),r&&e(t,r),t}}(),l=e("config"),c=(r(l),e("../core/Globals")),u=r(c),h=function(e){function t(e,a){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:u["default"].PLAYER;n(this,t);var s=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,e.world.randomX,e.world.randomY,a.characterClass));return s.type=r,s.setCharacterInfo(a),s.type===u["default"].player&&s.bind(),s}return s(t,e),o(t,[{key:"setCharacterInfo",value:function(e){this.characterClass=e.characterClass,this.nickname=e.nickname,this.str=e.strength,this.con=e.constitution,this.dex=e.dexterity,this["int"]=e.intelligence,this.cha=e.charisma,this.HP=e.health,this.currentHP=e.currentHealth,this.MP=e.mana,this.currentMP=e.currentMana,this.frame=0,this.speed=225,this.create()}},{key:"bind",value:function(){var e=this;$(document).on("keydown",function(t){var a=t.key;"Enter"===a&&$(".dialog__wrapper").addClass("hide"),"a"===a&&(e.attacking||e.attack())}),this.setupAttackEndCallback()}},{key:"create",value:function(){this.game.add.existing(this),this.game.physics.arcade.enable(this),this.body.collideWorldBounds=!0,this.game.camera.follow(this),this.setupAnimations()}},{key:"update",value:function(){this.type===u["default"].PLAYER&&(this.handleWalking(),this.updateBars())}},{key:"updateBars",value:function(){var e=($(".bar--health .bar__value"),$(".bar--health .bar__text span")),t=($(".bar--mana .bar__value"),$(".bar--mana .bar__text span"));e.html(this.currentHP+"/"+this.HP),t.html(this.currentMP+"/"+this.MP)}},{key:"handleWalking",value:function(){var e=void 0,t=this.game.input,a=t.keyboard.isDown(Phaser.Keyboard.S),r=a?this.speed+250:this.speed;e=t.keyboard.isDown(Phaser.Keyboard.LEFT)?"left":t.keyboard.isDown(Phaser.Keyboard.RIGHT)?"right":t.keyboard.isDown(Phaser.Keyboard.UP)?"up":t.keyboard.isDown(Phaser.Keyboard.DOWN)?"down":"stop",this.walk(e,r)}},{key:"setupAnimations",value:function(){this.animations.add("down",[0,1,2],10,!1),this.animations.add("right",[3,4,5],10,!1),this.animations.add("up",[6,7,8],10,!1),this.animations.add("left",[9,10,11],10,!1)}},{key:"walk",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:50;switch(e){case"down":this.lastFrame=0,this.body.velocity.y=t,this.body.velocity.x=0;break;case"right":this.lastFrame=3,this.body.velocity.y=0,this.body.velocity.x=t;break;case"up":this.lastFrame=6,this.body.velocity.y=-t,this.body.velocity.x=0;break;case"left":this.lastFrame=9,this.body.velocity.x=-t,this.body.velocity.y=0;break;case"stop":this.attacking||(this.body.velocity.x=0,this.body.velocity.y=0,this.frame=this.lastFrame,this.animations.stop())}this.animations.play(e)}},{key:"attack",value:function(){var e=this.lastFrame||0,t=this.getDirection(e),a=this.characterClass+"_attack";this.loadTexture(a),this.anchor.setTo(.25,.25),this.attacking=!0,this.animations.play(t)}},{key:"getDirection",value:function(e){switch(e){case 0:return"down";case 3:return"right";case 6:return"up";case 9:return"left"}}},{key:"randomWalk",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:150;setInterval(function(){var a=Math.floor(5*Math.random())+1;switch(a){case 1:e.walk("down",t);break;case 2:e.walk("up",t);break;case 3:e.walk("left",t);break;case 4:e.walk("right",t);break;case 5:e.walk("stop",t)}},1e3)}},{key:"setupAttackEndCallback",value:function(){var e=this;for(var t in this.animations._anims){var a=this.animations._anims[t];a.onComplete.add(function(){e.attacking&&(e.loadTexture(e.characterClass),e.anchor.setTo(0,0),e.attacking=!1)},this)}}}]),t}(Phaser.Sprite);a["default"]=h},{"../core/Globals":3,config:1}],7:[function(e,t,a){"use strict";function r(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a]);return t["default"]=e,t}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(a,"__esModule",{value:!0});var i=function(){function e(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,a,r){return a&&e(t.prototype,a),r&&e(t,r),t}}(),s=e("../states"),o=r(s),l=function(){function e(){var t=this;n(this,e);var a={w:980,h:470};localStorage.getItem("NWarriorToken")||window.location.assign("/"),this.game=new Phaser.Game(a.w,a.h,Phaser.AUTO,"phaser"),Object.keys(o).forEach(function(e){return t.game.state.add(e,o[e])}),this.game.state.start("Boot"),this.uiStyle()}return i(e,[{key:"uiStyle",value:function(){$(".ui-style").each(function(){$(this).append('<div class="ui-style__left-border"></div><div class="ui-style__right-border"></div><div class="ui-style__top-border"></div><div class="ui-style__bottom-border"></div><div class="ui-style__top-left-corner"></div><div class="ui-style__top-right-corner"></div><div class="ui-style__bottom-left-corner"></div><div class="ui-style__bottom-right-corner"></div>')})}}]),e}();a["default"]=l},{"../states":11}],8:[function(e,t,a){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var i=e("core/Home"),s=r(i),o=function l(){n(this,l),new s["default"]};$(document).ready(function(){new o})},{"core/Home":4}],9:[function(e,t,a){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(a,"__esModule",{value:!0});var s=function(){function e(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,a,r){return a&&e(t.prototype,a),r&&e(t,r),t}}(),o=function(e){function t(){return r(this,t),n(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),s(t,[{key:"preload",value:function(){this.game.load.spritesheet("SwordsMan","img/classes/swordman_walk.png",32,32),this.game.load.spritesheet("SwordsMan_attack","img/classes/swordman_attack.png",64,64),this.game.load.spritesheet("SwordsMan_sleep","img/classes/swordman_sleep.png",32,32),this.game.load.spritesheet("SwordsMan_dead","img/classes/swordman_dead.png",32,32),this.game.load.spritesheet("Archer","img/classes/archer_walk.png",32,32),this.game.load.spritesheet("Archer_attack","img/classes/archer_attack.png",64,64),this.game.load.spritesheet("Archer_sleep","img/classes/archer_sleep.png",32,32),this.game.load.spritesheet("Archer_dead","img/classes/archer_dead.png",32,32),this.game.load.spritesheet("Mage","img/classes/mage_walk.png",32,32),this.game.load.spritesheet("Mage_attack","img/classes/mage_attack.png",64,64),this.game.load.spritesheet("Mage_sleep","img/classes/mage_sleep.png",32,32),this.game.load.spritesheet("Mage_dead","img/classes/mage_dead.png",32,32),this.game.load.tilemap("forest_dummy","tiles/forest_dummy.json",null,Phaser.Tilemap.TILED_JSON),this.game.load.image("sprites_background_32x32","tiles/sprites_background_32x32.png")}},{key:"create",value:function(){this.game.state.start("Game")}},{key:"setLoader",value:function(){this.loadingStyle={font:"18px Helvetica",fill:"#fff"},this.loading=this.game.add.text(this.game.world.centerX,this.game.world.centerY,"Loading...",this.loadingStyle),this.loading.anchor.setTo(.5)}}]),t}(Phaser.State);a["default"]=o},{}],10:[function(e,t,a){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(a,"__esModule",{value:!0});var o=function(){function e(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,a,r){return a&&e(t.prototype,a),r&&e(t,r),t}}(),l=e("config"),c=r(l),u=e("../game/Character"),h=r(u),d=e("../core/Utils"),f=r(d),g=function(e){function t(){return n(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return s(t,e),o(t,[{key:"create",value:function(){this.utils=new f["default"],this.game.time.advancedTiming=!0,this.game.stage.backgroundColor="#333",this.map=this.game.add.tilemap("forest_dummy");var e=this.map.widthInPixels,t=this.map.heightInPixels;this.game.world.setBounds(0,0,e,t),this.map.addTilesetImage("sprites_background_32x32","sprites_background_32x32"),this.groundLayer=this.map.createLayer("Ground"),this.treesLayer=this.map.createLayer("Trees"),this.objectsLayer=this.map.createLayer("Objects"),this.groundLayer.resizeWorld(),this.getCharacterInfo()}},{key:"update",value:function(){}},{key:"render",value:function(){this.game.debug.text(this.game.time.fps||"--",10,20,"#fff")}},{key:"getCharacterInfo",value:function(){var e=this,t=localStorage.getItem("NWarriorCharID"),a=c["default"].apiURL+"characters/"+t,r={};r.token=localStorage.getItem("NWarriorToken"),$.ajax({type:"get",url:a,data:r,success:function(t){t.characterClass=e.utils.formatClass(t.characterClass),e.player=new h["default"](e.game,t)}})}}]),t}(Phaser.State);a["default"]=g},{"../core/Utils":5,"../game/Character":6,config:1}],11:[function(e,t,a){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(a,"__esModule",{value:!0});var n=e("./Boot");Object.defineProperty(a,"Boot",{enumerable:!0,get:function(){return r(n)["default"]}});var i=e("./Game");Object.defineProperty(a,"Game",{enumerable:!0,get:function(){return r(i)["default"]}})},{"./Boot":9,"./Game":10}]},{},[8]);