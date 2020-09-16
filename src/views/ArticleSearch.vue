<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="article_search_link" v-on:click="switchIsSearchRulesShown">Правила поиска</div>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <div v-if="isSearchRulesShown" class="row">
          <div class="col">
            <p>Выполняется регистрозависимый поиск по тексту статьи. Для поиска по автору статьи, номеру статьи, заголовку статьи необходимо использовать соответственно фильтры "author:", "uin:", "subject:", "last:"</p>
            <p>Например, для поиска статьи под номером 4, надо ввести запрос "uin:4". Для поиска по ключевым словам "балка", "прогиб" статьи, в названии которой есть слова "Расчет", ввести запрос "балка прогиб subject:Расчет".
            Ограничить кол-во статей в поиске до 10 можно через фильтр "балка прогиб subject:Расчет limit:10", а "limit:100" выведет просто 100 последних статей</p>
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
            В чем сила, брат? (найдено {{countOfArticles}})
          </button>
        </div>

        <div class="row">
          <input v-on:keyup.enter="search" type="text" class="form-control" v-model="query"/>
        </div>

        <div class="row">
          <div class="col-10">
            <div v-for="article in articles" :key="article.uin" class="row">
              <div class="col">
                <div
                  class="row article_search_colored"
                >#{{article.uin}} v.{{article.version}} от {{formatDate(article.date)}} - {{article.owner}}</div>
                <div class="row">
                  <h4
                    class="article_search_link"
                    v-on:click="gotoReader(article.uin, article.version)"
                  >{{article.subject}}</h4>
                </div>
                <div class="row" v-html="cutText(article.lowered_body)"></div>
              </div>
            </div>
          </div>

          <div class="col-2">
            <div v-if="(allTags.length > 0)" class="row">
              <button type="button" class="btn btn-primary btn-block" v-on:click="setChosenTags">Фильтр</button>
            </div>

            <div v-for="(elem) in mixedTags" :key="elem.name" class="row align-items-center article_search_checkbox_block ">
              <input type="checkbox" id="checkbox" v-model="elem.isChecked" />
              <label class="article_search_checkbox_label" for="checkbox">{{ elem.name }}</label>
            </div>
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
      bodyLength: 500,
      defaultLimit: 20
    };
  },

  mounted: function() {
    this.$nextTick(function() {
      this.query = "limit:" + String(this.defaultLimit);
    });
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

    countOfArticles: function() {
      return (this.articles) ? this.articles.length : 0;
    },

    isProgress: function() {
      return this.$store.getters["article_search/giveIsProgress"];
    },

    allTags: function() {
      return this.$store.getters["article_search/giveTags"];
    },

    mixedTags: function() {
      if (this.allTags === null) return [];

      let result = [];

      this.allTags.forEach(tagName => {
        let elem = { name: tagName, isChecked: false };
        result.push(elem);
      });

      return result;
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
      if (this.query.trim() == "") {
        this.$store.dispatch("notify/showNotifyByCode", "E_SEARCH_001", {
          root: true
        });
        return;
      }

      this.$store.dispatch("article_search/getArticles", {});
    },

    gotoReader: function(uin) {
      this.$router.push({
        name: "article_reader",
        params: {uin: uin}
      });
    },

    switchIsSearchRulesShown: function() {
      this.isSearchRulesShown = !this.isSearchRulesShown;
    },

    cutText: function(text) {
      return text.substring(0, this.bodyLength);
    },

    setChosenTags: function() {
      let arr = this.mixedTags
        .map(function(tag) {
          if (tag.isChecked === true) return tag.name;
        })
        .filter(function(tag) {
          return tag;
        });

      // console.log(arr);

      this.$store.commit("article_search/updateChosenTags", arr);
    }
  },

  watch: {}
};
</script>

<style>
.article_search_colored {
  color: red;
}

.article_search_link {
  cursor: pointer;
  color: darkblue;
}

.article_search_checkbox_label {
  padding-left: 5px;
}

.article_search_checkbox_block {
  padding-left: 5px;
}


</style>