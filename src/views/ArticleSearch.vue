<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="row">
          <button type="button" class="btn btn-success btn-block" v-on:click="search">
            <span v-if="isProgress" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Поиск
          </button>
        </div>

        <div class="row">
          <input type="text" class="form-control" v-model="query" />
        </div>

        <div v-for="article in articles" :key="article.uin" class="row">
          <div class="col">
            <div
              class="row colored"
            >#{{article.uin}} v.{{article.version}} от {{formatDate(article.date)}} - {{article.owner}}</div>
            <div class="row">
              <h4 class="article_link" v-on:click="gotoReader(article.uin, article.version)">{{article.subject}}</h4>
            </div>
            <div class="row" v-html="article.body"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleSearch",

  data: function() {
    return {
      date_format: "dd.MM.yyyy"
    };
  },

  mounted: function() {
    this.$nextTick(function() {});
  },

  computed: {
    query: {
      get() {
        return this.$store.getters["article_search/giveQuery"];
      },
      set(value) {
        this.$store.commit("article_search/updateQuery", value, { root: true });
      }
    },

    articles: function() {
      return this.$store.getters["article_search/giveArticles"];
    },

    isProgress: function() {
      return this.$store.getters["article_search/giveIsProgress"];
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

    search: function() {
      this.$store.dispatch("article_search/getArticles", {});
    },

    gotoReader: function(uin, version) {
      this.$router.push({
        name: "article_reader",
        params: {
          uin: uin,
          version: version
        }
      });
    }

  },

  watch: {}
};
</script>

<style>
.colored {
  color: red;
}
.article_link {
  cursor: pointer;
  color: darkblue;
}
</style>