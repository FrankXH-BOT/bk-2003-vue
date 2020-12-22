<template>
  <div>
    <div class="header">
      <div class="goBack" @click="goBack">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAMAAADWZboaAAAAt1BMVEVHcEz///////////////////////////////////////////////////////////////////////////////////97e3saGxyIiYnW1tYdHh9UVVUpKiulpaXLy8s6OzyysrIiIyPx8fEeHyC/v7/5+fklJihCQ0Ntb28bHB1hYWKXl5c0NTZLS0xAQUI4ODk3ODjh4eHr6+s2Nzfq6uptbm5gYGIbHB39/f2VlZdLS0wzNDUZGhs8UYRWAAAAPHRSTlMAGHpLE3cKgEdgVnJfNBZ+cBx9A28js/6sjPvK7p+Q3pn1g/iUgfLYuvzCpeTR2eHiiIXihrvD/YCl0uTUXbEtAAABd0lEQVRIx91W13KDQAw0xnCHARuDe+/dKY7T9f/flTzghCLdMaMXj/eRnZ0T0qqUSveBim96gRWGVuCZfqW4zpCuSMGVRiFhwxEInIY+0qogUFXHHcm6IFGXEa20HaGEY1PKWlNo0KzhylZZaFFuoW8WUP5qkXdtMtrnx4dkzLn/jcgMXY7wlMpVNs+SUs4nMOylvsiME6h6rjawHmfqm/YG6aETzJY5X6V8SykHsJjmvyb9TOVoD/0R5qpElxHKLewOKGHo0tuGThdn/pPsony3A20iHPevMih92MGW9OO1Pj5Gjvqwp63sx1IT4aYLGCi6wIylXp5azuCkaiAvlgY5ZryGzUolDWKplSV6Q5jMlW1rxdIwS7zA8azu+JCWfl+KSRkBM9KEF+fro0BxGJagjPimNyJp/1et/RlNx2l1esC8f2oGDGOscYYpY4RzFgdjXSmW5Fm3JBmrmXMQcM4QzvHDObk4hx7nvGQdtaxTmnXA3zR+AH8JUdNL967cAAAAAElFTkSuQmCC"
          alt=""
        />
      </div>
      <div class="title" v-show="show_title">
        {{ film.name }}
      </div>
    </div>

    <!-- 海报展示 -->
    <div class="poster">
      <img :src="film.poster" alt="" />
    </div>
    <div class="main">
      <div class="film-detail">
        <div>
          {{ film.name }}
          <div class="item">{{ filmType }}</div>
          {{ film.grade }}
        </div>
        <div>{{ film.category }}</div>
        <div>{{ film.premiereAt | parsePremierAt }}上映</div>
        <div>{{ film.nation }} | {{ film.runtime }}分钟</div>
        <div>{{ film.synopsis }}</div>
      </div>
      <div class="film-actor">
        <div class="yzry">演职人员</div>
        <swiper :key="film.actors.length">
          <div
            class="swiper-slide"
            v-for="(item, index) in film.actors"
            :key="index"
          >
            <img :src="item.avatarAddress" alt="" width="85" height="85" />
            <div>{{ item.name }}</div>
          </div>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapMutations } from "vuex";
  import moment from "moment";
  import uri from "@/config/uri";
  import swiper from "@/components/Swiper";
  export default {
    data: function() {
      return {
        film: { actors: [] },
        show_title: false,
        filmType: "",
      };
    },
    methods: {
      ...mapMutations(["setShowFooter"]),
      goBack: function() {
        this.$router.go(-1);
      },
    },
    components: {
      swiper,
    },
    created() {
      //   this.$store.commit('setShowFooter',false);
      this.setShowFooter(false);
      this.$http
        .get(uri.getFilm + `?filmId=${this.$route.params.id}`)
        .then((ret) => {
          if (ret.status == 0) {
            this.film = ret.data.film;
            this.filmType = ret.data.film.filmType.name;
          }
        });
    },
    mounted() {
      window.addEventListener("scroll", () => {
        if (document.documentElement.scrollTop > 10) {
          this.show_title = true;
        }
      });
    },
    beforeDestroy() {
      this.$store.commit("setShowFooter", true);
    },
    filters: {
      parsePremierAt: function(val) {
        return moment(val * 1000).format("YYYY-MM-DD");
      },
    },
  };
</script>

<style lang="scss" scoped>
  .header {
    position: fixed;
    background-color: hsla(0, 0%, 100%, 0);
    -webkit-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease;
    width: 100vw;
    height: 44px;
    z-index: 1;
  }
  .goBack {
    height: 30px;
    position: absolute;
    top: 5px;
    left: 5px;
    img {
      width: 30px;
    }
  }
  .poster {
    img {
      width: 100%;
    }
  }
  .main {
    background: #f4f4f4;
    .film-detail {
      background: #ffffff;
      padding-top: 20px;
      padding-left: 15px;
      .item {
        font-size: 9px;
        color: #fff;
        background-color: #d2d6dc;
        height: 14px;
        line-height: 14px;
        padding: 0 2px;
        border-radius: 2px;
        display: inline-block;
      }
    }
    .film-actor {
      background: #ffffff;
      margin-top: 10px;
      padding-left: 15px;
      .yzry {
        padding-top: 15px;
      }
    }
  }
</style>
