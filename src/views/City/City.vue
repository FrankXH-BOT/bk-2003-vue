<template>
  <div>
    <div class="cityList">
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAMAAADWZboaAAAAt1BMVEVHcEz///////////////////////////////////////////////////////////////////////////////////97e3saGxyIiYnW1tYdHh9UVVUpKiulpaXLy8s6OzyysrIiIyPx8fEeHyC/v7/5+fklJihCQ0Ntb28bHB1hYWKXl5c0NTZLS0xAQUI4ODk3ODjh4eHr6+s2Nzfq6uptbm5gYGIbHB39/f2VlZdLS0wzNDUZGhs8UYRWAAAAPHRSTlMAGHpLE3cKgEdgVnJfNBZ+cBx9A28js/6sjPvK7p+Q3pn1g/iUgfLYuvzCpeTR2eHiiIXihrvD/YCl0uTUXbEtAAABd0lEQVRIx91W13KDQAw0xnCHARuDe+/dKY7T9f/flTzghCLdMaMXj/eRnZ0T0qqUSveBim96gRWGVuCZfqW4zpCuSMGVRiFhwxEInIY+0qogUFXHHcm6IFGXEa20HaGEY1PKWlNo0KzhylZZaFFuoW8WUP5qkXdtMtrnx4dkzLn/jcgMXY7wlMpVNs+SUs4nMOylvsiME6h6rjawHmfqm/YG6aETzJY5X6V8SykHsJjmvyb9TOVoD/0R5qpElxHKLewOKGHo0tuGThdn/pPsony3A20iHPevMih92MGW9OO1Pj5Gjvqwp63sx1IT4aYLGCi6wIylXp5azuCkaiAvlgY5ZryGzUolDWKplSV6Q5jMlW1rxdIwS7zA8azu+JCWfl+KSRkBM9KEF+fro0BxGJagjPimNyJp/1et/RlNx2l1esC8f2oGDGOscYYpY4RzFgdjXSmW5Fm3JBmrmXMQcM4QzvHDObk4hx7nvGQdtaxTmnXA3zR+AH8JUdNL967cAAAAAElFTkSuQmCC"
        alt=""
        @click='goBack'
      />
      城市列表
    </div>
    <div>
      <!-- 列表 -->
      <van-index-bar :index-list="cityIndex">
        <!-- 使用伪标签将后面要循环的内容包裹起来 -->
        <template v-for="(item, index) in dataList">
          <van-index-anchor :key="index">{{ item.index }}</van-index-anchor>
          <van-cell
            @click="setCity(city.cityId, city.name)"
            :title="city.name"
            v-for="city in item.data"
            :key="city.cityId"
          />
        </template>
      </van-index-bar>
    </div>
  </div>
</template>

<script>
  import uri from "@/config/uri";
  import Vue from "vue";
  import { IndexBar, IndexAnchor, Cell } from "vant";

  Vue.use(IndexBar);
  Vue.use(IndexAnchor);
  Vue.use(Cell);
  export default {
    data() {
      return {
        cityIndex: [],
        charIndex: [],
        dataList: [],
      };
    },
    created() {
      this.$store.commit("setShowFooter", false);
      this.$http.get(uri.getCity).then((ret) => {
        if (ret.status == 0) {
          for (let i = 65; i <= 90; i++) {
            this.charIndex.push(String.fromCharCode(i));
          }
          this.charIndex.forEach((el) => {
            let tmp = ret.data.cities.filter((item) => {
              return el.toLowerCase() == item.pinyin.substr(0, 1);
            });
            if (tmp.length > 0) {
              this.cityIndex.push(el);
              this.dataList.push({
                index: el,
                data: tmp,
              });
            }
          });
        }
      });
    },
    beforeDestroy() {
      this.$store.commit("setShowFooter", true);
    },
    methods: {
        goBack: function() {
            this.$router.go(-1);
        },
        setCity: function(cityId,cityName) {
            this.$store.commit('setCity',{cityId,cityName});
            this.$router.go(-1);
        }
    }
  };
</script>

<style lang="scss" scoped>
  .cityList {
    height: 50px;
    text-align: center;
    background-color: rgb(244, 244, 244);
    line-height: 50px;
    font-size: 20px;
    width: 100%;
    position: relative;
    img {
      position: absolute;
      width: 30px;
      left: 10px;
      top: 10px;
    }
  }
</style>
