<template>
  <div id="app">
    <notifications group="notify-group" />

    <b-nav
      tabs
      class='bg-light'
    >
      <b-nav-item :to="{ name: 'home' }">Начало</b-nav-item>
      <b-nav-item :to="{ name: 'login' }">Вход</b-nav-item>
      <!-- <b-nav-item :to="{ name: 'article_editor' }">Статья - Редактирование</b-nav-item> -->
      <!-- <b-nav-item :to="{ name: 'article_reader' }">Статья - Чтение</b-nav-item> -->
      <b-nav-item :to="{ name: 'article_search' }">Статьи</b-nav-item>
      <b-nav-item :to="{ name: 'tag' }">Тэги</b-nav-item>
      <b-nav-item :to="{ name: 'admin' }">Admin</b-nav-item>
    </b-nav>

    <router-view />

  </div>
</template>

<script>

export default {};

//   mounted: function () {

//     this.$nextTick(function () {

//       // this.$store.commit('setAccessTokenUsingCookie');
//       // this.$store.dispatch('auth/loginByToken', this.$store.state.user.access_token);

//     })
//   },

//   computed: {

//     // language: function () {
//     //   return this.$store.state.language;
//     // },

//     // countOfLogNewMessages: function () {
//     //   return this.$store.getters['log/giveCountOfNewMessages'];
//     // },

//     // countOfSenderFolders: function () {
//     //   return this.$store.getters['sender/giveCountOfFolders'];
//     // }
//   },

//   methods: {

//     // refreshCountOfNewMessages: function () {
//     //   if (this.$store.state.user.access_token != "") {
//     //     this.$store.dispatch('log/getCountOfNewMessages', {});
//     //   }
//     // },

//     // refreshCountOfFolders: function () {
//     //   if (this.$store.state.user.access_token != "") {
//     //     this.$store.dispatch('sender/getCountOfFolders', {});
//     //   }
//     // },

//     // onNewMessagesClick: function () {
//     //   this.$store.commit('log/setIsNewMessagesToBeShown', true, { root: true });
//     // }
//   },

//   // timers: {
//   //   refreshCountOfNewMessages: { time: 10000, autostart: true, repeat: true },
//   //   refreshCountOfFolders: { time: 10000, autostart: true, repeat: true }
//   // },


// };
</script>

<style>
.red-text {
  color: orange !important;
}
</style>
