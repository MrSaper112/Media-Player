<template>
  <div id="app">
    <div class="playList">
      <div v-on:click="loadPlayList()">Playlist</div>
    </div>
    <div class="content">
      <div id="leftBox">
        <div class="albums">
          <albums
            v-for="album in getAllDirs"
            :key="album"
            :item="album"
            v-on:click.native="loadAlbum(album)"
          />
        </div>
      </div>
      <div id="middleBox">
        <div>
          <listOfSongs
            v-for="item in getAllFiles"
            :album="item.album"
            :key="item.file"
            :item="item.file"
            :size="item.size"
          />
        </div>
      </div>
    </div>

    <downPanel :key="'downPanel'" />
  </div>
</template>

<script>
import listOfSongs from "./components/listOfSongs.vue";
import albums from "./components/albums.vue";
import downPanel from "./components/downPanel.vue";
export default {
  name: "App",
  components: {
    listOfSongs,
    albums,
    downPanel,
  },
  computed: {
    getAllDirs() {
      return this.$store.getters.getAllDirs;
    },
    getAllFiles() {
      return this.$store.getters.getAllFiles;
    },
    actualPlay() {
      return this.$store.getters.actualPlay;
    },
  },
  methods: {
    loadAlbum(name) {
      this.$store.dispatch("sendInfoToServer", {
        firstLoad: false,
        loadAlbum: name,
      });
    },
    loadPlayList() {
      this.$store.dispatch("sendInfoToServer", {
        firstLoad: false,
        loadAlbum: "",
        loadPlayList: true,
      });
    },
  },
  created() {
    this.$store.dispatch("sendInfoToServer", { firstLoad: true });
    console.log("Zapytanie przy ładowaniu strony");
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap"); /*Noto sans*/
@import url("https://fonts.googleapis.com/css2?family=Arvo&display=swap");
html {
  width: 100%;
  height: 100%;
}
body {
  margin: 0px;
  padding: 0px;
  font-family: "Noto Sans", sans-serif;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently*/
  overflow-x: hidden;
  width: 100%;
  background-color: #555d64;

  height: 100%;
}
.playList {
  background-color: #3c3b3b;
  display: flex;
  width: 100%;
  height: 5rem;
  font-size: 4rem;
  -webkit-box-shadow: 0px 2px 11px -2px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 2px 11px -2px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 2px 11px -2px rgba(0, 0, 0, 0.75);
  z-index: 3;
  position: fixed;
  padding: 0rem 1rem 0.5rem 1rem;
  color: #d6d2d2;
}
.albums > img {
  border: 1px solid black;
  width: 200px;
  height: 200px;
  -webkit-box-shadow: 0px 2px 11px -2px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 2px 11px -2px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 2px 11px -2px rgba(0, 0, 0, 0.75);
}
#leftBox {
  background-color: #3b4650;
  height: 100%;
  max-width: 210px;
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  position: fixed;
  margin-top: 5rem;
}
#middleBox {
  background-color: #555d64;
  color: #d6d2d2;
  height: 100%;
  width: 100%;
  font-size: 1.8rem;
  margin-left: 230px;
  margin-top: 5rem;
}
.content {
  display: flex;
  flex-direction: row;
}
.albums {
  height: initial;
}
</style>
