import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Admin from '../views/Admin.vue'
import Setting from '../views/Setting.vue'
import User from '../views/User.vue'
import Action from '../views/Action.vue'
import ArticleEditor from '../views/ArticleEditor.vue'
import ArticleReader from '../views/ArticleReader.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },

  {
    path: '/login',
    name: 'login',
    component: Login
  },

  {
    path: '/admin',
    name: 'admin',
    component: Admin
  },

  {
    path: '/setting',
    name: 'setting',
    component: Setting
  },

  {
    path: '/user',
    name: 'user',
    component: User
  },

  {
    path: '/action',
    name: 'action',
    component: Action
  },

  {
    path: '/article/edit/:uin?',
    name: 'article_editor',
    component: ArticleEditor
  },

  {
    path: '/article/read/:uin?/:version?',
    name: 'article_reader',
    component: ArticleReader
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
