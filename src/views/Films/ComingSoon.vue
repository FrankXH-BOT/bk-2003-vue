<template>
    <div>
        即将上映模板
    </div>
</template>

<script>
  import uri from "@/config/uri";
  export default {
    async created() {
        let ret = await this.$http.get(uri.getComingSoon);
        console.log(ret);
    },
  };
</script>