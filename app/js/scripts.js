!function e(t,a,i){function r(n,s){if(!a[n]){if(!t[n]){var l="function"==typeof require&&require;if(!s&&l)return l(n,!0);if(o)return o(n,!0);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}var u=a[n]={exports:{}};t[n][0].call(u.exports,function(e){var a=t[n][1][e];return r(a?a:e)},u,u.exports,e,t,a,i)}return a[n].exports}for(var o="function"==typeof require&&require,n=0;n<i.length;n++)r(i[n]);return r}({1:[function(e,t,a){t.exports={apiURL:"http://test.namelesswarrior.com:8080/"}},{}],2:[function(e,t,a){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(a,"__esModule",{value:!0});var r=function(){function e(e,t){for(var a=0;a<t.length;a++){var i=t[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,a,i){return a&&e(t.prototype,a),i&&e(t,i),t}}(),o=function(){function e(t,a){i(this,e),this.trigger=t,this.target=a,this.bindEvents()}return r(e,[{key:"bindEvents",value:function(){var e=this,t=$(this.trigger),a=$(".overlay");t.each(function(){var t=$(this).data("target"),i=$(t),r=i.find(".formbox__close");r.click(function(e){e.preventDefault(),a.addClass("hide"),i.removeClass("active")}),a.click(function(){a.addClass("hide"),i.removeClass("active")}),$(this).click(function(t){t.preventDefault(),e.closeAll(),a.removeClass("hide"),i.addClass("active")})})}},{key:"closeAll",value:function(){var e=$(".formbox");e.each(function(){$(this).removeClass("active")}),$(".overlay").addClass("hide")}}]),e}();a["default"]=o},{}],3:[function(e,t,a){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i={PLAYER:"player",NPC:"NPC",ENEMY:"enemy",SWORDSMAN:"SwordsMan",MAGE:"Mage",ARCHER:"Archer",ENEMIES:{SLIME:"Slime",MUSHROOM:"Mushroom"},MAPS:{FOREST_TOP_LEFT:"forest_top_left",FOREST_MIDDLE_LEFT:"forest_middle_left",FOREST_BOTTOM_LEFT:"forest_bottom_left"},DIRECTIONS:{TOP:"top",BOTTOM:"bottom",LEFT:"left",RIGHT:"right"}};a["default"]=i},{}],4:[function(e,t,a){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(a,"__esModule",{value:!0});var o=function(){function e(e,t){for(var a=0;a<t.length;a++){var i=t[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,a,i){return a&&e(t.prototype,a),i&&e(t,i),t}}(),n=e("config"),s=i(n),l=e("./Utils"),c=i(l),u=e("./Boxes"),h=i(u),d=e("../game/StartGame"),f=i(d),p=function(){function e(){r(this,e),this.boxes=new h["default"](".open-formbox",".formbox"),this.formsSelector=".form",this.menuNotLogged=$(".menu--not-logged"),this.loggedMenu=$(".menu--logged"),this.notLoggedText=$(".not-logged--text"),this.loggedText=$(".logged--text"),this.loggedInfo=$(".logged--info"),$(".tooltip").tooltipster({contentAsHTML:!0}),this.bindEvents(),this.checkLogin()}return o(e,[{key:"bindEvents",value:function(){var e=this,t=$(this.formsSelector);t.each(function(){var t=$(this),a=t.data("target"),i=t.find(".formbox__result");t.submit(function(r){var o=c["default"].serializeObject($(this));r.preventDefault(),e.validation(a,t,i)||(e.ajaxPOST(a,i,o),e.cleanForms(t,a,i))})}),$(".logout").click(function(){e.logout()}),$(".character__wrapper").on("click",".character",function(t){var a=$(this).data("character-id");localStorage.setItem("NWarriorCharID",a),e.boxes.closeAll(),$(".content").addClass("hide"),$(".game__wrapper").removeClass("hide"),new f["default"]})}},{key:"validation",value:function(e,t,a){var i=!1;switch(e){case"users":var r=t.find("[name=signupPassword]").val(),o=t.find("[name=signupRepeatPassword]").val();r!=o&&(a.html("The passwords must be equal!"),i=!0);break;case"characters":var n=t.find(".remaining-stats").html(),s=t.find('[name="characterClass"]').val();""===s?(a.html("You must select a character class!"),i=!0):0!=n&&(a.html("You must distribute all attributes!"),i=!0)}return i}},{key:"cleanForms",value:function(e,t){switch(e.find("input[type=text]:not([readonly])").val(""),t){case"characters":e.find(".stats__input").val(5),e.find(".stats__counter").val(10)}}},{key:"ajaxPOST",value:function(e,t,a){var i=this,r=$(".loader"),o=s["default"].apiURL+e;r.addClass("active"),a.token=localStorage.getItem("NWarriorToken"),$.ajax({type:"POST",url:o,data:a,success:function(a){if(r.removeClass("active"),a.failedAuth)return i.logout();switch(e){case"users":i.handleSignUp(a,t);break;case"users/login":i.handleLogin(a,t);break;case"characters":i.handleCharacterCreation(a,t)}},error:function(e,t,a){403==t&&i.logout()}})}},{key:"handleSignUp",value:function(e,t){var a=this;t.html(e.message),e.created&&setTimeout(function(){a.boxes.closeAll(),$('[data-target="#formbox-login"]').click()},500)}},{key:"handleLogin",value:function(e,t){var a=this;t.html(e.message),e.logged&&(setTimeout(function(){a.boxes.closeAll()},500),this.saveSession(e),this.checkLogin())}},{key:"saveSession",value:function(e){localStorage.setItem("NWarriorUserID",e.userId),localStorage.setItem("NWarriorEmail",e.email),localStorage.setItem("NWarriorToken",e.token)}},{key:"checkLogin",value:function(){localStorage.getItem("NWarriorToken")?(this.loggedInfo.find("span").html(localStorage.getItem("NWarriorEmail")),this.loggedMenu.removeClass("hide"),this.loggedText.removeClass("hide"),this.loggedInfo.removeClass("hide"),this.menuNotLogged.addClass("hide"),this.notLoggedText.addClass("hide"),this.setupCharacterCreation(),this.updateCharacterList()):(this.loggedMenu.addClass("hide"),this.loggedText.addClass("hide"),this.loggedInfo.addClass("hide"),this.menuNotLogged.removeClass("hide"),this.notLoggedText.removeClass("hide"))}},{key:"setupCharacterCreation",value:function(){var e=$('[name="form_create"]'),t=e.find('[name="characterClass"]'),a=e.find(".stats__group"),i=e.find(".remaining-stats");$(".formbox__group__character").on("click",function(e){var a=$(e.currentTarget),i=a.data("characterClass");$(".formbox__group__character").removeClass("active"),a.addClass("active"),t.val(i)}),a.each(function(){var e=$(this),t=e.find(".stats__btn--plus"),a=e.find(".stats__btn--minus"),r=e.find(".stats__input");t.click(function(e){e.preventDefault();var t=i.html(),a=r.val();t>0&&(a++,r.val(a),t--,i.html(t))}),a.click(function(e){e.preventDefault();var t=i.html(),a=r.val();t<10&&a>5&&(a--,r.val(a),t++,i.html(t))})}),$("[name=userId]").val(localStorage.getItem("NWarriorUserID"))}},{key:"handleCharacterCreation",value:function(e,t){var a=this;t.html(e.message),setTimeout(function(){a.boxes.closeAll(),$('[data-target="#formbox-select"]').click(),t.html(""),$("[name=characterClass]").val(""),$(".create__img img").attr("src","")},500),this.updateCharacterList()}},{key:"updateCharacterList",value:function(){var e=this,t=$(".loader"),a=localStorage.getItem("NWarriorUserID"),i=s["default"].apiURL+"characters/byUser/"+a,r=$(".character__wrapper");t.addClass("active"),$(".character__wrapper > *").remove(),c["default"].getTemplate("characterSelection",function(a){var o=a,n={};n.token=localStorage.getItem("NWarriorToken"),$.ajax({url:i,type:"get",data:n,success:function(e){if(t.removeClass("active"),e.length)for(var a in e){var i=e[a],n=o;n=n.replace("{CharacterClass}",c["default"].formatClass(i.characterClass)),n=n.replace("{Strength}",i.strength),n=n.replace("{Constitution}",i.constitution),n=n.replace("{Dexterity}",i.dexterity),n=n.replace("{Intelligence}",i.intelligence),n=n.replace("{Charisma}",i.charisma),n=n.replace("{ClassImg}",i.characterClass),r.append('<div class="character" data-character-id="'+i._id+'">'+n+"</div>")}else r.append('<p>No characters found! Press "New Character" to create your first!</p>')},error:function(t,a,i){e.logout()}})})}},{key:"logout",value:function(){localStorage.clear(),location.reload()}}]),e}();a["default"]=p},{"../game/StartGame":9,"./Boxes":2,"./Utils":5,config:1}],5:[function(e,t,a){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(a,"__esModule",{value:!0});var o=function(){function e(e,t){for(var a=0;a<t.length;a++){var i=t[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,a,i){return a&&e(t.prototype,a),i&&e(t,i),t}}(),n=e("../core/Globals"),s=i(n),l=function(){function e(){r(this,e)}return o(e,null,[{key:"formatClass",value:function(e){var t=void 0;switch(e){case 1:t=s["default"].SWORDSMAN;break;case 2:t=s["default"].MAGE;break;case 3:t=s["default"].ARCHER}return t}},{key:"getTemplate",value:function(e,t){$.get("templates/"+e+".html",function(e){t(e)})}},{key:"serializeObject",value:function(e){var t={},a=e.serializeArray();return $.each(a,function(){t[this.name]?(t[this.name].push||(t[this.name]=[t[this.name]]),t[this.name].push(this.value||"")):t[this.name]=this.value||""}),t}}]),e}();a["default"]=l},{"../core/Globals":3}],6:[function(e,t,a){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function n(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(a,"__esModule",{value:!0});var s=function(){function e(e,t){for(var a=0;a<t.length;a++){var i=t[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,a,i){return a&&e(t.prototype,a),i&&e(t,i),t}}(),l=e("../core/Globals"),c=i(l),u=e("config"),h=(i(u),function(e){function t(e,a){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:c["default"].PLAYER,n=arguments[3],s=arguments[4];r(this,t);var l=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n,s,a.characterClass));return l.anchor.setTo(.5,.5),l.type=i,l.setCharacterInfo(a),l.type===c["default"].PLAYER&&l.bind(),l}return n(t,e),s(t,[{key:"setCharacterInfo",value:function(e){this.characterClass=e.characterClass,this.str=e.strength,this.con=e.constitution,this.dex=e.dexterity,this["int"]=e.intelligence,this.cha=e.charisma,this.HP=e.health,this.currentHP=e.currentHealth,this.MP=e.mana,this.currentMP=e.currentMana,this.frame=0,this.speed=225,this.alive=!0,this.create()}},{key:"bind",value:function(){var e=this;$(window).on("keydown",function(t){var a=t.key;"a"!==a&&"A"!==a||e.attacking||e.attack()}),this.setupAttackEndCallback()}},{key:"create",value:function(){this.game.add.existing(this),this.game.physics.arcade.enable(this),this.body.collideWorldBounds=!0,this.type===c["default"].PLAYER&&this.game.camera.follow(this),this.setupAnimations(),this.type===c["default"].ENEMY&&(this.body.immovable=!0,this.randomWalk())}},{key:"update",value:function(){this.type===c["default"].PLAYER&&(this.handleWalking(),this.updateBars()),this.type===c["default"].ENEMY&&this.playerNear}},{key:"updateBars",value:function(){var e=($(".bar--health .bar__value"),$(".bar--health .bar__text span")),t=($(".bar--mana .bar__value"),$(".bar--mana .bar__text span"));e.html(this.currentHP+"/"+this.HP),t.html(this.currentMP+"/"+this.MP)}},{key:"handleWalking",value:function(){var e=this.speed,t=void 0;t=this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)?"left":this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)?"right":this.game.input.keyboard.isDown(Phaser.Keyboard.UP)?"up":this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)?"down":"stop",this.attacking?(this.body.velocity.x=0,this.body.velocity.y=0):this.walk(t,e)}},{key:"setupAnimations",value:function(){this.type===c["default"].PLAYER?(this.animations.add("dead",[0,1,2],3,!0),this.animations.add("down",[0,1,2],10,!1),this.animations.add("right",[3,4,5],10,!1),this.animations.add("up",[6,7,8],10,!1),this.animations.add("left",[9,10,11],10,!1)):this.type===c["default"].ENEMY&&(this.animations.add("down",[1,2,3],10,!0),this.animations.add("right",[4,5,6],10,!0),this.animations.add("up",[7,8,9],10,!0),this.animations.add("left",[10,11,12],10,!0))}},{key:"walk",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:50;switch(e){case"down":this.lastFrame=0,this.body.velocity.y=t,this.body.velocity.x=0;break;case"right":this.lastFrame=3,this.body.velocity.y=0,this.body.velocity.x=t;break;case"up":this.lastFrame=6,this.body.velocity.y=-t,this.body.velocity.x=0;break;case"left":this.lastFrame=9,this.body.velocity.x=-t,this.body.velocity.y=0;break;case"stop":this.attacking||(this.body.velocity.x=0,this.body.velocity.y=0,this.frame=this.lastFrame,this.animations.stop())}this.animations.play(e)}},{key:"attack",value:function(){var e=this.lastFrame||0,t=this.getDirection(e),a=this.characterClass+"_attack";this.loadTexture(a),this.anchor.setTo(.5,.5),this.body.width=64,this.body.height=64,this.game.camera.follow(null),this.attacking=!0,this.animations.play(t)}},{key:"getDirection",value:function(e){switch(e){case 0:return"down";case 3:return"right";case 6:return"up";case 9:return"left"}}},{key:"setupDeadAnimation",value:function(){var e=this.characterClass+"_dead";this.loadTexture(e),this.anchor.setTo(.5,.5),this.body.width=64,this.body.height=64,this.animations.play("dead")}},{key:"randomWalk",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:100;this.randomWalkInterval=setInterval(function(){var a=Math.floor(5*Math.random())+1;if(e.playerNear&&e.findPlayer(),!e.receivingAttack&&!e.playerNear&&e.alive)switch(a){case 1:e.walk("down",t);break;case 2:e.walk("up",t);break;case 3:e.walk("left",t);break;case 4:e.walk("right",t);break;case 5:e.walk("stop",t)}},800)}},{key:"findPlayer",value:function(){}},{key:"setupAttackEndCallback",value:function(){var e=this;for(var t in this.animations._anims){var a=this.animations._anims[t];a.onComplete.add(function(){e.attacking&&(e.loadTexture(e.characterClass),e.anchor.setTo(.5,.5),e.body.width=32,e.body.height=32,e.game.camera.follow(e),e.attacking=!1)},this)}}},{key:"stepBack",value:function(e){var t=this;switch(this.body.velocity.x=0,this.body.velocity.y=0,e){case"up":this.body.velocity.y=-250;break;case"down":this.body.velocity.y=250;break;case"left":this.body.velocity.x=-250;break;case"right":this.body.velocity.x=250}this.animations.stop(),setTimeout(function(){t.body.velocity.x=0,t.body.velocity.y=0},500)}},{key:"receiveAttack",value:function(e){var t=this,a=e.lastFrame||0,i=this.getDirection(a);this.receivingAttack||(this.receivingAttack=!0,this.currentHP=this.currentHP-2*e.str,this.currentHP<=0?(this.alive=!1,this.type===c["default"].ENEMY?(clearInterval(this.randomWalkInterval),this.body.velocity.x=0,this.body.velocity.y=0):this.type===c["default"].PLAYER&&this.setupDeadAnimation()):this.stepBack(i),setTimeout(function(){t.receivingAttack=!1},300))}},{key:"checkPlayerPosition",value:function(e){var t=e.body.x,a=e.body.y,i=100;(this.body.x<=t-i||this.body.x<=t+i)&&(this.body.y<=a-i||this.body.y<=a+i)?this.playerNear=!0:this.playerNear=!1}}]),t}(Phaser.Sprite));a["default"]=h},{"../core/Globals":3,config:1}],7:[function(e,t,a){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(a,"__esModule",{value:!0});var r=function(){function e(e,t){for(var a=0;a<t.length;a++){var i=t[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,a,i){return a&&e(t.prototype,a),i&&e(t,i),t}}(),o=function(){function e(t,a){i(this,e),this.data=t,this.cb=a,this.$dialogWrapper=$(".dialog__wrapper"),this.$dialogText=this.$dialogWrapper.find(".dialog__text"),this.actualLine=1,this.numberOfLines=this.data.lines.length,this.setup(),this.bind()}return r(e,[{key:"setup",value:function(){this.$dialogText.html(this.data.lines[0]),this.$dialogWrapper.removeClass("hide")}},{key:"bind",value:function(){var e=this;this.event=$(document).on("keydown",function(t){var a=t.key;e.actualLine===e.numberOfLines&&e.event.unbind(),"Enter"===a&&e.nextLine()})}},{key:"nextLine",value:function(){this.actualLine===this.numberOfLines?(this.$dialogWrapper.addClass("hide"),this.cb()):(this.actualLine++,this.$dialogText.html(this.data.lines[this.actualLine-1]))}}]),e}();a["default"]=o},{}],8:[function(e,t,a){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(a,"__esModule",{value:!0});var o=function(){function e(e,t){for(var a=0;a<t.length;a++){var i=t[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,a,i){return a&&e(t.prototype,a),i&&e(t,i),t}}(),n=e("../core/Globals"),s=(i(n),e("config")),l=(i(s),e("../core/Utils")),c=(i(l),function(){function e(t,a){r(this,e),this.options=a,this.game=t,this.map=this.game.add.tilemap(this.options.map);var i=this.map.widthInPixels,o=this.map.heightInPixels;this.game.world.setBounds(0,0,i,o),this.map.addTilesetImage("sprites_background_v2_32x32","sprites_background_v2_32x32"),this.groundLayer=this.map.createLayer("Ground"),this.groundOverlapLayer=this.map.createLayer("Ground_overlap"),this.collideLayer=this.map.createLayer("Collide"),this.groundLayer.resizeWorld(),this.groundOverlapLayer.resizeWorld(),this.collideLayer.resizeWorld(),this.map.currentLayer=3,this.map.setCollisionBetween(1,1e4,!0,this.collideLayer)}return o(e,[{key:"renderLastLayer",value:function(){this.passLayer=this.map.createLayer("Pass"),this.passLayer.resizeWorld()}},{key:"addMapTransition",value:function(e,t,a,i,r){this.map.setTileLocationCallback(e,t,a,i,r,this,this.groundLayer)}}]),e}());a["default"]=c},{"../core/Globals":3,"../core/Utils":5,config:1}],9:[function(e,t,a){"use strict";function i(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a]);return t["default"]=e,t}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(a,"__esModule",{value:!0});var o=function(){function e(e,t){for(var a=0;a<t.length;a++){var i=t[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,a,i){return a&&e(t.prototype,a),i&&e(t,i),t}}(),n=e("../states"),s=i(n),l=function(){function e(){var t=this;r(this,e);var a={w:980,h:470};localStorage.getItem("NWarriorToken")||window.location.assign("/"),this.game=new Phaser.Game(a.w,a.h,Phaser.AUTO,"phaser"),Object.keys(s).forEach(function(e){return t.game.state.add(e,s[e])}),this.game.state.start("Boot"),this.uiStyle()}return o(e,[{key:"uiStyle",value:function(){$(".ui-style").each(function(){$(this).append('<div class="ui-style__left-border"></div><div class="ui-style__right-border"></div><div class="ui-style__top-border"></div><div class="ui-style__bottom-border"></div><div class="ui-style__top-left-corner"></div><div class="ui-style__top-right-corner"></div><div class="ui-style__bottom-left-corner"></div><div class="ui-style__bottom-right-corner"></div>')})}}]),e}();a["default"]=l},{"../states":15}],10:[function(e,t,a){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var o=e("core/Home"),n=i(o),s=function l(){r(this,l),new n["default"]};$(document).ready(function(){new s})},{"core/Home":4}],11:[function(e,t,a){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function n(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(a,"__esModule",{value:!0});var s=function(){function e(e,t){for(var a=0;a<t.length;a++){var i=t[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,a,i){return a&&e(t.prototype,a),i&&e(t,i),t}}(),l=e("../core/Globals"),c=i(l),u=e("../core/Utils"),h=i(u),d=e("config"),f=i(d),p=function(e){function t(){return r(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return n(t,e),s(t,[{key:"preload",value:function(){this.setLoader(),this.game.load.spritesheet("SwordsMan","img/classes/swordman_walk.png",32,32),this.game.load.spritesheet("SwordsMan_attack","img/classes/swordman_attack.png",64,64),this.game.load.spritesheet("SwordsMan_sleep","img/classes/swordman_sleep.png",64,64),this.game.load.spritesheet("SwordsMan_dead","img/classes/swordman_dead.png",64,64),this.game.load.spritesheet("Archer","img/classes/archer_walk.png",32,32),this.game.load.spritesheet("Archer_attack","img/classes/archer_attack.png",64,64),this.game.load.spritesheet("Archer_sleep","img/classes/archer_sleep.png",64,64),this.game.load.spritesheet("Archer_dead","img/classes/archer_dead.png",64,64),this.game.load.spritesheet("Mage","img/classes/mage_walk.png",32,32),this.game.load.spritesheet("Mage_attack","img/classes/mage_attack.png",64,64),this.game.load.spritesheet("Mage_sleep","img/classes/mage_sleep.png",64,64),this.game.load.spritesheet("Mage_dead","img/classes/mage_dead.png",64,64),this.game.load.spritesheet(c["default"].ENEMIES.SLIME,"img/enemies/slime.png",32,32),this.game.load.spritesheet(c["default"].ENEMIES.MUSHROOM,"img/enemies/mushroom.png",32,32),this.game.load.tilemap(c["default"].MAPS.FOREST_TOP_LEFT,"tiles/forest_top_left.json",null,Phaser.Tilemap.TILED_JSON),this.game.load.tilemap(c["default"].MAPS.FOREST_MIDDLE_LEFT,"tiles/forest_middle_left.json",null,Phaser.Tilemap.TILED_JSON),this.game.load.tilemap(c["default"].MAPS.FOREST_BOTTOM_LEFT,"tiles/forest_bottom_left.json",null,Phaser.Tilemap.TILED_JSON),this.game.load.image("sprites_background_v2_32x32","tiles/sprites_background_v2_32x32.png")}},{key:"create",value:function(){this.getCharacterInfo()}},{key:"setLoader",value:function(){this.loadingStyle={font:"18px FreePixel",fill:"#fff"},this.loading=this.game.add.text(this.game.world.centerX,this.game.world.centerY,"Loading...",this.loadingStyle),this.loading.anchor.setTo(.5)}},{key:"getCharacterInfo",value:function(){var e=this,t=localStorage.getItem("NWarriorCharID"),a=f["default"].apiURL+"characters/"+t,i={};i.token=localStorage.getItem("NWarriorToken"),$.ajax({type:"get",url:a,data:i,success:function(t){t.characterClass=h["default"].formatClass(t.characterClass),t.lastXPosition=300,t.lastYPosition=300;var a={characterData:t,previousMap:!1,map:c["default"].MAPS.FOREST_TOP_LEFT};e.game.state.start("ForestTopLeft",!0,!1,a)}})}}]),t}(Phaser.State);a["default"]=p},{"../core/Globals":3,"../core/Utils":5,config:1}],12:[function(e,t,a){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function n(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(a,"__esModule",{value:!0});var s=function(){function e(e,t){for(var a=0;a<t.length;a++){var i=t[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,a,i){return a&&e(t.prototype,a),i&&e(t,i),t}}(),l=function p(e,t,a){null===e&&(e=Function.prototype);var i=Object.getOwnPropertyDescriptor(e,t);if(void 0===i){var r=Object.getPrototypeOf(e);return null===r?void 0:p(r,t,a)}if("value"in i)return i.value;var o=i.get;if(void 0!==o)return o.call(a)},c=e("../core/Globals"),u=i(c),h=e("./MapState"),d=i(h),f=function(e){function t(){return r(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return n(t,e),s(t,[{key:"getPlayerPosition",value:function(){if(!this.options.previousMap)return l(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"getPlayerPosition",this).call(this);switch(this.options.previousMap){case u["default"].MAPS.FOREST_TOP_LEFT:return{x:750,y:0}}}},{key:"addMapTransitions",value:function(){var e=this;l(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"addMapTransitions",this).call(this),this.map.addMapTransition(21,0,3,1,function(){e.shouldChangeMap&&(e.willChangeMap||!function(){e.willChangeMap=!0;var t={characterData:e.options.characterData,previousMap:u["default"].MAPS.FOREST_MIDDLE_LEFT,map:u["default"].MAPS.FOREST_TOP_LEFT,enterPosition:u["default"].DIRECTIONS.BOTTOM};setTimeout(function(){e.game.state.start("ForestTopLeft",!0,!1,t)},100)}())},this)}}]),t}(d["default"]);a["default"]=f},{"../core/Globals":3,"./MapState":14}],13:[function(e,t,a){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function n(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(a,"__esModule",{value:!0});var s=function(){function e(e,t){for(var a=0;a<t.length;a++){var i=t[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,a,i){return a&&e(t.prototype,a),i&&e(t,i),t}}(),l=function g(e,t,a){null===e&&(e=Function.prototype);var i=Object.getOwnPropertyDescriptor(e,t);if(void 0===i){var r=Object.getPrototypeOf(e);return null===r?void 0:g(r,t,a)}if("value"in i)return i.value;var o=i.get;if(void 0!==o)return o.call(a)},c=e("../core/Globals"),u=i(c),h=e("./MapState"),d=i(h),f=e("../game/Dialog"),p=i(f),y=function(e){function t(){return r(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return n(t,e),s(t,[{key:"create",value:function(){var e=this;l(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"create",this).call(this),this.welcomeDone||(this.welcome=new p["default"]({lines:["Welcome to Nameless Warrior! (Press ENTER to advance)","Use the Arrow Keys to move your character! (Press ENTER to advance)",'Use the "A" key to attack your enemies (Press ENTER to advance)']},function(){e.welcomeDone=!0}))}},{key:"getPlayerPosition",value:function(){if(!this.options.previousMap)return l(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"getPlayerPosition",this).call(this);switch(this.options.previousMap){case u["default"].MAPS.FOREST_MIDDLE_LEFT:return{x:760,y:1248}}}},{key:"addMapTransitions",value:function(){var e=this;l(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"addMapTransitions",this).call(this),this.map.addMapTransition(21,39,3,1,function(){e.shouldChangeMap&&(e.willChangeMap||!function(){e.willChangeMap=!0;var t={characterData:e.options.characterData,previousMap:u["default"].MAPS.FOREST_TOP_LEFT,map:u["default"].MAPS.FOREST_MIDDLE_LEFT,enterPosition:u["default"].DIRECTIONS.TOP};setTimeout(function(){e.game.state.start("ForestMiddleLeft",!0,!1,t)},100)}())},this)}}]),t}(d["default"]);a["default"]=y},{"../core/Globals":3,"../game/Dialog":7,"./MapState":14}],14:[function(e,t,a){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function n(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(a,"__esModule",{value:!0});var s=function(){function e(e,t){for(var a=0;a<t.length;a++){var i=t[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,a,i){return a&&e(t.prototype,a),i&&e(t,i),t}}(),l=e("../core/Globals"),c=i(l),u=e("config"),h=(i(u),e("../game/Character")),d=i(h),f=e("../game/Map"),p=i(f),y=function(e){function t(){return r(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return n(t,e),s(t,[{key:"init",value:function(e){this.options=e,this.options.previousMap?this.shouldChangeMap=!1:this.shouldChangeMap=!0,this.playerPositionThreshold=36,this.playerPosition=this.getPlayerPosition(),this.playerFirstPosition=this.playerPosition}},{key:"create",value:function(){this.debug=!1,this.game.time.advancedTiming=!0,this.map=new p["default"](this.game,{map:this.options.map}),this.player=new d["default"](this.game,this.options.characterData,c["default"].PLAYER,this.playerPosition.x,this.playerPosition.y),this.enemies=[],this.enemies.push(new d["default"](this.game,{characterClass:c["default"].ENEMIES.SLIME,health:70,currentHealth:70},c["default"].ENEMY,450,450)),this.enemies.push(new d["default"](this.game,{characterClass:c["default"].ENEMIES.MUSHROOM,health:70,currentHealth:70},c["default"].ENEMY,150,150)),this.map.renderLastLayer(),this.addMapTransitions(),this.bind()}},{key:"update",value:function(){if(this.game.physics.arcade.collide(this.player,this.enemies,this.collisionHandler),this.options.previousMap&&this.checkShouldChangeMap(),this.player&&(this.game.physics.arcade.collide(this.player,this.map.collideLayer),this.game.physics.arcade.collide(this.player,this.map.groundLayer)),this.enemies)for(var e in this.enemies)this.enemies[e].alive&&(this.game.physics.arcade.collide(this.enemies[e],this.map.collideLayer),this.enemies[e].checkPlayerPosition(this.player))}},{key:"render",value:function(){if(this.debug&&(this.game.debug.text(this.game.time.fps||"--",10,20,"#fff"),this.player&&this.debug&&(this.game.debug.bodyInfo(this.player,32,32),this.game.debug.body(this.player)),this.enemies&&this.debug))for(var e in this.enemies){var t=this.enemies[e];this.game.debug.body(t)}}},{key:"getPlayerPosition",value:function(){return{x:this.options.characterData.lastXPosition,y:this.options.characterData.lastYPosition}}},{key:"collisionHandler",value:function(e,t){e.attacking&&t.receiveAttack(e)}},{key:"bind",value:function(){var e=this;$("[name=debug-mode]").change(function(t){var a=$(t.currentTarget);a.is(":checked")?e.debug=!0:e.debug=!1})}},{key:"checkShouldChangeMap",value:function(){var e={x:this.player.body.x,y:this.player.body.y};switch(this.options.enterPosition){case c["default"].DIRECTIONS.TOP:
this.playerFirstPosition.y+this.playerPositionThreshold<=e.y&&(this.shouldChangeMap=!0);break;case c["default"].DIRECTIONS.BOTTOM:this.playerFirstPosition.y-this.playerPositionThreshold>=e.y&&(this.shouldChangeMap=!0);break;case c["default"].DIRECTIONS.LEFT:this.playerFirstPosition.x+this.playerPositionThreshold<=e.x&&(this.shouldChangeMap=!0);break;case c["default"].DIRECTIONS.RIGHT:this.playerFirstPosition.x+this.playerPositionThreshold>=e.x&&(this.shouldChangeMap=!0)}}},{key:"addMapTransitions",value:function(){this.willChangeMap=!1}}]),t}(Phaser.State);a["default"]=y},{"../core/Globals":3,"../game/Character":6,"../game/Map":8,config:1}],15:[function(e,t,a){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(a,"__esModule",{value:!0});var r=e("./Boot");Object.defineProperty(a,"Boot",{enumerable:!0,get:function(){return i(r)["default"]}});var o=e("./ForestTopLeft");Object.defineProperty(a,"ForestTopLeft",{enumerable:!0,get:function(){return i(o)["default"]}});var n=e("./ForestMiddleLeft");Object.defineProperty(a,"ForestMiddleLeft",{enumerable:!0,get:function(){return i(n)["default"]}})},{"./Boot":11,"./ForestMiddleLeft":12,"./ForestTopLeft":13}]},{},[10]);