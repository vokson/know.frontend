export default {
    namespaced: true,

    state: {
        items: null
    },

    getters: {
        giveActions: function (state) {
            return state.listOfActions;
        },

        giveRoles: function (state) {
            return state.listOfRoles;
        },

        givePairs: function (state) {
            return state.listOfPairs;
        },
    },

    mutations: {
        updateActions: function (state, data) {
            state.listOfActions = data;
        },

        updateRoles: function (state, data) {
            state.listOfRoles = data;
        },

        updatePairs: function (state, data) {
            state.listOfPairs = data;
        },
    },

    actions: {

        getListOfActions: (context) => {

            let parameters = {
                queryName: "action_get_list_actions",
                data: {},
            };

            context.dispatch('query/send', parameters, { root: true })
        },

        getListOfRoles: (context) => {

            let parameters = {
                queryName: "action_get_list_roles",
                data: {},
            };

            context.dispatch('query/send', parameters, { root: true })
        },

        getListOfPairs: (context) => {

            let parameters = {
                queryName: "action_get_list_pairs",
                data: {},
            };

            context.dispatch('query/send', parameters, { root: true })
        },

        set: (context) => {

            let parameters = {
                queryName: "action_set",
                data: {
                    items: context.state.items
                },
            };

            context.dispatch('query/send', parameters, { root: true })
        },

    }

}