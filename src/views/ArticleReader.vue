<template>
  <div class="container">
    <div class="row">
      <div class="col-2">
        <div class="row article_reader_left_column">#{{articleUin}} v.{{articleVersion}}</div>
        <div class="row article_reader_left_column">{{articleOwner}}</div>
        <div class="row article_reader_left_column">{{formatDate(articleDate)}}</div>

        <div class="row article_reader_left_column">
          <img
            src="./img/prev.png"
            width="40"
            height="40"
            v-on:click="getPreviousVersion"
            v-if="articlePreviousVersion"
          />
          <img
            src="./img/prev_gray.png"
            width="40"
            height="40"
            v-on:click="getPreviousVersion"
            v-else
          />
          <img
            src="./img/next.png"
            width="40"
            height="40"
            v-on:click="getNextVersion"
            v-if="articleNextVersion"
          />
          <img src="./img/next_gray.png" width="40" height="40" v-on:click="getNextVersion" v-else />
        </div>
        <br />
        <br />
        <br />
        <div class="row article_reader_left_column">
          <button type="button" class="btn btn-info" v-on:click="gotoEditor">Редактировать</button>
        </div>
        <div class="row article_reader_left_column">
          <button type="button" class="btn btn-success" v-on:click="createNewInEditor">Новая</button>
        </div>

        <br />
        <br />

        <div
          v-for="(tag, index) in articleTags"
          :key="`tag-${index}`"
          class="row article_reader_left_column"
        >
          <span class="badge badge-primary">{{tag}}</span>
        </div>
      </div>

      <div class="col-10">
        <div class="col-12">
          <div class="row">
            <h3>{{articleSubject}}</h3>
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <div id="article_reader_main_page" v-html="articleBody"></div>
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
              <!-- <div class="col-1" v-if="item.id != null">
                <button
                  type="button"
                  class="btn btn-danger btn-sm"
                  v-on:click="deleteFile(item.id)"
                >Удалить</button>
              </div>-->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleReader",

  data: function() {
    return {
      date_format: "dd.MM.yyyy"
    };
  },

  mounted: function() {
    this.$nextTick(function() {
      this.getArticle({
        uin: this.$route.params.uin,
        version: this.$route.params.version
      });

      // if (this.$route.params.uin) {
      //   this.getFiles();
      // }
    });
  },

  computed: {
    articleUin: function() {
      return this.$store.getters["article/giveUin"];
    },

    articleVersion: function() {
      return this.$store.getters["article/giveVersion"];
    },

    articleNextVersion: function() {
      return this.$store.getters["article/giveNextVersion"];
    },

    articlePreviousVersion: function() {
      return this.$store.getters["article/givePreviousVersion"];
    },

    articleSubject: function() {
      return this.$store.getters["article/giveSubject"];
    },

    articleBody: function() {
      return this.$store.getters["article/giveBody"];
    },

    articleOwner: function() {
      return this.$store.getters["article/giveOwner"];
    },

    articleDate: function() {
      return this.$store.getters["article/giveDate"];
    },

    articleTags: function() {
      return this.$store.getters["tag/giveOnlyForSingleArticle"];
    },

    attachedFiles: function() {
      return this.$store.getters["article_file/give"];
    }
  },

  methods: {
    formatBytes: function(bytes, decimals) {
      if (bytes == 0) return "0 Bytes";
      var k = 1024,
        dm = decimals || 2,
        sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
        i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    },

    formatDate: function(timestamp) {
      let date = new Date();
      date.setTime(timestamp * 1000); // переводим в миллисекунды
      return (
        ("0" + date.getDate()).slice(-2) +
        "." +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        "." +
        date.getFullYear()
      );
    },

    getArticle: function(payload) {
      this.$store.dispatch("article/get", {
        uin: payload.uin,
        version: payload.version
      });
    },

    getNextVersion: function() {
      if (!this.articleNextVersion) return;

      this.$router.push({
        name: "article_reader",
        params: {
          uin: this.articleUin,
          version: this.articleNextVersion
        }
      });

      this.getArticle({
        uin: this.articleUin,
        version: this.articleNextVersion
      });
    },

    getPreviousVersion: function() {
      if (!this.articlePreviousVersion) return;

      this.$router.push({
        name: "article_reader",
        params: {
          uin: this.articleUin,
          version: this.articlePreviousVersion
        }
      });

      this.getArticle({
        uin: this.articleUin,
        version: this.articlePreviousVersion
      });
    },

    gotoEditor: function() {
      this.$router.push({
        name: "article_editor",
        params: {
          uin: this.articleUin
        }
      });
    },

    createNewInEditor: function() {
      this.$router.push({
        name: "article_editor"
      });
    },

    getArticleTags: function() {
      this.$store.dispatch("tag/get", {
        article_id: this.articleUin
      });
    },

    getFiles: function() {
      this.$store.dispatch("article_file/get", {
        article_id: this.articleUin
      });
    },

    downloadFile: function(file_id) {
      this.$store.dispatch("article_file/download", {
        file_id: file_id
      });
    },

    downloadAllFiles: function() {
      this.$store.dispatch("article_file/downloadAll", {
        article_id: this.articleUin
      });
    }
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

.article_reader_left_column {
  display: flex;
  justify-content: center;
}

#article_reader_main_page img {
  max-width: 100%;
  height: auto;
}
</style>