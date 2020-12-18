<template>
  <div id="app">
    <router-view> </router-view>
  </div>
</template>

<script>
  import uri from "@/config/uri";
  export default {
    created() {
      this.$http.get(uri.getNowPlaying).then((ret) => {
        console.log(ret);
      });
    },
  };
</script>

<style lang="scss"></style>
