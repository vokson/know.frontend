import Vue from 'vue'
import Vuex from 'vuex'
import query from "./modules/query";
import notify from "./modules/notify";
import response from "./modules/response";
import auth from "./modules/auth";
import service from "./modules/service";
import setting from "./modules/setting";
import users from "./modules/users";
import action from "./modules/action";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiResponse: null,
    user: {
      access_token: "",
      name: "",
      surname: "",
      role: "guest",
      email: "",
      isDefaultPassword: false
    }
  },

  getters: {
    isAuthenticated: function (state) {
      return (state.user.access_token == "") ? false : true;
    }
  },

  mutations: {
    setApiResponse: (state, data) => {
      state.apiResponse = data;
    },

    setUser: (state, data) => {
      state.user.access_token = data.access_token;
      state.user.name = data.name;
      state.user.surname = data.surname;
      state.user.role = data.role;
      state.user.email = data.email;
      state.user.id = data.id;
      state.user.isDefaultPassword = data.isDefaultPassword;

      window.$cookies.set("access_token", data.access_token);
    },

    setAccessTokenUsingCookie: (state) => {
      state.user.access_token = window.$cookies.get("access_token");
    },

  },

  actions: {
  },

  modules: {
    response,
    query,
    notify,
    auth,
    service,
    setting,
    users,
    action
  }
  
})
