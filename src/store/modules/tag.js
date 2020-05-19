export default {
    namespaced: true,

    state: {
        items: null
    },

    getters: {
        give: function (state) {
            return state.items;
        }
    },

    mutations: {
        update: function (state, data) {
            state.items = data;
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

        // set: (context) => {

        //     let parameters = {
        //         queryName: "setting_set",
        //         data: {
        //             items: context.state.items
        //         },
        //     };

        //     context.dispatch('query/send', parameters, { root: true })
        // },

    }

}