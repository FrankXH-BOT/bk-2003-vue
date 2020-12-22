<template>
  <div id="app">
    <router-view> </router-view>
    <Footer v-show="isShow" />
  </div>
</template>
<script>
  import Footer from "@/components/Navigation/Footer";
  import { mapGetters } from "vuex";
  export default {
    data: function() {
      return {
        isShow: true,
      };
    },
    components: {
      Footer,
    },
    // created() {
    //   this.isShow = this.$store.state.isShowFooter;
    // },
    updated() {
      this.isShow = this.$store.state.isShowFooter;
      let x = this.$route.path === '/films/nowplaying' ? 0 : 1;
      this.$store.commit('setActive',x);
    },
    mounted() {
      this.isShow = this.$store.state.isShowFooter;
    },
    computed: {
      ...mapGetters(['showNum'])
    }
  };
</script>

<style lang="scss"></style>
