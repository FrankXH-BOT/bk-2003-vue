<template>
  <div>
    <van-tabbar v-model="active" @change="changeRouter">
      <van-tabbar-item>
        <van-icon class="iconfont icon-dianying" size="1.2rem" slot="icon" />
        <span>电影</span>
      </van-tabbar-item>
      <van-tabbar-item>
        <van-icon class="iconfont icon-yingyuan" size="1.2rem" slot="icon" />
        <span>影院</span>
      </van-tabbar-item>
      <van-tabbar-item>
        <van-icon class="iconfont icon-geren" size="1.2rem" slot="icon" />
        <span>我的</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  import Vue from "vue";
  import { Tabbar, TabbarItem, Icon } from "vant";
  import "@/assets/icon/iconfont.css";

  Vue.use(Tabbar);
  Vue.use(TabbarItem);
  Vue.use(Icon);
  export default {
    data: function() {
      return {
        active: 0,
        uri: ["/films", "/cinemas", "/center"],
      };
    },
    created() {
      let arr = this.$route.path.split('/');
      let path = '/' + arr[1];
      this.active = this.uri.indexOf(path);
      // this.active = this.$route.path === '/films/nowplaying' || '/films/comingsoon' ? 0 : this.uri.indexOf(this.$route.path);
    },
    methods: {
      changeRouter: function(index) {
        this.$router.push(this.uri[index]);
      },
    },
  };
</script>

<style lang="scss"></style>
