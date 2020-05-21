export default {
    namespaced: true,

    state: {
        items: null,
        itemsForArticle: []
    },

    getters: {
        give: function (state) {
            return state.items;
        },

        giveOnlyForSingleArticle: function (state) {
            return state.itemsForArticle;
        }
    },

    mutations: {
        update: function (state, data) {
            state.items = data;
        },

        updateOnlyForSingleArticle: function (state, data) {
            state.itemsForArticle = data;
        },
    },

    actions: {

        list: (context) => {

            let parameters = {
                queryName: "tag_list",
                data: {},
            };

            context.dispatch('query/send', parameters, { root: true })
        },

         create: (context, tagName) => {

            let parameters = {
                queryName: "tag_create",
                data: {
                    name: tagName
                },
            };

            context.dispatch('query/send', parameters, { root: true })
        },

        delete: (context, tagName) => {

            let parameters = {
                queryName: "tag_delete",
                data: {
                    name: tagName
                },
            };

            context.dispatch('query/send', parameters, { root: true })
        },

        get: (context, payload) => {

            let parameters = {
                queryName: "tag_get",
                data: {
                    id: payload.id
                },
            };

            context.dispatch('query/send', parameters, { root: true })
        },


        set: (context, payload) => {

            let parameters = {
                queryName: "tag_set",
                data: {
                    id: payload.id,
                    items: payload.items
                },
            };

            context.dispatch('query/send', parameters, { root: true })
        },


    }

}