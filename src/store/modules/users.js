export default {
    namespaced: true,

    state: {
        items: null,
        userId: null,
        previousSearch: {}
    },

    getters: {
        give: function (state) {
            return state.items;
        },

        givePreviousSearch: function (state) {
            return state.previousSearch;
        }
    },

    mutations: {

        update: function (state, data) {
            state.items = data;
        },
    },

    actions: {

        get: (context, payload) => {

            let parameters = {
                queryName: "user_get",
                data: payload,
            };

            context.state.previousSearch = payload;
            context.dispatch('query/send', parameters, { root: true })
        },


        create: (context, payload) => {

            let parameters = {
                queryName: "user_create",
                data: payload,
            };

            context.dispatch('query/send', parameters, { root: true })
        },

        set: (context, payload) => {

            let parameters = {
                queryName: "user_set",
                data: payload,
            };

            context.dispatch('query/send', parameters, { root: true })
        },

        setDefaultPassword: (context, payload) => {

            let parameters = {
                queryName: "user_set_default_password",
                data: payload,
            };

            context.dispatch('query/send', parameters, { root: true })
        },

        del: (context, payload) => {

            let parameters = {
                queryName: "user_delete",
                data: {
                    id: payload.id
                },
            };

            context.dispatch('query/send', parameters, { root: true })
        },

    }

}