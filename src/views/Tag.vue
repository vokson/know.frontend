<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col">
          <h3>Ключевые слова</h3>
        </div>
      </div>

      <div class="row" />

      <div v-for="(item, index) in items" :key="`tag-${index}`" class="row align-items-center">
        <div class="col-8">
          <p>{{item}}</p>
        </div>
        <div class="col-4">
          <button type="button" class="btn btn-danger" v-on:click="deleteTag(item)">Удалить</button>
        </div>
      </div>

      <div class="row">
        <div class="col-2">
          <button type="button" class="btn btn-primary" v-on:click="listOfTags">Обновить</button>
        </div>

        <div class="col-2">
          <button type="button" class="btn btn-danger" v-on:click="createTag">Добавить</button>
        </div>

        <div class="col-4">
          <input type="text" class="form-control" v-model="newTagName" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tag",

  data: function() {
    return {
      newTagName: ""
    };
  },

  mounted: function() {
    this.$nextTick(function() {
      this.listOfTags();
    });
  },

  computed: {
    items: function() {
      return this.$store.getters["tag/give"];
    }
  },

  methods: {
    listOfTags: function() {
      this.$store.dispatch("tag/list");
    },

    createTag: function() {
      this.$store.dispatch("tag/create", this.newTagName);
    },

    deleteTag: function(name) {
      this.$store.dispatch("tag/delete", name);
    }
  }
};
</script>