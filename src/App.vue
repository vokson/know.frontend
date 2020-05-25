<template>
  <div id="app">
    <notifications group="notify-group" />

    <b-nav tabs class="bg-light">
      <b-nav-item :to="{ name: 'home' }">Начало</b-nav-item>
      <b-nav-item :to="{ name: 'login' }">Вход</b-nav-item>
      <b-nav-item :to="{ name: 'article_search' }">Статьи</b-nav-item>
      <b-nav-item :to="{ name: 'tag' }" v-if="isTagToBeShown">Тэги</b-nav-item>
      <b-nav-item :to="{ name: 'admin' }" v-if="isAdminToBeShown">Admin</b-nav-item>
    </b-nav>

    <router-view />
  </div>
</template>

<script>
export default {
  computed: {
    role: function() {
      return this.$store.getters["auth/giveRole"];
    },

    isTagToBeShown: function() {
      return this.role == "editor" || this.role == "admin";
    },

    isAdminToBeShown: function() {
      return this.role == "admin";
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
