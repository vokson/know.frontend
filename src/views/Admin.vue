<template>
  <div class="container">

    <b-nav vertical class="w-50">

      <b-nav-item :to="{ name: 'user' }">
        <h4>Пользователи</h4>
      </b-nav-item>

      <b-nav-item :to="{ name: 'setting' }">
        <h4>Настройки</h4>
      </b-nav-item>

      <b-nav-item v-on:click="getDatabaseBackup">
        <h4>Резервная копия базы данных</h4>
      </b-nav-item>

    </b-nav>

  </div>

</template>

<script>
export default {
  name: "Admin",

  data: function () {
    return {};
  },

  methods: {
    getDatabaseBackup: function () {
      this.$store.dispatch("service/getDatabaseBackup");
    }

  }

};
</script>