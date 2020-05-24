<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h3>Статья {{articleUin}} : {{articleVersion}}</h3>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <input type="text" class="form-control" placeholder="Название" v-model="articleSubject" />
      </div>
    </div>

    <div class="row">
      <div class="col" id="col-drop-area">
        <editor
          v-if="isDragging == false"
          v-model="articleBody"
          :editorToolbar="customEditorToolbar"
        ></editor>
        <div
          v-else
          id="article-drop-area"
        >{{'Брось файл сюда (каждый не более ' + formatBytes(maxFileSize) +')'}}</div>
      </div>
    </div>

    <div class="row">
      <div class="col-4"></div>
      <div class="col-8">
        <div v-if="(articleUin != null) && (attachedFiles.length > 0)">
          <a href="#" v-on:click="downloadAllFiles">Скачать все файлы zip архивом</a>
        </div>

        <div class="row" v-for="item in attachedFiles" :key="item.uin">
          <div class="col-1">
            <span v-if="item.uploadedSize >= item.size" class="badge badge-success">OK</span>
            <span
              v-else
              class="badge badge-warning"
            >{{ Math.round(item.uploadedSize/item.size*100)}}%</span>
          </div>

          <div class="col-7" v-if="item.id != null">
            <a href="#" v-on:click="downloadFile(item.id)">{{item.original_name}}</a>
          </div>
          <div class="col-7" v-else>{{item.original_name}}</div>

          <div class="col-2">{{formatBytes(item.size)}}</div>
          <div class="col-2" v-if="item.id != null">
            <button
              type="button"
              class="btn btn-danger btn-sm"
              v-on:click="deleteFile(item.id)"
            >Удалить</button>
          </div>
        </div>
      </div>
    </div>

    <!-- <br /> -->

    <div class="row">
      <div class="col-12">
        <button type="button" class="btn btn-block btn-success" v-on:click="saveArticle">Сохранить</button>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <button
          type="button"
          class="btn btn-block btn-success"
          v-on:click="saveArticleTags"
        >Сохранить ключевые слова</button>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <button type="button" class="btn btn-block btn-danger" v-on:click="deleteArticle">Удалить</button>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <button
          type="button"
          class="btn btn-block btn-warning"
          v-on:click="gotoReader"
        >Читать (не забудь сохранить)</button>
      </div>
    </div>

    <br />

    <div class="row">
      <div class="col-12">
        <div v-for="(elem) in mixedTags" :key="elem.name" class="row align-items-center">
          <input type="checkbox" id="checkbox" v-model="elem.isChecked" />
          <label for="checkbox">{{ elem.name }}</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { en, ru } from "vuejs-datepicker/dist/locale";

export default {
  name: "ArticleEditor",

  data: function() {
    return {
      date_format: "dd.MM.yyyy",
      // en: en,
      // ru: ru,
      // isNewItemMayBeAdded: true,
      isDragging: false,
      maxFileSize: 100 * 1024 * 1024,
      // wordToBeAdded: "",

      customEditorToolbar: [
        ["bold", "underline"],
        [{ list: "ordered" }, { list: "check" }],
        [{ color: [] }, { background: [] }],
        ["clean"]
      ]

      // article: {
      //   // subject: "Название",
      //   body: "Тело",
      //   is_attachment_exist: null,
      //   owner: null
      //   // date: new Date()
      // }

      // search: {
      //   to: "",
      //   from: "",
      //   what: "",
      //   title: "",
      //   date: null,
      //   is_new: null,
      //   is_only_last: false
      // }
    };
  },

  mounted: function() {
    this.$nextTick(function() {
      this.listOfTags();

      if (this.$route.params.uin) {
        this.getArticle({
          uin: this.$route.params.uin
        });
        this.getFiles();

      } else {
        this.newArticle();
      }

      // Очищаем установленные по умолчанию обработчики событий
      let dropArea = document.getElementById("col-drop-area");
      function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
      }
      ["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
      });
      ["dragenter", "dragover"].forEach(eventName => {
        dropArea.addEventListener(eventName, this.startDragging, false);
      });
      ["dragleave", "drop"].forEach(eventName => {
        dropArea.addEventListener(eventName, this.stopDragging, false);
      });
      ["drop"].forEach(eventName => {
        dropArea.addEventListener(eventName, this.handleDrop, false);
      });
    });
  },

  computed: {
    articleUin: {
      get() {
        return this.$store.getters["article/giveUin"];
      },
      set(value) {
        this.$store.commit("article/updateUin", value, { root: true });
      }
    },

    articleVersion: {
      get() {
        return this.$store.getters["article/giveVersion"];
      },
      set(value) {
        this.$store.commit("article/updateVersion", value, { root: true });
      }
    },

    articleSubject: {
      get() {
        return this.$store.getters["article/giveSubject"];
      },
      set(value) {
        this.$store.commit("article/updateSubject", value, { root: true });
      }
    },

    articleBody: {
      get() {
        return this.$store.getters["article/giveBody"];
      },
      set(value) {
        this.$store.commit("article/updateBody", value, { root: true });
      }
    },

    articleTags: {
      get() {
        return this.$store.getters["tag/giveOnlyForSingleArticle"];
      },
      set(value) {
        this.$store.commit("tag/updateOnlyForSingleArticle", value, {
          root: true
        });
      }
    },

    allTags: function() {
      return this.$store.getters["tag/give"];
    },

    mixedTags: function() {
      if (this.allTags === null || this.articleTags === null) return [];

      let result = [];

      this.allTags.forEach(tagName => {
        let isChecked = this.articleTags.includes(tagName);
        let elem = { name: tagName, isChecked: isChecked };
        result.push(elem);
      });

      return result;
    },

    // titles: function() {
    //   return this.$store.getters["title/give"];
    // },

    // users: function() {
    //   return this.$store.getters["users/give"];
    // },

    // countOfItems: function() {
    //   return this.items == null ? 0 : this.items.length;
    // },

    attachedFiles: function() {
      return this.$store.getters["article_file/give"];
    }

    // // uploadingFiles: function () {
    // //   return this.$store.getters['log_file/giveUploadingItems'];
    // // },

    // userName: function() {
    //   return this.$store.state.user.name;
    // },

    // userSurname: function() {
    //   return this.$store.state.user.surname;
    // },

    // isNewMessagesToBeShown: function() {
    //   return this.$store.getters["log/giveIsNewMessagesToBeShown"];
    // },

    // isRecordForTitleToBeShown: function() {
    //   return this.$store.getters["log/giveIsRecordForTitleToBeShown"];
    // },

    // nameOfTitleToBeShown: function() {
    //   return this.$store.getters["log/giveNameOfTitleToBeShown"];
    // }
  },

  methods: {
    saveArticle: function() {
      this.$store.dispatch("article/set", {});
    },

    deleteArticle: function() {
      this.$store.dispatch("article/delete", {});
    },

    newArticle: function() {
      this.$store.commit("article/new", {});
    },

    getArticle: function(payload) {
      this.$store.dispatch("article/get", {
        uin: payload.uin,
        version: payload.version
      });
    },

    listOfTags: function() {
      this.$store.dispatch("tag/list");
    },

    saveArticleTags: function() {
      if (this.articleUin === null) {
        this.$store.dispatch("notify/showNotifyByCode", "E_TAG_003", {
          root: true
        });
        return;
      }

      let arr = this.mixedTags
        .map(function(tag) {
          if (tag.isChecked === true) return tag.name;
        })
        .filter(function(tag) {
          return tag;
        });

      // console.log(arr);

      this.$store.dispatch("tag/set", {
        id: this.articleUin,
        items: arr
      });
    },

    getArticleTags: function() {
      this.$store.dispatch("tag/get", {
        id: this.articleUin
      });
    },

    gotoReader: function() {
      this.$router.push({
        name: "article_reader",
        params: {
          uin: this.articleUin,
          version: this.articleVersion
        }
      });
    },

    // formatDate: function(timestamp) {
    //   let date = new Date();
    //   date.setTime(timestamp * 1000); // переводим в миллисекунды
    //   return (
    //     ("0" + date.getDate()).slice(-2) +
    //     "." +
    //     ("0" + (date.getMonth() + 1)).slice(-2) +
    //     "." +
    //     date.getFullYear()
    //   );
    // },

    // getTitles: function() {
    //   this.$store.dispatch("title/get", {});
    // },

    // getUsers: function() {
    //   this.$store.dispatch("users/get", {});
    // },

    // getItems: function() {
    //   let queryObject = {
    //     to: this.search.to,
    //     from: this.search.from,
    //     title: this.search.title,
    //     what: this.search.what,
    //     is_only_last: this.search.is_only_last,
    //     date:
    //       this.search.date == null
    //         ? ""
    //         : Math.round(this.search.date.getTime() / 1000)
    //   };

    //   if (this.search.is_new !== null) {
    //     queryObject["is_new"] = this.search.is_new;
    //   }

    //   this.$store.dispatch("log/getItems", queryObject);
    // },

    getFiles: function() {
      this.$store.dispatch("article_file/get", {
        article_id: this.articleUin
      });
    },

    deleteFile: function(file_id) {
      this.$store.dispatch("article_file/delete", {
        id: file_id // TODO
      });
    },

    downloadFile: function(file_id) {
      this.$store.dispatch("article_file/download", {
        file_id: file_id
      });
    },

    downloadAllFiles: function() {
      this.$store.dispatch("article_file/downloadAll", {
        id: this.targetItem.id // TODO
      });
    },

    // getTargetItemTitleId: function() {
    //   //    Ищем id от title
    //   let localTitle = this.titles.filter(obj => {
    //     return obj.name === this.targetItem.title;
    //   });

    //   return localTitle.length > 0 ? localTitle[0].id : 0;
    // },

    // addItem: function() {
    //   let titleId = this.getTargetItemTitleId();

    //   if (titleId == 0) {
    //     this.$store.dispatch("notify/showNotifyByCode", 303, { root: true });
    //     return;
    //   }

    //   this.$store.dispatch("log/setItem", {
    //     to: this.targetItem.to,
    //     from: this.targetItem.from,
    //     title: titleId,
    //     what: this.targetItem.what,
    //     is_new: this.targetItem.is_new,
    //     date: Math.round(this.targetItem.date.getTime() / 1000)
    //   });
    // },

    // addTaskItem: function() {
    //   let titleId = this.getTargetItemTitleId();

    //   if (titleId == 0) {
    //     this.$store.dispatch("notify/showNotifyByCode", 303, { root: true });
    //     return;
    //   }

    //   this.$store.dispatch("task/create", {
    //     title: titleId
    //   });
    // },

    // modifyIsNewMessageCheckbox: function(id) {
    //   this.$store.dispatch("log/switchNewMessage", { id: id });
    // },

    // modifyItem: function() {
    //   let titleId = this.getTargetItemTitleId();

    //   if (titleId == 0) {
    //     this.$store.dispatch("notify/showNotifyByCode", 303, { root: true });
    //     return;
    //   }

    //   this.$store.dispatch("log/setItem", {
    //     id: this.targetItem.id,
    //     to: this.targetItem.to,
    //     from: this.targetItem.from,
    //     title: titleId,
    //     what: this.targetItem.what,
    //     date: Math.round(this.targetItem.date.getTime() / 1000)
    //   });
    // },

    // deleteItem: function() {
    //   this.$store.dispatch("log/deleteItem", {
    //     id: this.targetItem.id
    //   });
    // },

    // editItem: function(id) {
    //   let itemToBeModified = this.items.filter(obj => {
    //     return obj.id === id;
    //   })[0];

    //   let localTo = this.users.filter(obj => {
    //     return obj.surname + " " + obj.name === itemToBeModified.to;
    //   })[0].id;

    //   let localFrom = this.users.filter(obj => {
    //     return obj.surname + " " + obj.name === itemToBeModified.from;
    //   })[0].id;

    //   this.targetItem.id = itemToBeModified.id;
    //   this.targetItem.title = itemToBeModified.title;
    //   this.targetItem.to = localTo;
    //   this.targetItem.from = localFrom;
    //   this.targetItem.what = itemToBeModified.what;

    //   let date = new Date();
    //   date.setTime(itemToBeModified.date * 1000);
    //   this.targetItem.date = date;

    //   this.isNewItemMayBeAdded = false;

    //   this.getFiles();
    // },

    // switchUsers: function() {
    //   let temp = this.targetItem.to;
    //   this.targetItem.to = this.targetItem.from;
    //   this.targetItem.from = temp;
    // },

    // resetToAdd: function() {
    //   this.targetItem.id = null;
    //   this.isNewItemMayBeAdded = true;
    //   this.targetItem.date = new Date();
    // },

    startDragging: function() {
      this.isDragging = true;
    },

    stopDragging: function() {
      this.isDragging = false;
    },

    uploadFile: function(file) {
      if (this.articleUin == null) {
        this.$store.dispatch("notify/showNotifyByCode", "E_FILE_003", {
          root: true
        });
        return;
      }

      if (file.size > this.maxFileSize) {
        this.$store.dispatch("notify/showNotifyByCode", "E_FILE_004", {
          root: true
        });
        return;
      }

      let uin = this.guid();
      let progressCallback = this.updateProgress.bind(this);

      let badUploadFunction = function() {
        this.$store.commit("article_file/deleteSuccess", uin, { root: true });
      };

      this.$store.dispatch("article_file/upload", {
        file: file,
        article_id: this.articleUin,
        uin: uin,

        progressCallback: function(e) {
          progressCallback(uin, e.loaded, e.total);
        },

        badFileUploadCallback: badUploadFunction.bind(this)
      });
    },

    handleDrop: function(e) {
      let dt = e.dataTransfer;
      let files = dt.files;
      files = [...files];
      files.forEach(this.uploadFile);
    },

    formatBytes: function(bytes, decimals) {
      if (bytes == 0) return "0 Bytes";
      var k = 1024,
        dm = decimals || 2,
        sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
        i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    },

    guid: function() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return (
        s4() +
        s4() +
        "-" +
        s4() +
        "-" +
        s4() +
        "-" +
        s4() +
        "-" +
        s4() +
        s4() +
        s4()
      );
    },

    updateProgress: function(uin, uploadedBytes, totalBytes) {
      this.$store.commit("article_file/updateProgress", {
        uin: uin,
        size: totalBytes,
        uploadedSize: uploadedBytes
      });
    }

    // switchNewMessageSearchCheckBox: function() {
    //   this.search.is_new = this.search.is_new === null ? true : null;
    // },

    // cleanSearch: function() {
    //   this.search.to = "";
    //   this.search.from = "";
    //   this.search.what = "";
    //   this.search.title = "";
    //   this.search.date = null;
    // },

    // showNewMessages: function() {
    //   if (this.isNewMessagesToBeShown == true) {
    //     this.search.is_new = true;
    //     this.search.is_only_last = false;
    //     this.cleanSearch();
    //     this.getItems();
    //     this.$store.commit("log/setIsNewMessagesToBeShown", false, {
    //       root: true
    //     });
    //   }
    // },

    // wordToBeAddedOnChange: function() {
    //   // console.log('HERE');
    //   this.targetItem.what = this.targetItem.what + this.wordToBeAdded;
    // },

    // showRecordForTitle: function() {
    //   if (this.isRecordForTitleToBeShown == true) {
    //     this.search.is_new = null;
    //     this.search.is_only_last = false;
    //     this.cleanSearch();
    //     this.search.title = this.nameOfTitleToBeShown;
    //     this.getItems();
    //     this.$store.commit("log/setIsRecordForTitleToBeShown", false, {
    //       root: true
    //     });
    //   }
    // },

    // onTitleClick: function(title) {
    //   this.$store.commit("title/setNameOfTitleToBeShown", title, {
    //     root: true
    //   });
    //   this.$store.commit("title/setIsRecordForTitleToBeShown", true, {
    //     root: true
    //   });
    //   this.$router.push("title");
    // }
  },

  watch: {
    articleUin: function() {
      if (this.articleUin !== null) {
        this.getArticleTags();
        this.getFiles();
      }
    }

    // isRecordForTitleToBeShown: function() {
    //   this.showRecordForTitle();
    // }
  }
};
</script>

<style>
/* .td-date {
  width: 130px;
}

.td-title {
  width: 120px;
}

.text-center {
  text-align: center;
} */

#article-drop-area {
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