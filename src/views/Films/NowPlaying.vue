<template>
  <div id="container">
    <van-loading size="24px" type="spinner" vertical v-show="isLoading"
      >加载中...</van-loading
    >
    <van-pull-refresh
      v-model="isLoading2"
      @refresh="onRefresh"
      :success-text="text"
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
          <div style="marginTop:5px">
            <div style="fontSize:14px;color: #797d82;">
              观众评分
              <span style="color:#ffb232;fontSize:16px">
                {{ item.grade }}
              </span>
            </div>
            <div class="nowPlayingFilm-buy" style="float: right;">购票</div>
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
    </van-pull-refresh>
  </div>
</template>

<script>
  import uri from "@/config/uri";
  import Vue from "vue";
  import { Card, Loading, PullRefresh } from "vant";

  Vue.use(Card);
  Vue.use(Loading);
  Vue.use(PullRefresh);
  export default {
    data: function() {
      return {
        list: [],
        pageNum: 1,
        isLoading: true,
        isLoading2: true,
        text: "刷新成功",
        cityId:'',
      };
    },
    created() {
      this.cityId = this.$store.state.city.cityId;
      this.getData();
    },
    filters: {
      actor: function(val) {
        if (val) {
          let str = "";
          val.forEach((el) => {
            str += el.name + " ";
          });
          return str.substr(0, 10) + "...";
        } else {
          return "暂无主演";
        }
      },
    },
    methods: {
      getData() {
        this.$http
          .get(uri.getNowPlaying + `?pageNum=${this.pageNum}&cityId=${this.cityId}`)
          .then((ret) => {
            if (this.pageNum <= Math.ceil(ret.data.total / 10)) {
              this.pageNum++;
              this.list = ret.data.films.concat(this.list);
              this.isLoading = false;
              this.text = "刷新成功";
            } else {
              this.text = "没有更多资源";
              this.isLoading2 = false;
            }
          });
      },
      gotoDetail(id) {
        this.$router.push(`/film/${id}`);
      },
      onRefresh() {
        this.getData();
        // this.isLoading2 = false;
      },
    },
    watch: {
      list: function() {
        this.isLoading2 = false;
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
