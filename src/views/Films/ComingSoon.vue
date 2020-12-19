<template>
  <div id="container">
    <van-loading size="24px" type="spinner" vertical v-show="isLoading"
      >加载中...</van-loading
    >
    <van-card v-for="item in list" :key="item.filmId">
      <template #title>
        <span style="fontSize:16px;color: #191a1b;">
          {{ item.name }}
          <span class="item">{{ item.filmType.name }}</span>
        </span>
      </template>
      <template #desc>
        <div>
          <div style="fontSize:14px;height:19px;"></div>
          <div style="fontSize:14px;color: #797d82;">
            主演: <span>{{ item.actors | actor }}</span>
          </div>
          <div style="fontSize:14px;color: #797d82;">
            上映日期：{{ item.premiereAt | toDate }}
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
        pageNum: 1,
        isLoading: true,
      };
    },
    async created() {
      let ret = await this.$http.get(uri.getComingSoon);
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
      toDate: function(val) {
        let time = new Date(val * 1000);
        let month = time.getMonth() - 0 + 1;
        let day = time.getDay();
        let date = time.getDate();
        switch (day) {
          case 1:
            day = "一";
            break;
          case 2:
            day = "二";
            break;
          case 3:
            day = "三";
            break;
          case 4:
            day = "四";
            break;
          case 5:
            day = "五";
            break;
          case 6:
            day = "六";
            break;
          case 7:
            day = "日";
            break;
        }
        let str = `周${day} ${month}月${date}日`
        return str;
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
