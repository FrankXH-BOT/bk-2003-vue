import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isShowFooter: true,
    count: 1,
    city: {
      cityId:110100,
      cityName:'北京',
    },
    active:0,
  },
  mutations: {
    setShowFooter(state, val) {
      state.isShowFooter = val;
    },
    setCity(state,city) {
      state.city = city;
      console.log(city);
    },
    setActive(state,num) {
      // console.log(num);
      state.active = num;
    }
  },
  actions: {

  },
  getters: {
    showNum: state=>{
      return state.count;
    },
    showCity: state=>{
      return state.city.cityName;
    }
  },
  modules: {

  }
})
