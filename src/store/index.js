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
import article from "./modules/article";

Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
    response,
    query,
    notify,
    auth,
    service,
    setting,
    users,
    action,
    article
  }

})
