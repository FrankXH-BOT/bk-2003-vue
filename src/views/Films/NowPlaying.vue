<template>
  <div id="container">
      <van-loading size="24px" type="spinner" vertical v-show='isLoading'>加载中...</van-loading>
    <van-card
      v-for="item in list"
      :key="item.filmId"
    >
      <template #title>
        <span style="fontSize:16px;color: #191a1b;">
          {{ item.name }}
          <span class="item">{{ item.filmType.name }}</span>
        </span>
      </template>
      <template #desc>
        <div style="marginTop:5px">
          <div style="fontSize:14px;color: #797d82;">
            观众评分
            <span style="color:#ffb232;fontSize:16px">
              {{ item.grade }}
            </span>
          </div>
          <div style="fontSize:14px;color: #797d82;">
            主演: <span>{{ item.actors | actor }}</span>
          </div>
          <div style="fontSize:14px;color: #797d82;">
            {{ item.nation }} | {{ item.runtime }}分钟
          </div>
        </div>
      </template>
      <template #thumb>
        <img :src="item.poster" style="width:66px;height:90px" />
      </template>
    </van-card>
  </div>
</template>

<script>
  import uri from "@/config/uri";
  import Vue from "vue";
  import { Card, Loading } from "vant";

  Vue.use(Card);
  Vue.use(Loading);
  export default {
    data: function() {
      return {
        list: {},
        pageNum:1,
        isLoading:true,
      };
    },
    async created() {
      let ret = await this.$http.get(uri.getNowPlaying);
      this.list = ret.data.films;
      this.isLoading = false;
    },
    filters: {
      actor: function(val) {
        if (val) {
          let str = "";
          val.forEach((el) => {
            str += el.name + " ";
          });
          return str.substr(0, 12) + "...";
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .item {
    font-size: 9px;
    color: #fff;
    background-color: #d2d6dc;
    height: 14px;
    line-height: 14px;
    padding: 0 2px;
    border-radius: 2px;
  }
</style>
