<template>
  <div style="height:44px">
    <div :class="{ show: isShow }">
      <van-tabs v-model="active" @change="changeRouter">
        <van-tab title="正在热映"></van-tab>
        <van-tab title="即将上映"></van-tab>
      </van-tabs>
    </div>
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
        uri: ["/films/nowplaying", "/films/comingsoon"],
        isShow: true,
      };
    },
    methods: {
      changeRouter: function(name, title) {
        this.$router.push(this.uri[name]);
      },
    },
    created() {
      this.active = this.uri.indexOf(this.$route.path);
    },
    mounted() {
      window.addEventListener("scroll", () => {
        let top = document.documentElement.scrollTop;
        if (top > 100) {
          this.isShow = true;
        } else {
          this.isShow = false;
        }
      });
    },
  };
</script>

<style lang="scss" scoped>
  .show {
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 999;
  }
</style>
