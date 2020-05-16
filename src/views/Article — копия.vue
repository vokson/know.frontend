<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h3 v-if="language === 'RUS'">Журнал событий проекта</h3>
        <h3 v-else-if="language === 'ENG'">Project Log</h3>
      </div>
    </div>

    <div class="row">

      <div class="col-4">

        <div class="row">
          <div class="col">
            <label v-if="language === 'RUS'">Номер записи: {{targetItem.id}}</label>
            <label v-else-if="language === 'ENG'">Item's ID: {{targetItem.id}}</label>
          </div>
        </div>

        <div class="row">
          <div class="col-3">
            <label v-if="language === 'RUS'">Дата</label>
            <label v-else-if="language === 'ENG'">Date</label>
          </div>
          <div class="col-9">
            <datepicker
              v-model="targetItem.date"
              :format="date_format"
              :bootstrap-styling="true"
              :language="ru"
            ></datepicker>
          </div>
        </div>

        <div class="row">
          <div class="col-3">
            <label v-if="language === 'RUS'">От</label>
            <label v-else-if="language === 'ENG'">From</label>
          </div>
          <div class="col-9">
            <select
              class="form-control"
              v-bind:value="targetItem.from"
              v-on:change="targetItem.from = $event.target.value"
            >
              <option
                v-for="item in users"
                :key="item.id"
                v-bind:value="item.id"
              >
                {{item.surname}} {{item.name}}
              </option>
            </select>
          </div>
        </div>

        <div class="row">
          <div class="col-3">
            <label v-if="language === 'RUS'">Кому</label>
            <label v-else-if="language === 'ENG'">To</label>
          </div>
          <div class="col-9">

            <select
              class="form-control"
              v-bind:value="targetItem.to"
              v-on:change="targetItem.to = $event.target.value"
            >
              <option
                v-for="item in users"
                :key="item.id"
                v-bind:value="item.id"
              >{{item.surname}} {{item.name}}</option>
            </select>
          </div>
        </div>

        <div class="row">
          <div class="col-3">

            <label v-if="language === 'RUS'">Титул</label>
            <label v-else-if="language === 'ENG'">Title</label>
          </div>
          <div class="col-9">
            <input
              type="text"
              v-model="targetItem.title"
              class="form-control"
            />
          </div>
        </div>

        <div
          v-if="isNewItemMayBeAdded == true"
          class="row"
        >
          <div class="col-3">
            <img
              src="./img/reverse.jpg"
              width="40"
              height="40"
              v-on:click="switchUsers"
              title="От <> Кому / From <> To"
            >
          </div>

          <div class="col-9">
            <button
              type="button"
              class="btn btn-block btn-primary"
              v-on:click="addItem"
            >
              {{ (language == 'RUS') ? 'Добавить' : 'Add' }}
            </button>
          </div>
          <div class="col-3">
          </div>
          <div class="col-9">
            <button
              type="button"
              class="btn btn-block btn-warning"
              v-on:click="addTaskItem"
            >
              {{ (language == 'RUS') ? 'Добавить TASK' : 'Add TASK' }}
            </button>
          </div>
        </div>

        <div
          v-else
          class="row"
        >
          <div class="col-3">
            <img
              src="./img/plus.png"
              width="40"
              height="40"
              v-on:click="resetToAdd"
              title="Вернуться к Добавить / Back to ADD"
            >
          </div>

          <div class="col-9">
            <div class="row">
              <div class="col">
                <button
                  type="button"
                  class="btn btn-block btn-warning"
                  v-on:click="modifyItem"
                >
                  {{ (language == 'RUS') ? 'Изменить' : 'Modify' }}
                </button>
              </div>
              <div class="col">
                <button
                  type="button"
                  class="btn btn-block btn-danger"
                  v-on:click="deleteItem"
                >
                  {{ (language == 'RUS') ? 'Удалить' : 'Delete' }}
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="col-8">
        <div class="row">
          <div class="col-6">
            <div class="input-group">
              <div class="input-group-prepend">
                <label
                  class="input-group-text"
                  for="inputGroupSelect01"
                >{{ (language == 'RUS') ? 'Добавить к тексту' : 'Add to text' }}</label>
              </div>
              <select
                class="custom-select"
                @change="wordToBeAddedOnChange()"
                v-model="wordToBeAdded"
              >
                <option
                  value=""
                  selected
                >{{ (language == 'RUS') ? 'Выберите' : 'Choose' }}...</option>
                <option value="TQ пришел в ">TQ пришел в</option>
                <option value="Выданы замечания ">Выданы замечания</option>
                <option value="Задание на выполнение чертежей отправлено ">Задание на выполнение чертежей отправлено</option>
                <option value="Замечания от НИПИГАЗ к чертежам ">Замечания от НИПИГАЗ к чертежам</option>
                <option value="Замечания пришли ">Замечания пришли</option>
                <option value="Комментарии к расчету на отправку ">Комментарии к расчету на отправку</option>
                <option value="Комментарии к расчету на проверку ">Комментарии к расчету на проверку</option>
                <option value="Комментарии к расчету отправлены в трансмиттале ">Комментарии к расчету отправлены в трансмиттале</option>
                <option value="Комментарии НИИК к исходным чертежам корпуса ">Комментарии НИИК к исходным чертежам корпуса</option>
                <option value="Комплект отправлен в трансмиттале ">Комплект отправлен в трансмиттале</option>
                <option value="Комплект пришел в письме ">Комплект пришел в письме</option>
                <option value="Комплект пришел в трансмиттале ">Комплект пришел в трансмиттале</option>
                <option value="Комплект пришел повторно ">Комплект пришел повторно</option>
                <option value="Ответы ТСМ на комментарии НИИК к исходным чертежам ">Ответы ТСМ на комментарии НИИК к исходным чертежам</option>
                <option value="Отклонено в ">Отклонено в</option>
                <option value="Отправлено на проверку ">Отправлено на проверку</option>
                <option value="Отчет на отправку ">Отчет на отправку</option>
                <option value="Отчет отправлен в трансмиттале ">Отчет отправлен в трансмиттале</option>
                <option value="Отчет отправлен на проверку ">Отчет отправлен на проверку</option>
                <option value="Ошибки пришли в ">Ошибки пришли в</option>
                <option value="Согласовано в ">Согласовано в</option>
                <option value="Создан TASK ">Создан TASK</option>
                <option value="Чертежи отправлены на проверку ">Чертежи отправлены на проверку</option>
              </select>
            </div>
          </div>
        </div>
        <div class="row">
          <div
            class="col"
            id="col-drop-area"
          >
            <editor
              v-if="isDragging == false"
              v-model="targetItem.what"
              :editorToolbar="customEditorToolbar"
            ></editor>
            <div
              v-else
              id="log-drop-area"
            >
              {{ (language == 'RUS') ? 'Брось файл сюда (каждый не более ' + formatBytes(maxFileSize) +')' : 'Drop file here (each not heavier ' + formatBytes(maxFileSize) +')' }}
            </div>
          </div>
        </div>
      </div>

    </div>

    <div class="row">
      <div class="col-4"></div>
      <div class="col-8">

        <div v-if="(targetItem.id != null) && (attachedFiles.length > 0)">
          <a
            href="#"
            v-on:click="downloadAllFiles"
          >{{ (language == 'RUS') ? 'Скачать все файлы zip архивом' : 'Download all files by zip archive' }}</a>
        </div>

        <div
          class="row"
          v-for="item in attachedFiles"
          :key="item.uin"
        >
          <div class="col-1">
            <span
              v-if="item.uploadedSize >= item.size"
              class="badge badge-success"
            >OK</span>
            <span
              v-else
              class="badge badge-warning"
            >{{ Math.round(item.uploadedSize/item.size*100)}}% </span>
          </div>

          <div
            class="col-7"
            v-if="item.id != null"
          >
            <a
              href="#"
              v-on:click="downloadFile(item.id)"
            >{{item.original_name}}</a>
          </div>
          <div
            class="col-7"
            v-else
          >
            {{item.original_name}}
          </div>

          <div class="col-2">
            {{formatBytes(item.size)}}
          </div>
          <div
            class="col-2"
            v-if="item.id != null"
          >
            <button
              type="button"
              class="btn btn-danger btn-sm"
              v-on:click="deleteFile(item.id)"
            >
              Удалить
            </button>
          </div>
        </div>

      </div>
    </div>

    <br />
    <div class="row">
      <div class="col-4">

        <div class="row">
          <div class="col-7">
            {{ (language == 'RUS') ? 'Только последние записи' : 'Only last rows' }}
          </div>
          <div class="col-5">
            <input
              type="checkbox"
              v-model="search.is_only_last"
            >
          </div>
        </div>

        <div class="row">
          <div class="col-7">
            {{ (language == 'RUS') ? 'Только новые сообщения' : 'Only new messages' }}
          </div>
          <div class="col-5">
            <input
              type="checkbox"
              v-bind:checked="search.is_new"
              v-on:click="switchNewMessageSearchCheckBox"
            >
          </div>
        </div>

      </div>

      <div class="col-8">
        <button
          type="button"
          class="btn btn-block btn-success"
          v-on:click="getItems"
        >
          {{ (language == 'RUS') ? 'Найти' : 'Search' }}
          <span class="badge badge-light">{{countOfItems}}</span>
        </button>
      </div>

    </div>

    <div class="row">

      <table class="table table-striped">
        <thead>
          <tr>
            <th class="text-center">ID</th>
            <th class="td-date text-center">Date</th>
            <th class="text-center">Title</th>
            <th class="text-center">From (surname)</th>
            <th class="text-center">What</th>
            <th class="text-center">To (surname)</th>
          </tr>
        </thead>
        <tbody>

          <tr v-on:keyup.enter.prevent="getItems">
            <td> <img
                src="./img/clean.png"
                width="35"
                height="35"
                v-on:click="cleanSearch"
              > </td>
            <td class="td-date">
              <datepicker
                v-model="search.date"
                :format="date_format"
                :bootstrap-styling="true"
                :language="languageForDatePicker"
              ></datepicker>
            </td>
            <td class="text-center"><input
                type="text"
                v-model="search.title"
                placeholder="Титул"
              /></td>
            <td class="text-center"><input
                type="text"
                v-model="search.from"
                placeholder="От (фамилия)"
              /></td>
            <td class="text-center"><input
                type="text"
                v-model="search.what"
                placeholder="Текст"
              /></td>
            <td class="text-center"><input
                type="text"
                v-model="search.to"
                placeholder="Кому (фамилия)"
              /></td>
          </tr>

          <tr
            v-for="item in items"
            :key="item.id"
            v-on:click="editItem(item.id)"
          >
            <td class="text-center">
              <div v-if="item.is_attachment_exist == 1">@{{item.id}}</div>
              <div v-else>{{item.id}}</div>

              <div v-if="item.to == (userSurname + ' ' + userName)">
                <br />
                <input
                  type="checkbox"
                  v-bind:checked="item.is_new"
                  title="Новое сообщение? / Is new message?"
                  v-on:click="modifyIsNewMessageCheckbox(item.id)"
                >
                <br />
                <span
                  v-if="item.is_new"
                  class="badge badge-danger"
                >NEW</span>
              </div>

            </td>
            <td class="text-center">{{formatDate(item.date)}}</td>
            <td class="text-center"><a
                href="#"
                v-on:click="onTitleClick(item.title)"
              >{{item.title}}</a></td>
            <td class="text-center">{{item.from}}</td>
            <td v-html="item.what"></td>
            <td class="text-center">{{item.to}}</td>
          </tr>

        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
import { en, ru } from 'vuejs-datepicker/dist/locale'

export default {
  name: "Article",


  data: function () {
    return {

      date_format: "dd.MM.yyyy",
      en: en,
      ru: ru,
      isNewItemMayBeAdded: true,
      isDragging: false,
      maxFileSize: 500 * 1024 * 1024,
      wordToBeAdded: "",

      customEditorToolbar: [
        ['bold', 'underline'],
        [{ 'list': 'ordered' }, { 'list': 'check' }],
        [{ 'color': [] }, { 'background': [] }],
        ['clean'],
      ],

      targetItem: {
        id: null,
        to: 0,
        from: 0,
        what: "",
        title: "",
        date: new Date()
      },

      search: {
        to: "",
        from: "",
        what: "",
        title: "",
        date: null,
        is_new: null,
        is_only_last: false
      }

    };
  },

  mounted: function () {

    this.$nextTick(function () {
      this.getTitles();
      this.getUsers();
      this.targetItem.from = this.$store.state.user.id;
      this.targetItem.to = 0;

      // Очищаем установленные по умолчанию обработчики событий
      let dropArea = document.getElementById('col-drop-area');

      function preventDefaults (e) {
        e.preventDefault()
        e.stopPropagation()
      }

      ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false)
      });

      ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, this.startDragging, false)
      });

      ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, this.stopDragging, false)
      });

      ['drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, this.handleDrop, false)
      });

    })

    this.showNewMessages();
    this.showRecordForTitle();

  },

  computed: {
    language: function () {
      return this.$store.state.language;
    },

    items: function () {
      return this.$store.getters['log/giveItems'];
    },

    titles: function () {
      return this.$store.getters['title/give'];
    },

    users: function () {
      return this.$store.getters['users/give'];
    },

    countOfItems: function () {
      return (this.items == null) ? 0 : this.items.length;
    },

    attachedFiles: function () {
      return this.$store.getters['log_file/give'];
    },

    // uploadingFiles: function () {
    //   return this.$store.getters['log_file/giveUploadingItems'];
    // },

    userName: function () {
      return this.$store.state.user.name;
    },

    userSurname: function () {
      return this.$store.state.user.surname;
    },

    isNewMessagesToBeShown: function () {
      return this.$store.getters['log/giveIsNewMessagesToBeShown'];
    },

    isRecordForTitleToBeShown: function () {
      return this.$store.getters['log/giveIsRecordForTitleToBeShown'];
    },

    nameOfTitleToBeShown: function () {
      return this.$store.getters['log/giveNameOfTitleToBeShown'];
    },

  },

  methods: {
    formatDate: function (timestamp) {
      let date = new Date();
      date.setTime(timestamp * 1000); // переводим в миллисекунды
      return ("0" + date.getDate()).slice(-2) + '.' + ("0" + (date.getMonth() + 1)).slice(-2) + '.' + date.getFullYear()
    },

    getTitles: function () {
      this.$store.dispatch('title/get', {});
    },

    getUsers: function () {
      this.$store.dispatch('users/get', {});
    },

    getItems: function () {

      let queryObject = {
        to: this.search.to,
        from: this.search.from,
        title: this.search.title,
        what: this.search.what,
        is_only_last: this.search.is_only_last,
        date: (this.search.date == null) ? "" : Math.round(this.search.date.getTime() / 1000)
      };

      if (this.search.is_new !== null) {
        queryObject["is_new"] = this.search.is_new
      }

      this.$store.dispatch('log/getItems', queryObject);
    },

    getFiles: function () {
      this.$store.dispatch('log_file/get', {
        log_id: this.targetItem.id
      });
    },

    deleteFile: function (file_id) {
      this.$store.dispatch('log_file/delete', {
        id: file_id
      });
    },

    downloadFile: function (file_id) {
      this.$store.dispatch('log_file/download', {
        id: file_id
      });
    },

    downloadAllFiles: function () {
      this.$store.dispatch('log_file/downloadAll', {
        id: this.targetItem.id
      });
    },

    getTargetItemTitleId: function () {
      //    Ищем id от title
      let localTitle = this.titles.filter(obj => {
        return obj.name === this.targetItem.title
      });

      return (localTitle.length > 0) ? localTitle[0].id : 0;
    },

    addItem: function () {

      let titleId = this.getTargetItemTitleId();

      if (titleId == 0) {
        this.$store.dispatch('notify/showNotifyByCode', 303, { root: true });
        return;
      }

      this.$store.dispatch('log/setItem', {
        to: this.targetItem.to,
        from: this.targetItem.from,
        title: titleId,
        what: this.targetItem.what,
        is_new: this.targetItem.is_new,
        date: Math.round(this.targetItem.date.getTime() / 1000)
      });
    },

    addTaskItem: function () {

      let titleId = this.getTargetItemTitleId();

      if (titleId == 0) {
        this.$store.dispatch('notify/showNotifyByCode', 303, { root: true });
        return;
      }

      this.$store.dispatch('task/create', {
        title: titleId,
      });
    },

    modifyIsNewMessageCheckbox: function (id) {
      this.$store.dispatch('log/switchNewMessage', { id: id });
    },


    modifyItem: function () {

      let titleId = this.getTargetItemTitleId();

      if (titleId == 0) {
        this.$store.dispatch('notify/showNotifyByCode', 303, { root: true });
        return;
      }

      this.$store.dispatch('log/setItem', {
        id: this.targetItem.id,
        to: this.targetItem.to,
        from: this.targetItem.from,
        title: titleId,
        what: this.targetItem.what,
        date: Math.round(this.targetItem.date.getTime() / 1000)
      });
    },

    deleteItem: function () {
      this.$store.dispatch('log/deleteItem', {
        id: this.targetItem.id,
      });
    },

    editItem: function (id) {

      let itemToBeModified = this.items.filter(obj => {
        return obj.id === id
      })[0];

      let localTo = this.users.filter(obj => {
        return (obj.surname + ' ' + obj.name) === itemToBeModified.to
      })[0].id;

      let localFrom = this.users.filter(obj => {
        return (obj.surname + ' ' + obj.name) === itemToBeModified.from
      })[0].id;

      this.targetItem.id = itemToBeModified.id;
      this.targetItem.title = itemToBeModified.title;
      this.targetItem.to = localTo;
      this.targetItem.from = localFrom;
      this.targetItem.what = itemToBeModified.what;

      let date = new Date();
      date.setTime(itemToBeModified.date * 1000);
      this.targetItem.date = date;

      this.isNewItemMayBeAdded = false;

      this.getFiles();
    },

    switchUsers: function () {
      let temp = this.targetItem.to;
      this.targetItem.to = this.targetItem.from;
      this.targetItem.from = temp;
    },

    resetToAdd: function () {
      this.targetItem.id = null;
      this.isNewItemMayBeAdded = true;
      this.targetItem.date = new Date();
    },

    startDragging: function () {
      this.isDragging = true;
    },

    stopDragging: function () {
      this.isDragging = false;
    },

    uploadFile: function (file) {

      if (this.targetItem.id == null) {
        this.$store.dispatch('notify/showNotifyByCode', "E_FILE_003", { root: true });
        return;
      }

      if (file.size > this.maxFileSize) {
        this.$store.dispatch('notify/showNotifyByCode', "E_FILE_004", { root: true });
        return;
      }

      let uin = this.guid();
      let progressCallback = this.updateProgress.bind(this);

      let badUploadFunction = function () {
        this.$store.commit('log_file/deleteSuccess', uin, { root: true });
      };

      this.$store.dispatch('log_file/upload', {
        log_file: file,
        log_id: this.targetItem.id,
        uin: uin,

        progressCallback: function (e) {
          progressCallback(uin, e.loaded, e.total)
        },

        badFileUploadCallback: badUploadFunction.bind(this)

      });

    },

    handleDrop: function (e) {
      let dt = e.dataTransfer;
      let files = dt.files;
      files = [...files];
      files.forEach(this.uploadFile);
    },

    formatBytes: function (bytes, decimals) {
      if (bytes == 0) return '0 Bytes';
      var k = 1024,
        dm = decimals || 2,
        sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    },

    guid: function () {
      function s4 () {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    },

    updateProgress: function (uin, uploadedBytes, totalBytes) {

      this.$store.commit('log_file/updateProgress', {
        uin: uin,
        size: totalBytes,
        uploadedSize: uploadedBytes
      });

    },

    switchNewMessageSearchCheckBox: function () {
      this.search.is_new = (this.search.is_new === null) ? true : null;
    },

    cleanSearch: function () {
      this.search.to = "";
      this.search.from = "";
      this.search.what = "";
      this.search.title = "";
      this.search.date = null;
    },

    showNewMessages: function () {
      if (this.isNewMessagesToBeShown == true) {
        this.search.is_new = true;
        this.search.is_only_last = false;
        this.cleanSearch();
        this.getItems();
        this.$store.commit('log/setIsNewMessagesToBeShown', false, { root: true });
      }
    },

    wordToBeAddedOnChange: function () {
      // console.log('HERE');
      this.targetItem.what = this.targetItem.what + this.wordToBeAdded;
    },

    showRecordForTitle: function () {
      if (this.isRecordForTitleToBeShown == true) {
        this.search.is_new = null;
        this.search.is_only_last = false;
        this.cleanSearch();
        this.search.title = this.nameOfTitleToBeShown;
        this.getItems();
        this.$store.commit('log/setIsRecordForTitleToBeShown', false, { root: true });
      }

    },

    onTitleClick: function (title) {
      this.$store.commit('title/setNameOfTitleToBeShown', title, { root: true });
      this.$store.commit('title/setIsRecordForTitleToBeShown', true, { root: true });
      this.$router.push('title');
    }

  },

  watch: {
    isNewMessagesToBeShown: function () {
      this.showNewMessages();
    },

    isRecordForTitleToBeShown: function () {
      this.showRecordForTitle();
    }
  }
};
</script>

<style>
.td-date {
  width: 130px;
}

.td-title {
  width: 120px;
}

.text-center {
  text-align: center;
}

#log-drop-area {
  border: 2px dashed #ccc;
  border-radius: 20px;
  height: 200px;
  /* font-family: sans-serif; */
  margin-top: 40px;
  padding-top: 80px;
  text-align: center;
  /* vertical-align: middle; */
  font: 21pt bold arial;
  color: gray;
}
</style>