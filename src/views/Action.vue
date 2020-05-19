<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col">
          <h3>Действия и роли</h3>
        </div>
      </div>

      <div class="row" />

      <div class="row">
        <div class="col">
          <div>
            <table class="table-responsive">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th
                    scope="col"
                    v-for="(role, index) in listOfRoles"
                    :key="`role-${index}`"
                  >{{ role }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(action, index) in listOfActions" :key="`action-${index}`">
                  <th scope="row">{{ action }}</th>
                  <td
                    scope="col"
                    v-for="(role, index) in listOfRoles"
                    :key="`role-${index}`"
                    align="center"
                  >
                    <input type="checkbox" id="checkbox" v-model="pairs[action][role]" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- <div
        v-for="actionName in listOfActions"
        v-bind:key="actioName"
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

      </div>-->

      <div class="row">
        <div class="col-2">
          <button type="button" class="btn btn-primary" v-on:click="get">Обновить</button>
        </div>

        <div class="col-2">
          <button type="button" class="btn btn-danger" v-on:click="set">Сохранить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Action",

  data: function() {
    return {};
  },

  mounted: function() {
    this.$nextTick(function() {
      this.get();
    });
  },

  computed: {
    pairs: function() {
      return this.$store.getters["action/give"];
    },

    listOfRoles: function() {
      return (this.pairs === null) ? null : Object.keys(this.pairs[this.listOfActions[0]]);
    },

    listOfActions: function() {
      return (this.pairs === null) ? null : Object.keys(this.pairs);
    }
  },

  methods: {
    get: function() {
      this.$store.dispatch("action/get");
      // this.$store.dispatch('action/getListOfActions');
      // this.$store.dispatch('action/getListOfPairs');
      // this.$store.dispatch('action/getListOfRoles');
    },

    set: function() {
      let items = {};

      // Заменяем boolean, получаемые при смене checkbox, на числа
      this.listOfActions.forEach(action => {
        items[action] = {};
        this.listOfRoles.forEach(role => {
          items[action][role] = Number(this.pairs[action][role]);
        });
      });

      this.$store.dispatch("action/set", {
        items: items
      });
    }
  }
};
</script>