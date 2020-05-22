<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="article_link" v-on:click="switchIsSearchRulesShown">Правила поиска</div>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <div v-if="isSearchRulesShown" class="row">
          <div class="col">
            <p>Выполняется регистрозависимый поиск по тексту статьи. Для поиска по автору статьи, номеру статьи, заголовку статьи необходимо использовать соответственно фильтры ":author", ":uin", ":subject"</p>
            <p>Например, для поиска статьи под номером 4, надо ввести запрос "uin:4".</p>
            <p>Для поиска по ключевы словам "балка", "прогиб" статьи, в названии которой есть слова "Расчет", ввести запрос "балка прогиб subject:Расчет"</p>
          </div>
        </div>

        <div class="row">
          <button type="button" class="btn btn-success btn-block" v-on:click="search">
            <span
              v-if="isProgress"
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            Поиск
          </button>
        </div>

        <div class="row">
          <input v-on:keyup.enter="search" type="text" class="form-control" v-model="query" />
        </div>

        <div v-for="article in articles" :key="article.uin" class="row">
          <div class="col">
            <div
              class="row colored"
            >#{{article.uin}} v.{{article.version}} от {{formatDate(article.date)}} - {{article.owner}}</div>
            <div class="row">
              <h4
                class="article_link"
                v-on:click="gotoReader(article.uin, article.version)"
              >{{article.subject}}</h4>
            </div>
            <div class="row" v-html="cutText(article.body)"></div>
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
      date_format: "dd.MM.yyyy",
      isSearchRulesShown: false,
      bodyLength: 500
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
      if (this.query == "") {
        this.$store.dispatch("notify/showNotifyByCode", "E_SEARCH_001", {
          root: true
        });
        return;
      }

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
    },

    switchIsSearchRulesShown: function() {
      this.isSearchRulesShown = !this.isSearchRulesShown;
    },

    cutText: function(text) {
      return text.substring(0, this.bodyLength);
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