<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h3>Статья {{articleSubject}} [{{articleUin}}:{{articleVersion}}]</h3>
      </div>
    </div>

    <div class="row">
      <div class="col">articleBody</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleEditor",

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

    articleSubject: function() {
      return this.$store.getters["article/giveSubject"];
    },

    articleBody: function() {
      return this.$store.getters["article/giveBody"];
    }
  },

  methods: {
    getArticle: function(payload) {
      this.$store.dispatch("article/get", {
        uin: payload.uin,
        version: payload.version
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