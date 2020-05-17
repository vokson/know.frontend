<template>
  <div>

    <div class="container">
      <div class="row">
        <div class='col-8'>
          <div class='row'>
            <div class="col">
              <h3 >СтроЗнайка
                <span class="actual_version_color">(v.{{version}})</span>
              </h3>
            </div>
          </div>
          <div class="row">

            <!-- <div class="col-5">
              <p v-if="language === 'RUS'">Choose language:</p>
              <p v-else-if="language === 'ENG'">Выберите язык:</p>
            </div>

            <div class="col-5">
              <b-form-radio-group
                id="language-radio"
                v-model="choose_language"
                name="radioSubComponent"
              >
                <b-form-radio value="RUS">RU</b-form-radio>
                <b-form-radio value="ENG">EN</b-form-radio>
              </b-form-radio-group>
            </div> -->

          </div>

          <div class="row">
            <div class="col-5">
              <p> E-mail:</p>
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
          <div
            v-if="isDefaultPassword === true"
            class="row"
          >
            <div class="col-5">
              <span class="badge badge-danger" >У вас стандартный пароль. Смените его.</span>
              <!-- <span
                v-else-if="language === 'ENG'"
                class="badge badge-danger"
              >You have default password. Change it.</span> -->
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- <div class="container">
      <div class="row">
        <h5 v-if="language === 'RUS'">Ваши настройки</h5>
        <h5 v-else-if="language === 'ENG'">Your settings</h5>
      </div>

      <div
        v-for="item in settings"
        :key="item.name"
        class="row"
      >

        <div class="col-6">
          <p v-if="language === 'RUS'">{{ item.description_RUS}}</p>
          <p v-if="language === 'ENG'">{{ item.description_ENG}}</p>
        </div>
        <div class="col-3">
          <input
            v-if="item.is_switchable == 0"
            type="text"
            class="form-control"
            v-model="item.value"
          >
          <input
            v-if="item.is_switchable == 1"
            type="checkbox"
            class="form-check-input user_setting_checkbox"
            v-model="item.value"
          >
        </div>

      </div>

      <div class="row">

        <div class="col-2">
          <button
            type="button"
            class="btn btn-primary"
            v-on:click="getUserSettings"
          >
            <div v-if="language === 'RUS'">Обновить</div>
            <div v-if="language === 'ENG'">Refresh</div>
          </button>
        </div>

        <div class="col-1">
          <button
            type="button"
            class="btn btn-danger"
            v-on:click="setUserSettings"
          >
            <div v-if="language === 'RUS'">Сохранить</div>
            <div v-if="language === 'ENG'">Save</div>
          </button>
        </div>

      </div>

    </div> -->

    <div class="container">
      <div class="row">
        <h5>Сменить пароль (не менее 4-х символов, без пробелов)</h5>
      </div>

      <div class="row">
        <div class="col-5">
          <p>Новый пароль:</p>
        </div>
        <div class="col-2">
          <input
            type="password"
            v-model="new_password_1"
          />
        </div>
        <div class="col-1">
          <span
            v-if="isNewPasswordOk_1 === true"
            class="badge badge-success"
          >OK</span>
          <span
            v-else
            class="badge badge-danger"
          >FAIL</span>
        </div>
      </div>

      <div class="row">
        <div class="col-5">
          <p>Новый пароль еще раз:</p>
        </div>
        <div class="col-2">
          <input
            type="password"
            v-model="new_password_2"
          />
        </div>
        <div class="col-1">
          <span
            v-if="isNewPasswordOk_2 === true"
            class="badge badge-success"
          >OK</span>
          <span
            v-else
            class="badge badge-danger"
          >FAIL</span>
        </div>
      </div>

      <div
        v-if="isNewPasswordOk_1 === true && isNewPasswordOk_2 === true"
        class="row"
      >
        <div class="col-1">
          <button
            type="button"
            class="btn btn-danger"
            v-on:click="changePassword"
          >Сохранить</button>
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
          <p>1.0.0 - ??.??.2020</p>
        </div>
        <div class="col-4">
          <p>Первый релиз</p>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: "Home",


  data: function () {
    return {
      selected: "",
      choose_language: "",
      new_password_1: "",
      new_password_2: "",
      version: '1.0.0'
    };
  },

  mounted: function () {

    this.$nextTick(function () {
      this.$store.dispatch('auth/loginByToken', {});
      // this.getUserSettings();
    })
  },

  computed: {

    isNewPasswordOk_1: function () {
      return (this.new_password_1.indexOf(" ") != -1 || this.new_password_1.length < 4) ? false : true;
    },

    isNewPasswordOk_2: function () {
      return ((this.new_password_2 === this.new_password_1) && (this.isNewPasswordOk_1 === true)) ? true : false;
    },

    isDefaultPassword: function () {
      return this.$store.getters["auth/giveIsDefaultPassword"];
    },

    email: function () {
      return this.$store.getters["auth/giveEmail"];
    },

    name: function () {
      return this.$store.getters["auth/giveName"];
    },

    surname: function () {
      return this.$store.getters["auth/giveSurname"];
    },

    role: function () {
      return this.$store.getters["auth/giveRole"];
    },

    // settings: function () {
    //   return this.$store.getters['user_settings/give'];
    // }

  },

  methods: {
    changePassword: function () {
      this.$store.dispatch('auth/changePassword', {
        password: window.$sha256(this.new_password_1)
      });
    },

    // getUserSettings: function () {
    //   this.$store.dispatch('user_settings/get');
    // },

    // setUserSettings: function () {
    //   this.$store.dispatch('user_settings/set');
    // },

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