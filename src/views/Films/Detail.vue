<template>
  <div>
    我是详细信息模板
  </div>
</template>

<script>
  import { mapMutations } from "vuex";
  export default {
      methods: {
        ...mapMutations(['setShowFooter']),
      },
      created() {
        //   this.$store.commit('setShowFooter',false);
        this.setShowFooter(false);
      },
      beforeDestroy() {
          this.$store.commit('setShowFooter',true);
      },
  };
</script>
