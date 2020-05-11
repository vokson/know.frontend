<template>
  <div id="app">
    <notifications group="notify-group" />

    <b-nav
      tabs
      class='bg-light'
    >
      <b-nav-item :to="{ name: 'home' }">{{ 'Начало' }}</b-nav-item>
      <b-nav-item :to="{ name: 'login' }">{{ 'Вход' }}</b-nav-item>
      <!-- <b-nav-item :to="{ name: 'log' }">{{ (language == 'RUS') ? 'Лог' : 'Log' }}</b-nav-item>
      <b-nav-item :to="{ name: 'title' }">{{ (language == 'RUS') ? 'Титулы' : 'Title' }}</b-nav-item>
      <b-nav-item :to="{ name: 'docs' }">{{ (language == 'RUS') ? 'Документы' : 'Docs' }}</b-nav-item>
      <b-nav-item :to="{ name: 'news' }">{{ (language == 'RUS') ? 'Новости' : 'News' }}</b-nav-item>
      <b-nav-item :to="{ name: 'stat' }">{{ (language == 'RUS') ? 'Статистика' : 'Statistic' }}</b-nav-item>
      <b-nav-item :to="{ name: 'checker' }">{{ (language == 'RUS') ? 'Проверяшка' : 'Checker' }} </b-nav-item>
      <b-nav-item :to="{ name: 'sender' }">{{ (language == 'RUS') ? 'Отправка' : 'Sender' }} </b-nav-item>
      <b-nav-item :to="{ name: 'pdf_merge' }">
        {{ (language == 'RUS') ? 'Пакуй' : 'Merge PDF' }}
      </b-nav-item> -->
      
      <b-nav-item :to="{ name: 'admin' }">Admin</b-nav-item>
      <!-- 
      <b-nav-item
        :to="{ name: 'log' }"
        v-on:click="onNewMessagesClick"
      >
      
        <span class="badge badge-danger">{{countOfLogNewMessages}}</span>
      </b-nav-item>
      <b-nav-item :to="{ name: 'sender' }">
        <span class="badge badge-success">{{countOfSenderFolders}}</span>
      </b-nav-item> -->
    </b-nav>

    <router-view />

  </div>
</template>

<script>

export default {

  mounted: function () {

    this.$nextTick(function () {

      this.$store.commit('setAccessTokenUsingCookie');
      this.$store.dispatch('auth/loginByToken', this.$store.state.user.access_token);

    })
  },

  computed: {

    // language: function () {
    //   return this.$store.state.language;
    // },

    // countOfLogNewMessages: function () {
    //   return this.$store.getters['log/giveCountOfNewMessages'];
    // },

    // countOfSenderFolders: function () {
    //   return this.$store.getters['sender/giveCountOfFolders'];
    // }
  },

  methods: {

    // refreshCountOfNewMessages: function () {
    //   if (this.$store.state.user.access_token != "") {
    //     this.$store.dispatch('log/getCountOfNewMessages', {});
    //   }
    // },

    // refreshCountOfFolders: function () {
    //   if (this.$store.state.user.access_token != "") {
    //     this.$store.dispatch('sender/getCountOfFolders', {});
    //   }
    // },

    // onNewMessagesClick: function () {
    //   this.$store.commit('log/setIsNewMessagesToBeShown', true, { root: true });
    // }
  },

  // timers: {
  //   refreshCountOfNewMessages: { time: 10000, autostart: true, repeat: true },
  //   refreshCountOfFolders: { time: 10000, autostart: true, repeat: true }
  // },


};
</script>

<style>
.red-text {
  color: orange !important;
}
</style>
