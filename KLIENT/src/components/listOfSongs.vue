<template>
  <div v-bind:class="[actualPlay.song == item ? 'songSet' : '']" class="song">
    <div>{{ album }}</div>
    <div class="item">{{ item }}</div>
    <div class="sizeButton">
      <div>{{ createSize(size) }}</div>
      <div>
        <div class="hidden">
          <a
            class="material-icons"
            v-if="actualPlay.song == item && !actualPlay.isPaused"
            v-on:click="toogleMusic(false)"
            >pause</a
          >
          <a class="material-icons" v-else v-on:click="toogleMusic(true)"
            >play_arrow</a
          >
          <a class="material-icons" v-on:click="addToPlaylist(item)"
            ><span class="material-icons-outlined"> favorite_border </span></a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "listOfSongs",
  props: {
    item: String,
    size: Number,
    album: String,
  },
  methods: {
    createSize(size) {
      return (size / 1048576).toFixed(2) + " MB";
    },
    toogleMusic(state) {
      if (state) this.$store.dispatch("toogleMusic", this.item);
      else this.$store.dispatch("toogleMusic");
    },
    addToPlaylist() {
      var obj = {
        addToPlaylist: { album: this.album, file: this.item, size: this.size },
      };
      this.$store.dispatch("sendInfoToServer", {
        firstLoad: false,
        loadAlbum: "",
        loadPlayList: false,
        addToPlaylist: obj,
      });
    },
  },
  computed: {
    actualPlay() {
      return this.$store.getters.actualPlay;
    },
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
.listOfSongs {
  width: 100%;
  height: 100px;
  float: left;
}
.song {
  display: flex;
  justify-content: space-between;
  margin: 0rem;
  padding: 1rem;
}
.song:hover {
  background-color: #b8cad9;
  color: #455473;
}
.songSet {
  background-color: #b8cad9;
  color: #455473;
}
.song:last-child {
  margin-bottom: 100px;
}
.sizeButton {
  display: flex;
  flex-direction: row;
}
.item {
  display: flex;
  justify-self: flex-start;
}
.material-icons {
  margin-top: 4px;
  font-size: 2rem;
}
</style>
