import Vuex from "vuex"
import Vue from "vue"

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        dirs: [],
        files: [],
        actualPlay: { album: "", song: "", url: "", isPaused: true }
    },
    getters: {
        getAllDirs: (state) => { return state.dirs },
        getAllFiles: (state) => { return state.files },
        actualPlay: (state) => { return state.actualPlay },
    },
    actions: {
        playNext(state) {
            var x = this.state.files.find(ele => ele.file == this.state.actualPlay.song)
            var inx = this.state.files.indexOf(x)
            if (this.state.files.length - 1 == inx) {
                state.commit("updateActualPlayed", this.state.files[0])
            } else {
                state.commit("updateActualPlayed", this.state.files[inx + 1])
            }
        },
        playBefore(state) {
            var x = this.state.files.find(ele => ele.file == this.state.actualPlay.song)
            var inx = this.state.files.indexOf(x)
            if (inx == 0 || this.state.actualPlay.song == "") {
                state.commit("updateActualPlayed", this.state.files[this.state.files.length - 1])
            } else {
                state.commit("updateActualPlayed", this.state.files[inx - 1])
            }
        },
        async sendInfoToServer(state, { firstLoad, loadAlbum = "", loadPlayList, addToPlaylist }) {
            var body
            if (firstLoad) {
                //sendInfoToServer(true)
                body = JSON.stringify({ firstLoad: true, album: "", playList: false });
            } else if (loadAlbum != "") {
                //sendInfoToServer(false,albumName)
                body = JSON.stringify({ firstLoad: false, album: loadAlbum, playList: false });
            } else if (typeof addToPlaylist === "object") {
                //sendInfoToServer(false, "",false,true)
                body = JSON.stringify(addToPlaylist)
            } else if (loadPlayList) {
                //sendInfoToServer(false, "",true)
                body = JSON.stringify({ firstLoad: false, album: "", playList: true });
            }
            if (body != undefined) {
                try {
                    const headers = { "Contet-Type": "application/json" };
                    const server = await fetch("/", { method: "POST", body, headers, })
                    const data = await server.json()
                    if (firstLoad || loadAlbum != "") {
                        state.commit("setCurrentSongListAndAlbums", data)
                    } else if (loadPlayList) {
                        state.commit("setCurrentSongList", data)
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        },
        toogleMusic(state, name = "") {
            if (this.state.actualPlay.song == name || name == "") {
                state.commit("toogleMusic")
            } else {
                var x = this.state.files.find(ele => ele.file == name)
                var inx = this.state.files.indexOf(x)
                if (this.state.actualPlay.song == this.state.files[inx]) {
                    state.commit("toogleMusic")
                } else {
                    state.commit("updateActualPlayed", this.state.files[inx]);
                }
            }
        }
    },
    mutations: {
        setCurrentSongListAndAlbums(state, data) {
            state.dirs = [];
            state.files = [];
            data.dirs.forEach(element => state.dirs.push(element));
            data.files.forEach(element => state.files.push(element));
        },
        setCurrentSongList(state, data) {
            state.files = [];
            data.files.forEach(element => state.files.push(element));
        },
        updateActualPlayed(state, name) {
            state.actualPlay.album = name.album
            state.actualPlay.song = name.file
            state.actualPlay.isPaused = false;
            state.actualPlay.url = "./static/albums/" + state.actualPlay.album + "/" + state.actualPlay.song
            var audio = document.getElementById("audio")
            audio.load()
            audio.onloadeddata = function (e) {
                e.target.play();
            };
        },
        toogleMusic(state) {
            if (state.actualPlay.isPaused) {
                state.actualPlay.isPaused = false;
                document.getElementById("audio").play();
            } else {
                document.getElementById("audio").pause();
                state.actualPlay.isPaused = true;
            }
        },
    }
})