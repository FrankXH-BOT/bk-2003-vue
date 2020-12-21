import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isShowFooter: true,
    count: 1,
  },
  mutations: {
    setShowFooter(state, val) {
      state.isShowFooter = val;
    },
  },
  actions: {

  },
  getters: {
    showNum: state=>{
      return state.count;
    }
  },
  modules: {

  }
})
