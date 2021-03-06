import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import sha256 from 'sha256'

import BootstrapVue from 'bootstrap-vue'
import axios from 'axios'
import Notifications from 'vue-notification'

import VueCookies from 'vue-cookies'
import fileDownload from 'js-file-download'
import Datepicker from 'vuejs-datepicker';
import { VueEditor } from 'vue2-editor';


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(Notifications);
Vue.use(VueCookies)


Vue.component("datepicker", Datepicker);
Vue.component("editor", VueEditor);

Vue.config.productionTip = false

// Проверка возможности доступа по url
router.beforeEach((to, from, next) => {

  store.commit('roles/path', {
    path: to.path,
    role: (store.getters['auth/giveRole'] == undefined) ? 'guest' : store.getters['auth/giveRole']
  });

  if (store.getters['roles/mayEnter'] == false) {

    store.dispatch('notify/showNotifyByCode', '1.5');
    next({ name: 'login' })

  } else {
    next();
  }
});


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

window.$axios = axios.create({
  // baseURL: "http://know.backend/api", //vagrant
  baseURL: "http://api.know/api", // НИИК
  // method: 'post', // Перестало работать в axios 0.19
});

window.$sha256 = sha256
window.$download = fileDownload

window.$guid = function () {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
}

window.$formatBytes =  function(bytes, decimals) {
  if (bytes == 0) return "0 Bytes";
  var k = 1024,
    dm = decimals || 2,
    sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}