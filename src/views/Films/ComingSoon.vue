<template>
  <div id="container" class="wrapper">
    <div>
      <van-loading size="24px" type="spinner" vertical v-show="isLoading"
        >加载中...</van-loading
      >
      <van-card
        v-for="item in list"
        :key="item.filmId"
        @click="gotoDetail(item.filmId)"
      >
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
            <div class="nowPlayingFilm-buy" style="float: right;">预约</div>
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
        list: [],
        pageNum: 1,
        isLoading: true,
        ret: {
          data: {
            total:1,
          }
        },
      };
    },
    created() {
      this.getData();
    },
    mounted() {
      window.addEventListener("scroll", () => {
        let height = document.documentElement.scrollTop;
        let clientHeight = document.documentElement.clientHeight;
        let x = document.documentElement.scrollHeight;
        if (x === height + clientHeight) {
          this.getData();
        }
      });
    },
    methods: {
      getData() {
        if (this.pageNum <= Math.ceil(this.ret.data.total / 10)) {
          this.$http
            .get(uri.getNowPlaying + `?pageNum=${this.pageNum}`)
            .then((ret) => {
              this.ret = ret;
              this.pageNum++;
              this.list = this.list.concat(ret.data.films);
              this.isLoading = false;
            });
        }
      },
      gotoDetail(id) {
        this.$router.push(`/film/${id}`);
      },
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
        let str = `周${day} ${month}月${date}日`;
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
  .nowPlayingFilm-buy {
    line-height: 25px;
    height: 25px;
    width: 50px;
    color: #ff5f16;
    font-size: 13px;
    text-align: center;
    border-radius: 2px;
    position: relative;
    border: 1px solid;
    bottom: 5px;
    right: 5px;
  }
</style>
