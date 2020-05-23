export default {
    namespaced: true,

    state: {
        query: "",
        articles: [],
        tags: [],
        chosenTags: [],
        tags_by_article: {},
        isProgress: false,
    },

    getters: {
        giveQuery: function (state) {
            return state.query;
        },

        giveArticles: function (state) {

            let articlesToBeGiven = [];

            for (let i = 0; i < state.articles.length; i++) {
                let uin = parseInt(state.articles[i].uin);

                // console.log('uin = ' + uin);

                let articleTags = (Object.prototype.hasOwnProperty.call(state.tags_by_article, uin)) ? state.tags_by_article[uin] : [];

                // console.log('articleTags = ', articleTags);

                let nonChosenArticleTags = state.chosenTags.filter(function (name) {
                    return !articleTags.includes(name);
                });

                // console.log('nonChosenArticleTags = ', nonChosenArticleTags);

                if (nonChosenArticleTags.length == 0) {
                    articlesToBeGiven.push(state.articles[i]);
                }
            }

            return articlesToBeGiven;

        },

        giveTags: function (state) {
            return state.tags;
        },

        giveIsProgress: function (state) {
            return state.isProgress;
        },

    },

    mutations: {

        updateQuery: function (state, value) {
            state.query = value;
        },

        updateArticles: function (state, items) {

            state.articles = items.map(item => {
                item.body = item.body.slice(0, 500);
                return item;
            });

            state.isProgress = false;

        },

        updateTags: function (state, payload) {
            state.tags = payload.list_of_names;
            state.chosenTags = [];
            state.tags_by_article = payload.list_by_id;
        },

        updateChosenTags: function (state, items) {
            state.chosenTags = items;
        },

    },

    actions: {

        setArticles: function (context, items) {

            context.commit('article_search/updateArticles', items, { root: true });
            context.dispatch('article_search/getTags', {}, { root: true })

        },

        getArticles: (context) => {

            context.state.isProgress = true;

            let parameters = {
                queryName: "article_search",
                data: {
                    query: context.state.query
                },
            };

            context.dispatch('query/send', parameters, { root: true })
        },

        getTags: (context) => {

            let parameters = {
                queryName: "tag_list_by_article",
                data: {
                    id_list: context.state.articles.map(item => item.uin)
                },
            };

            context.dispatch('query/send', parameters, { root: true })
        },



    }

}