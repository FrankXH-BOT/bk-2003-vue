<template>
  <div>
    <van-tabs v-model="active" @change='changeRouter' sticky>
      <van-tab title="正在热映"><router-view></router-view></van-tab>
      <van-tab title="即将上映"><router-view></router-view></van-tab>
    </van-tabs>
  </div>
</template>

<script>
  import Vue from "vue";
  import { Tab, Tabs } from "vant";

  Vue.use(Tab);
  Vue.use(Tabs);
  export default {
    data: function() {
      return {
        active: 0,
        uri: ['/films/nowplaying','/films/comingsoon'],
      };
    },
    methods: {
        changeRouter: function(name,title) {
            this.$router.push(this.uri[name]);
        }
    },
    created() {
        this.active = this.uri.indexOf(this.$route.path);
    }
  };
</script>

<style lang="scss" scoped>
</style>
