export default {
    namespaced: true,

    state: {
        query: "",
        articles: [],
        isProgress:false,
    },

    getters: {
        giveQuery: function (state) {
            return state.query;
        },

        giveArticles: function (state) {
            return state.articles;
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
                item.body = item.body.slice(0,500);
                return item;
            });

            state.isProgress = false;
        },

    },

    actions: {

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


    }

}