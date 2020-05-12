<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h3>Список пользователей</h3>
      </div>
    </div>

    <div class="row">
      <div class="col-4">
        <div class="row">
          <div class="col">
            <label>ID: {{targetItem.id}}</label>
          </div>
        </div>

        <div class="row">
          <div class="col-5">
            <label>E-mail</label>
          </div>
          <div class="col-7">
            <input type="text" class="form-control" v-model="targetItem.email" />
          </div>
        </div>

        <div class="row">
          <div class="col-5">
            <label>Фамилия</label>
          </div>
          <div class="col-7">
            <input type="text" class="form-control" v-model="targetItem.surname" />
          </div>
        </div>

        <div class="row">
          <div class="col-5">
            <label>Имя</label>
          </div>
          <div class="col-7">
            <input type="text" class="form-control" v-model="targetItem.name" />
          </div>
        </div>

        <div class="row">
          <div class="col-5">
            <label>Роль</label>
          </div>
          <div class="col-7">
            <input type="text" class="form-control" v-model="targetItem.role" />
          </div>
        </div>

        <div class="row">
          <div class="col-5">
            <label>Активен?</label>
          </div>
          <div class="col-7">
            <input type="text" class="form-control" v-model="targetItem.active" />
          </div>
        </div>

        <div class="row">
          <div class="col-5">
            <label>Разрешенная область</label>
          </div>
          <div class="col-7">
            <input type="text" class="form-control" v-model="targetItem.permission_expression" />
          </div>
        </div>

        <div v-if="isNewItemMayBeAdded == true" class="row">
          <div class="col-5" />
          <div class="col-7">
            <button type="button" class="btn btn-block btn-primary" v-on:click="addItem">Добавить</button>
          </div>
        </div>

        <div v-else class="row">
          <div class="col-5" />
          <div class="col-12">
            <div class="row">
              <div class="col">
                <button
                  type="button"
                  class="btn btn-block btn-warning"
                  v-on:click="modifyItem"
                >Изменить</button>
              </div>
              <div class="col">
                <button
                  type="button"
                  class="btn btn-block btn-danger"
                  v-on:click="deleteItem"
                >Удалить</button>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <button
                  type="button"
                  class="btn btn-block btn-danger"
                  v-on:click="setDefaultPassword"
                >Сбросить пароль</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <br />
    <div class="row">
      <div class="col">
        <button type="button" class="btn btn-block btn-success" v-on:click="getItems">
          Поиск
         <span class="badge badge-light">{{countOfItems}}</span>
        </button>
      </div>
    </div>

    <div class="row">
      <table class="table table-striped">
        <thead>
          <tr class="text-center">
            <th>ID</th>
            <th>E-mail</th>
            <th>Фамилия</th>
            <th>Имя</th>
            <th>Роль</th>
            <th>Активен?</th>
          </tr>
        </thead>
        <tbody>
          <tr v-on:keyup.enter.prevent="getItems" class="text-center">
            <td></td>
            <td>
              <input type="text" v-model="search.email" />
            </td>
            <td>
              <input type="text" v-model="search.surname" />
            </td>
            <td>
              <input type="text" v-model="search.name" />
            </td>
            <td>
              <input type="text" v-model="search.role" />
            </td>
            <td>
              <input type="text" v-model="search.active" />
            </td>
          </tr>

          <tr
            class="text-center"
            v-for="item in items"
            :key="item.id"
            v-on:click="editItem(item.id)"
          >
            <td>{{item.id}}</td>
            <td>{{item.email}}</td>
            <td>{{item.surname}}</td>
            <td>{{item.name}}</td>
            <td>{{item.role}}</td>
            <td>{{item.active}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "User",

  data: function() {
    return {
      isNewItemMayBeAdded: true,

      targetItem: {
        id: null,
        email: "",
        surname: "",
        name: "",
        role: "",
        active: "",
        permission_expression: ""
      },

      search: {
        email: "",
        surname: "",
        name: "",
        role: "",
        active: ""
      }
    };
  },

  computed: {
    items: function() {
      return this.$store.getters["users/give"];
    },

    countOfItems: function() {
      return this.items == null ? 0 : this.items.length;
    }
  },

  methods: {
    getItems: function() {
      this.$store.dispatch("users/get", {
        email: this.search.email,
        surname: this.search.surname,
        name: this.search.name,
        role: this.search.role,
        active: this.search.active
      });
    },

    addItem: function() {
      this.$store.dispatch("users/create", {
        email: this.targetItem.email,
        surname: this.targetItem.surname,
        name: this.targetItem.name,
        role: this.targetItem.role,
        active: this.targetItem.active,
        permission_expression: this.targetItem.permission_expression
      });
    },

    modifyItem: function() {
      this.$store.dispatch("users/set", {
        id: this.targetItem.id,
        email: this.targetItem.email,
        surname: this.targetItem.surname,
        name: this.targetItem.name,
        role: this.targetItem.role,
        active: this.targetItem.active,
        permission_expression: this.targetItem.permission_expression
      });
    },

    setDefaultPassword: function() {
      this.$store.dispatch("users/setDefaultPassword", {
        id: this.targetItem.id
      });
    },

    deleteItem: function() {
      this.$store.dispatch("users/del", {
        id: this.targetItem.id
      });
    },

    editItem: function(id) {
      let itemToBeModified = this.items.filter(obj => {
        return obj.id === id;
      })[0];

      this.targetItem.id = itemToBeModified.id;
      this.targetItem.email = itemToBeModified.email;
      this.targetItem.surname = itemToBeModified.surname;
      this.targetItem.name = itemToBeModified.name;
      this.targetItem.role = itemToBeModified.role;
      this.targetItem.active = itemToBeModified.active;
      this.targetItem.permission_expression =
        itemToBeModified.permission_expression;

      this.isNewItemMayBeAdded = false;
    }
  }
};
</script>

<style>
.text-center {
  text-align: center;
}
</style>