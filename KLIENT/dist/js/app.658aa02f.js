(function(t){function e(e){for(var r,a,u=e[0],s=e[1],l=e[2],f=0,d=[];f<u.length;f++)a=u[f],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&d.push(o[a][0]),o[a]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(t[r]=s[r]);c&&c(e);while(d.length)d.shift()();return i.push.apply(i,l||[]),n()}function n(){for(var t,e=0;e<i.length;e++){for(var n=i[e],r=!0,u=1;u<n.length;u++){var s=n[u];0!==o[s]&&(r=!1)}r&&(i.splice(e--,1),t=a(a.s=n[0]))}return t}var r={},o={app:0},i=[];function a(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=t,a.c=r,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)a.d(n,r,function(e){return t[e]}.bind(null,r));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="/";var u=window["webpackJsonp"]=window["webpackJsonp"]||[],s=u.push.bind(u);u.push=e,u=u.slice();for(var l=0;l<u.length;l++)e(u[l]);var c=s;i.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";n("85ec")},"055b":function(t,e,n){},"0b24":function(t,e,n){},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("div",{attrs:{id:"leftBox"}},[n("div",{staticClass:"albums"},t._l(t.getAllDirs,(function(e){return n("albums",{key:e,attrs:{item:e},nativeOn:{click:function(n){return t.loadAlbum(e)}}})})),1)]),n("div",{attrs:{id:"middleBox"}},[n("table",t._l(t.getAllFiles,(function(e){return n("listOfSongs",{key:e,attrs:{album:t.getActualDir,item:e.file,size:e.size}})})),1),n("audio",{attrs:{id:"audio",controls:""}},[n("source",{attrs:{src:t.nowPlayed,id:"audio_src",type:"audio/mp3"}})])])])},i=[],a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("tr",[n("th",[t._v(t._s(t.album))]),n("th",[t._v(t._s(t.item))]),n("th",[t._v(t._s(t.createSize(t.size)))]),n("th",[n("button",{on:{click:function(e){return t.loadSong(t.item)}}},[t._v("PLAY")])])])},u=[],s=(n("a9e3"),n("b680"),{name:"listOfSongs",props:{item:String,size:Number,album:String},methods:{createSize:function(t){return(t/1048576).toFixed(2)+" MB"},loadSong:function(t){this.$store.dispatch("playSong",t)}},computed:{getActualDir:function(){return this.$store.getters.getActualDir}}}),l=s,c=(n("6ae2"),n("2877")),f=Object(c["a"])(l,a,u,!1,null,null,null),d=f.exports,p=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("img",{attrs:{src:"/albums/"+t.item+"/icon/icon.jpg",alt:"Error While loading"}})},m=[],g={name:"albums",props:{item:String}},b=g,h=(n("a9da"),Object(c["a"])(b,p,m,!1,null,null,null)),v=h.exports,y={name:"App",components:{listOfSongs:d,albums:v},mounted:function(){},computed:{getActualDir:function(){return this.$store.getters.getActualDir},getAllDirs:function(){return this.$store.getters.getAllDirs},getAllFiles:function(){return this.$store.getters.getAllFiles}},methods:{loadAlbum:function(t){this.$store.dispatch("loadAlbum",t)}},created:function(){this.$store.dispatch("readFirstTime"),console.log("Zapytanie przy ładowaniu strony")}},A=y,S=(n("034f"),Object(c["a"])(A,o,i,!1,null,null,null)),O=S.exports,_=n("1da1"),w=(n("96cf"),n("d3b7"),n("159b"),n("2f62"));r["a"].use(w["a"]);var x=new w["a"].Store({state:{dirs:[],actualDir:"",files:[],actualPlay:""},getters:{getActualDir:function(t){return t.actualDir},getAllDirs:function(t){return t.dirs},getAllFiles:function(t){return t.files}},actions:{playSong:function(t,e){t.actualPlay=e,document.getElementById("audio_src").src="./static/albums/"+this.state.actualDir+"/"+t.actualPlay,document.getElementById("audio").load(),document.getElementById("audio").play()},readFirstTime:function(t){var e=this;return Object(_["a"])(regeneratorRuntime.mark((function n(){var r,o,i,a;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,console.log(e.state.href+"/"),r={"Contet-Type":"application/json"},o=JSON.stringify({firstLoad:!0,album:""}),n.next=6,fetch("/",{method:"POST",body:o,headers:r});case 6:return i=n.sent,n.next=9,i.json();case 9:a=n.sent,t.commit("setCurrentSongListAndAlbums",a),n.next=16;break;case 13:n.prev=13,n.t0=n["catch"](0),console.log(n.t0);case 16:case"end":return n.stop()}}),n,null,[[0,13]])})))()},loadAlbum:function(t,e){return Object(_["a"])(regeneratorRuntime.mark((function n(){var r,o,i,a;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,console.log(e),r={"Contet-Type":"application/json"},o=JSON.stringify({firstLoad:!1,album:e}),n.next=6,fetch("/loadAlbum",{method:"POST",body:o,headers:r});case 6:return i=n.sent,n.next=9,i.json();case 9:a=n.sent,t.commit("setCurrentSongListAndAlbums",a),n.next=16;break;case 13:n.prev=13,n.t0=n["catch"](0),console.log(n.t0);case 16:case"end":return n.stop()}}),n,null,[[0,13]])})))()}},mutations:{setCurrentSongListAndAlbums:function(t,e){t.dirs=[],t.files=[],t.actualDir=e.actualDir,e.dirs.forEach((function(e){return t.dirs.push(e)})),e.files.forEach((function(e){return t.files.push(e)})),console.log(t)}}});r["a"].config.productionTip=!1,new r["a"]({store:x,render:function(t){return t(O)}}).$mount("#app")},"6ae2":function(t,e,n){"use strict";n("0b24")},"85ec":function(t,e,n){},a9da:function(t,e,n){"use strict";n("055b")}});
//# sourceMappingURL=app.658aa02f.js.map