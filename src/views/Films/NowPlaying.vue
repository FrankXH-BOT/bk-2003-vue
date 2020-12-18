<template>
  <div>
      正在热映模板
  </div>
</template>

<script>
  import uri from "@/config/uri";
  export default {
    data: function() {
      return {
          films: {},
      };
    },
    async created() {
      let ret = await this.$http.get(uri.getNowPlaying);
      this.films = ret.data.films;
      console.log(this.films)
    },
  };
</script>

<style lang="scss" scoped>
</style>
