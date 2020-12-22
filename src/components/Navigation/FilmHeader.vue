<template>
  <div style="height:84px">
    <div :class="{ show: isShow }">
      <div class="show1">
        <button @click="gotoCity">{{ showCity }}</button>
      </div>
      <van-tabs v-model="$store.state.active" @change="changeRouter">
        <van-tab title="正在热映"></van-tab>
        <van-tab title="即将上映"></van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  import Vue from "vue";
  import { Tab, Tabs } from "vant";

  Vue.use(Tab);
  Vue.use(Tabs);
  export default {
    data: function() {
      return {
        uri: ["/films/nowplaying", "/films/comingsoon"],
        isShow: true,
      };
    },
    methods: {
      changeRouter: function(name, title) {
        this.$router.push(this.uri[name]);
      },
      gotoCity: function() {
        this.$router.push("/city");
      },
    },
    computed: {
      ...mapGetters(["showCity"]),
    },
    created() {
      this.$store.commit("setActive", this.uri.indexOf(this.$route.path));
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
  .show1 {
    display: block !important;
    height: 40px;
    overflow: hidden;
    width: 100%;
    background-color: #f8f8f8;
    button {
      border: 1px solid #f9f9f9;
      margin-left: 20px;
      margin-top: 8px;
      border-radius: 2px;
    }
  }
  .heigh1 {
    height: 44px;
  }
  .heigh2 {
    height: 84px;
  }
</style>
