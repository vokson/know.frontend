<template>
  <div>

    <div class="container">
      <div class="row">
        <div class="col">
          <h3>Действия и роли</h3>
        </div>
      </div>

      <div class="row" />

      <div
        v-for="item in items"
        :key="item.name"
        class="row align-items-center"
      >

        <div class="col-8">
          <p>{{ item.name}}</p>
        </div>
        <div class="col-4">
          <input
            type="text"
            class="form-control"
            v-model="item.value"
          >
        </div>

      </div>

      <div class="row">

        <div class="col-1">
          <button
            type="button"
            class="btn btn-primary"
            v-on:click="get"
          >Обновить</button>
        </div>

        <div class="col-1">
          <button
            type="button"
            class="btn btn-danger"
            v-on:click="set"
          >Сохранить</button>
        </div>

      </div>

    </div>

  </div>

</template>

<script>
export default {
  name: "Action",

  data: function () {
    return {};
  },

  mounted: function () {
    this.$nextTick(function () {
      this.get();
    })

  },


  computed: {
    listOfActions: function () {
      return this.$store.getters['action/actions'];
    },

    listOfRoles: function () {
      return this.$store.getters['action/roles'];
    }
  },

  methods: {
    get: function () {
      this.$store.dispatch('action/get');
    },

    set: function () {
      this.$store.dispatch('action/set');
    },
  }
};
</script>