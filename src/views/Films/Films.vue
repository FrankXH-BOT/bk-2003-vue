<template>
  <div>
    <van-tabs v-model="active" @change='changeRouter'>
      <van-tab title="正在热映" name='0'></van-tab>
      <van-tab title="即将上映" name='1'></van-tab>
    </van-tabs>
    <router-view></router-view>
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
        active: '0',
        uri: ['/films/nowplaying','/films/comingsoon'],
      };
    },
    methods: {
        changeRouter: function(name,title) {
            name = Number(name);
            this.$router.push(this.uri[name]);
        }
    },
    created() {
        this.active = String(this.uri.indexOf(this.$route.path));
    }
  };
</script>

<style lang="scss" scoped>
</style>
