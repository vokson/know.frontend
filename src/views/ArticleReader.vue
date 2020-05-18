<template>
  <div class="container">
    <div class="row">
      <div class="col-2">
        <div class="row">#{{articleUin}} v.{{articleVersion}}</div>
        <div class="row">{{articleOwner}}</div>
        <div class="row">{{formatDate(articleDate)}}</div>
        <div class="row">
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
          <img
            src="./img/next_gray.png"
            width="40"
            height="40"
            v-on:click="getNextVersion"
            v-else
          />
          <!-- <img type="button" class="btn btn-info" v-if="articlePreviousVersion" v-on:click="getPreviousVersion">&lArr;</button> -->
          <!-- <button type="button" class="btn btn-info" v-if="articleNextVersion" v-on:click="getNextVersion">&rArr;</button> -->
        </div>
      </div>

      <div class="col-10">
        <div class="row">
          <h3>{{articleSubject}}</h3>
        </div>

        <div class="row">
          <div v-html="articleBody"></div>
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
    }
  },

  methods: {
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
</style>