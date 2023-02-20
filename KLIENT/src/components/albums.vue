<template>
  <img v-bind:src="url" alt="Error While loading" />
</template>

<script>
export default {
  name: "albums",
  props: {
    item: String,
  },
  data() {
    return {
      url: "",
    };
  },
  methods: {
    loadImage() {
      fetch("./albums/" + this.item + "/cover.jpg", { method: "GET" })
        .then((res) => {
          if (res.ok) {
            this.url = "./albums/" + this.item + "/cover.jpg";
          } else {
            this.url = "./img/default.png";
          }
        })
        .catch((err) => console.log("Error:", err));
    },
  },
  created() {
    this.loadImage();
  },
};
</script>
<style>
img {
  width: 100px;
  height: 100px;
  float: left;
}
</style>