<template>
  <div class="playBox">
    <div class="slider">
      <div class="sliderContainer">
        <div ref="curTime" class="currentTime">00:00</div>
        <input
          ref="slider"
          type="range"
          min="1"
          max="100"
          v-model="value"
          @click="seekTo()"
        />
        <div ref="totalDur">00:00</div>
      </div>
    </div>
    <div class="buttonsContainer">
      <div class="material-icons" v-on:click="playBefore()">skip_previous</div>
      <div class="playPause">
        <a
          class="material-icons pause"
          v-if="!actualPlay.isPaused"
          v-on:click="toogleMusic()"
          >pause</a
        >
        <a class="material-icons play" v-else v-on:click="play()">play_arrow</a>
      </div>
      <div class="material-icons" v-on:click="playNext()">skip_next</div>
    </div>
    <audio
      id="audio"
      controls
      style="display: none"
      ref="audio"
      @timeupdate="onTimeUpdate()"
      v-on:ended="playNext()"
    >
      <source v-bind:src="actualPlay.url" id="audio_src" type="audio/mp3" />
    </audio>
  </div>
</template>

<script>
export default {
  name: "listOfSongs",
  data() {
    return {
      value: 0,
    };
  },
  methods: {
    onTimeUpdate() {
      this.changeSlider = this.$refs.audio.currentTime;
      if (this.$refs.audio.currentTime == this.$refs.audio.duration) {
        this.playNext();
      }
    },
    seekTo() {
      this.toogleMusic();
      this.changeTime = this.value;
    },
    play() {
      if (this.actualPlay.song == "") {
        var song = this.getAllFiles[0].file;
        this.toogleMusic(song);
      } else {
        this.toogleMusic(this.actualPlay.song);
      }
    },
    playNext() {
      this.$store.dispatch("playNext");
    },
    playBefore() {
      this.$store.dispatch("playBefore");
    },
    toogleMusic(name) {
      if (name != undefined) this.$store.dispatch("toogleMusic", name);
      else this.$store.dispatch("toogleMusic");
    },
  },
  computed: {
    actualPlay() {
      return this.$store.getters.actualPlay;
    },
    getAllFiles() {
      return this.$store.getters.getAllFiles;
    },
    changeTime: {
      get: function () {
        return this.$refs.audio.currentTime;
      },
      set: function (newVal) {
        if (
          this.$refs.audio.duration != null &&
          this.$refs.audio.currentTime != null
        ) {
          var seekto = this.$refs.audio.duration * (newVal / 100);
          this.$refs.audio.currentTime = seekto;
        }
        this.toogleMusic();
      },
    },
    changeSlider: {
      get: function () {
        return document.querySelector(".seekSlider");
      },
      set: function () {
        let seekPosition = 0;
        if (!isNaN(this.$refs.audio.duration)) {
          seekPosition =
            this.$refs.audio.currentTime * (100 / this.$refs.audio.duration);
          this.$refs.slider.value = seekPosition;

          let currentMinutes = Math.floor(this.$refs.audio.currentTime / 60);
          let currentSeconds = Math.floor(
            this.$refs.audio.currentTime - currentMinutes * 60
          );
          let durationMinutes = Math.floor(this.$refs.audio.duration / 60);
          let durationSeconds = Math.floor(
            this.$refs.audio.duration - durationMinutes * 60
          );

          if (currentSeconds < 10) {
            currentSeconds = "0" + currentSeconds;
          }
          if (durationSeconds < 10) {
            durationSeconds = "0" + durationSeconds;
          }
          if (currentMinutes < 10) {
            currentMinutes = "0" + currentMinutes;
          }
          if (durationMinutes < 10) {
            durationMinutes = "0" + durationMinutes;
          }
          this.$refs.curTime.textContent =
            currentMinutes + ":" + currentSeconds;
          this.$refs.totalDur.textContent =
            durationMinutes + ":" + durationSeconds;
        }
      },
    },
  },
};
</script>
<style>
.playBox {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  font-size: 26px;
  color: #eee;
  margin: 0px;
  padding: 0;
  width: 100%;
  height: 100px;
  background-color: dimgrey;
}
.playBox > div {
  cursor: pointer;
  font-size: 40px;
}
.slider {
  width: 90%;
}
.playBox:focus > div {
  outline: none;
  border: none;
}
.sliderContainer {
  display: flex;
  justify-content: center;
  width: 100%;
}
.sliderContainer > input {
  width: 100%;
}
.buttonsContainer {
  display: flex;
  align-items: center;
  height: 80px;
  justify-content: center;
  margin: 1rem;
}
.buttonsContainer > div {
  cursor: pointer;
  font-size: 40px;
}
.play {
  display: flex;
  margin-top: 5px;
}
.playPause {
  display: flex;
  align-items: center;
}
input[type="range"] {
  width: 100%;
  margin: 1rem;
  background-color: transparent;
  -webkit-appearance: none;
}
input[type="range"]:focus {
  outline: none;
}
input[type="range"]::-webkit-slider-runnable-track {
  background: #b8cad9;
  border: 0;
  border-radius: 25px;
  width: 100%;
  height: 11.3px;
  cursor: pointer;
  -webkit-box-shadow: 0px 2px 11px -2px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 2px 11px -2px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 2px 11px -2px rgba(0, 0, 0, 0.75);
}
input[type="range"]::-webkit-slider-thumb {
  margin-top: -6.85px;
  width: 25px;
  height: 25px;
  background: #7c92a6;
  border: 2.5px solid #7c92a6;
  border-radius: 50px;
  cursor: pointer;
  -webkit-appearance: none;
  -webkit-box-shadow: 0px 2px 11px -2px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 2px 11px -2px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 2px 11px -2px rgba(0, 0, 0, 0.75);
}
input[type="range"]:focus::-webkit-slider-runnable-track {
  background: #b8cad9;
  -webkit-box-shadow: 0px 2px 11px -2px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 2px 11px -2px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 2px 11px -2px rgba(0, 0, 0, 0.75);
}
input[type="range"]::-moz-range-track {
  background: #455473;
  border: 0;
  border-radius: 25px;
  width: 100%;
  height: 11.3px;
  cursor: pointer;
}
input[type="range"]::-moz-range-thumb {
  width: 25px;
  height: 25px;
  background: #b8cad9;
  border: 2.5px solid #7c92a6;
  border-radius: 50px;
  cursor: pointer;
}
input[type="range"]::-ms-track {
  background: transparent;
  border-color: transparent;
  border-width: 9.45px 0;
  color: transparent;
  width: 100%;
  height: 11.3px;
  cursor: pointer;
}
input[type="range"]::-ms-fill-lower {
  background: #455473;
  border: 0;
  border-radius: 50px;
}
input[type="range"]::-ms-fill-upper {
  background: #455473;
  border: 0;
  border-radius: 50px;
}
input[type="range"]::-ms-thumb {
  width: 25px;
  height: 25px;
  background: #b8cad9;
  border: 2.5px solid #7c92a6;
  border-radius: 50px;
  cursor: pointer;
  margin-top: 0px;
  /*Needed to keep the Edge thumb centred*/
}
input[type="range"]:focus::-ms-fill-lower {
  background: #455473;
}
input[type="range"]:focus::-ms-fill-upper {
  background: #455473;
}
@supports (-ms-ime-align: auto) {
  /* Pre-Chromium Edge only styles, selector taken from hhttps://stackoverflow.com/a/32202953/7077589 */
  input[type="range"] {
    margin: 0;
    /*Edge starts the margin from the thumb, not the track as other browsers do*/
  }
}
</style>
