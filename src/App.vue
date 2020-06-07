<template>
  <div id="app">
    <notifications group="notify-group" />

    <b-nav tabs class="bg-light">
      <b-nav-item :to="{ name: 'home' }">Начало</b-nav-item>
      <b-nav-item :to="{ name: 'login' }">Вход</b-nav-item>
      <b-nav-item :to="{ name: 'article_search' }">Статьи</b-nav-item>
      <b-nav-item :to="{ name: 'article_editor' }" v-if="isNewArticleToBeShown">Новая статья</b-nav-item>
      <b-nav-item :to="{ name: 'tag' }" v-if="isTagToBeShown">Тэги</b-nav-item>
      <b-nav-item :to="{ name: 'admin' }" v-if="isAdminToBeShown">Admin</b-nav-item>

      <div v-for="item in downloadingFiles" :key="item.uin">
          <b-nav-item v-if="item.downloadedSize < item.size">{{ Math.round(item.downloadedSize/item.size*100)}}%</b-nav-item>
      </div>

    </b-nav>

    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",

  computed: {
    role: function() {
      return this.$store.getters["auth/giveRole"];
    },

    isNewArticleToBeShown: function() {
      return this.role == "editor" || this.role == "admin";
    },

    isTagToBeShown: function() {
      return this.role == "editor" || this.role == "admin";
    },

    isAdminToBeShown: function() {
      return this.role == "admin";
    },

    downloadingFiles: function() {
      return this.$store.getters["download/give"];
    }
  },

  methods: {}
};
</script>

<style>
.red-text {
  color: orange !important;
}
</style>
