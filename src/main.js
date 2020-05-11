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


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(Notifications);
Vue.use(VueCookies)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

window.$axios = axios.create({
  baseURL: "http://know.backend/api",
 // method: 'post', // Перестало работать в axios 0.19
});

window.$sha256 = sha256
window.$download = fileDownload