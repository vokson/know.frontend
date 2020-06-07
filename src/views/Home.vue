<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-8">
          <div class="row">
            <div class="col">
              <h3>
                Знайка
                <span class="actual_version_color">(v.{{version}})</span>
              </h3>
            </div>
          </div>
          <div class="row"></div>

          <div class="row">
            <div class="col-5">
              <p>E-mail:</p>
            </div>
            <div class="col-5">
              <p>{{email}}</p>
            </div>
          </div>

          <div class="row">
            <div class="col-5">
              <p>Имя:</p>
            </div>
            <div class="col-5">
              <p>{{name}}</p>
            </div>
          </div>

          <div class="row">
            <div class="col-5">
              <p>Фамилия:</p>
            </div>
            <div class="col-5">
              <p>{{surname}}</p>
            </div>
          </div>

          <div class="row">
            <div class="col-5">
              <p>Права доступа:</p>
            </div>
            <div class="col-5">
              <p>{{role}}</p>
            </div>
          </div>
          <div v-if="isDefaultPassword === true" class="row">
            <div class="col-5">
              <span class="badge badge-danger">У вас стандартный пароль. Смените его.</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <h5>Сменить пароль (не менее 4-х символов, без пробелов)</h5>
      </div>

      <div class="row">
        <div class="col-5">
          <p>Новый пароль:</p>
        </div>
        <div class="col-2">
          <input type="password" v-model="new_password_1" />
        </div>
        <div class="col-1">
          <span v-if="isNewPasswordOk_1 === true" class="badge badge-success">OK</span>
          <span v-else class="badge badge-danger">FAIL</span>
        </div>
      </div>

      <div class="row">
        <div class="col-5">
          <p>Новый пароль еще раз:</p>
        </div>
        <div class="col-2">
          <input type="password" v-model="new_password_2" />
        </div>
        <div class="col-1">
          <span v-if="isNewPasswordOk_2 === true" class="badge badge-success">OK</span>
          <span v-else class="badge badge-danger">FAIL</span>
        </div>
      </div>

      <div v-if="isNewPasswordOk_1 === true && isNewPasswordOk_2 === true" class="row">
        <div class="col-1">
          <button type="button" class="btn btn-danger" v-on:click="changePassword">Сохранить</button>
        </div>
      </div>

      <div class="row">
        <br />
      </div>

      <div class="row">
        <h5>История изменений</h5>
      </div>

      <div class="row actual_version_color">
        <div class="col-2">
          <p>1.1.0 - 07.06.2020</p>
        </div>
        <div class="col-8">
          <p>Добавлен индикатор скачивания файлов.</p>
        </div>
      </div>
      

      <div class="row">
        <div class="col-2">
          <p>1.0.3 - 27.05.2020</p>
        </div>
        <div class="col-8">
          <p>Добавлен фильтр "last:" в поиск. Добавлено количество найденных статей на кнопке "Поиск". Добавлен фильтр "limit:20" в качестве начала поиска.</p>
        </div>
      </div>


      <div class="row">
        <div class="col-2">
          <p>1.0.2 - 27.05.2020</p>
        </div>
        <div class="col-8">
          <p>Исправлено отображение изображений статей в режиме "Чтение"</p>
        </div>
      </div>

      <div class="row">
        <div class="col-2">
          <p>1.0.1 - 26.05.2020</p>
        </div>
        <div class="col-8">
          <p>Добавлена кнопка "Новая статья"</p>
        </div>
      </div>


      <div class="row">
        <div class="col-2">
          <p>1.0.0 - 25.05.2020</p>
        </div>
        <div class="col-8">
          <p>Первый релиз</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",

  data: function() {
    return {
      selected: "",
      choose_language: "",
      new_password_1: "",
      new_password_2: "",
      version: "1.1.0"
    };
  },

  mounted: function() {
    this.$nextTick(function() {
      this.$store.dispatch("auth/loginByToken", {});
      // this.getUserSettings();
    });
  },

  computed: {
    isNewPasswordOk_1: function() {
      return this.new_password_1.indexOf(" ") != -1 ||
        this.new_password_1.length < 4
        ? false
        : true;
    },

    isNewPasswordOk_2: function() {
      return this.new_password_2 === this.new_password_1 &&
        this.isNewPasswordOk_1 === true
        ? true
        : false;
    },

    isDefaultPassword: function() {
      return this.$store.getters["auth/giveIsDefaultPassword"];
    },

    email: function() {
      return this.$store.getters["auth/giveEmail"];
    },

    name: function() {
      return this.$store.getters["auth/giveName"];
    },

    surname: function() {
      return this.$store.getters["auth/giveSurname"];
    },

    role: function() {
      return this.$store.getters["auth/giveRole"];
    }

  },

  methods: {
    changePassword: function() {
      this.$store.dispatch("auth/changePassword", {
        password: window.$sha256(this.new_password_1)
      });
    }

  }
};
</script>

<style>
.container {
  margin-top: 5%;
}

.actual_version_color {
  color: red;
}

.user_setting_checkbox {
  vertical-align: middle;
}
</style>