import Vue from 'vue'
import Vuex from 'vuex'
import query from "./modules/query";
import notify from "./modules/notify";
import response from "./modules/response";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiResponse: null
  },

  mutations: {
    setApiResponse: (state, data) => {
      state.apiResponse = data;
    },
  },

  actions: {
  },

  modules: {
    response,
    query,
    notify
  }
  
})
