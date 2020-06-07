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
          
        ></editor>
        <div
          v-else
          id="article-drop-area"
        >{{'Брось файл сюда (каждый не более ' + formatBytes(maxFileSize) +')'}}</div>
      </div>
    </div>


    <div class="row">
      <div class="col-6">
        <button type="button" class="btn btn-block btn-success" v-on:click="saveArticle">Сохранить</button>
      </div>

      <div class="col-6">
        <button
          type="button"
          class="btn btn-block btn-primary"
          v-on:click="saveArticleTags"
        >Сохранить ключевые слова</button>
      </div>
    </div>

    <div class="row">
      <div class="col-9">
        <button
          type="button"
          class="btn btn-block btn-warning"
          v-on:click="gotoReader"
        >Читать (не забудь сохранить)</button>
      </div>

      <div class="col-3">
        <button type="button" class="btn btn-block btn-danger" v-on:click="deleteArticle">Удалить</button>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
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
          <div class="col-9" v-else>{{item.original_name}}</div>

          <div class="col-2">{{formatBytes(item.size)}}</div>
          <div class="col-1" v-if="item.id != null">
            <button
              type="button"
              class="btn btn-danger btn-sm"
              v-on:click="deleteFile(item.id)"
            >Удалить</button>
          </div>
        </div>
      </div>
    </div>

    <br />

    <div class="row">
      <div v-for="n in tagColumnCount" :key="n" class="col-3">
        <div
          v-for="elem in sliceTags(n-1)"
          :key="elem.name"
          class="row align-items-center article_search_checkbox_block"
        >
          <input type="checkbox" id="checkbox" v-model="elem.isChecked" />
          <label class="article_editor_checkbox_label" for="checkbox">{{ elem.name }}</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleEditor",

  data: function() {
    return {
      date_format: "dd.MM.yyyy",
      isDragging: false,
      maxFileSize: 100 * 1024 * 1024,
      tagColumnCount: 4,

      // customEditorToolbar: [
      //   ["bold", "underline"],
      //   [{ list: "ordered" }, { list: "check" }],
      //   [{ color: [] }, { background: [] }],
      //   ["clean"]
      // ]
    };
  },

  mounted: function() {
    this.$nextTick(function() {
      this.listOfTags();

      if (this.$route.params.uin) {
        this.getArticle({
          uin: this.$route.params.uin
        });
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

    tagRowCount: function() {
      return Math.ceil(this.allTags.length / this.tagColumnCount);
    },

    allTags: function() {
      return this.$store.getters["tag/give"];
    },

    mixedTags: function() {
      let result = [];

      this.allTags.forEach(tagName => {
        let isChecked = this.articleTags.includes(tagName);
        let elem = { name: tagName, isChecked: isChecked };
        result.push(elem);
      });

      return result;
    },

    attachedFiles: function() {
      return this.$store.getters["article_file/give"];
    }
  },

  methods: {
    sliceTags: function(col) {
      if (this.allTags === null || this.articleTags === null) {
        return [];
      }

      return this.mixedTags.slice(
        col * this.tagRowCount,
        (col + 1) * this.tagRowCount
      );
    },

    // mixedTags: function(col) {
    //   let result = [];

    //   this.sliceTags(col).forEach(tagName => {
    //     let isChecked = this.articleTags.includes(tagName);
    //     let elem = { name: tagName, isChecked: isChecked };
    //     result.push(elem);
    //   });

    //   return result;
    // },

    saveArticle: function() {
      this.$store.dispatch("article/set", {});
    },

    deleteArticle: function() {
      this.$store.dispatch("article/delete", {});
    },

    newArticle: function() {
      this.$store.commit("article/new", {});
      this.$store.commit("article_file/newArticle", {});
      this.$store.commit("tag/newArticle", {});
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
        article_id: this.articleUin,
        items: arr
      });
    },

    getArticleTags: function() {
      this.$store.dispatch("tag/get", {
        article_id: this.articleUin
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

    getFiles: function() {
      this.$store.dispatch("article_file/get", {
        article_id: this.articleUin
      });
    },

    deleteFile: function(file_id) {
      this.$store.dispatch("article_file/delete", {
        file_id: file_id
      });
    },

    downloadFile: function(file_id) {
      this.$store.dispatch("article_file/download", {
        file_id: file_id,
      });
    },

    downloadAllFiles: function() {
      this.$store.dispatch("article_file/downloadAll", {
        article_id: this.articleUin
      });
    },

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

      this.$store.dispatch("article_file/upload", {
        file: file,
        article_id: this.articleUin,
      });
    },

    handleDrop: function(e) {
      let dt = e.dataTransfer;
      let files = dt.files;
      files = [...files];
      files.forEach(this.uploadFile);
    },

    formatBytes: function(bytes, decimals) {
      return window.$formatBytes(bytes, decimals);
    },

  },

  watch: {
    articleUin: function() {
      if (this.articleUin !== null) {
        this.getArticleTags();
        this.getFiles();
      }
    }
  }
};
</script>

<style>
#article-drop-area {
  border: 2px dashed #ccc;
  border-radius: 20px;
  height: 500px;
  margin-top: 40px;
  padding-top: 80px;
  text-align: center;
  font: 21pt bold arial;
  color: gray;
}

.article_editor_checkbox_label {
  padding-left: 5px;
}

.article_editor_checkbox_block {
  padding-left: 5px;
}
</style>