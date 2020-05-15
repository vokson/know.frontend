export default {
    namespaced: true,

    state: {
        // listOfActions: [],
        // listOfRoles: [],
        // listOfPairs: {},
        items: null
    },

    getters: {
        // giveActions: function (state) {
        //     return state.listOfActions;
        // },

        // giveRoles: function (state) {
        //     return state.listOfRoles;
        // },

        // givePairs: function (state) {
        //     return state.listOfPairs;
        // },

        give: function (state) {
            return state.items;
        },

        // give: function (state) {
        //     let list = {};

        //     this.listOfRoles.forEach((role) => {
        //         this.listOfActions.forEach((action) => {

        //             if (this.listOfPairs.hasOwnProperty(role)) {
        //                 if (this.listOfPairs.role.hasOwnProperty(action)) {
        //                     list.role.action = parseInt(this.listOfPairs.role.action);
        //                     return;
        //                 } 
        //             }

        //             list.role.action = 0;


        //         })
        //     })


        //     return list;
        // },
    },

    mutations: {
        // updateActions: function (state, data) {
        //     state.listOfActions = data;
        // },

        // updateRoles: function (state, data) {
        //     state.listOfRoles = data;
        // },

        // updatePairs: function (state, data) {
        //     state.listOfPairs = data;
        // },

        update: function (state, data) {
            state.items = data;
        },
    },

    actions: {

        get: (context) => {
            let parameters = {
                queryName: "action_get",
                data: {},
            };

            context.dispatch('query/send', parameters, { root: true })
        },


        // getListOfActions: (context) => {

        //     let parameters = {
        //         queryName: "action_get_list_actions",
        //         data: {},
        //     };

        //     context.dispatch('query/send', parameters, { root: true })
        // },

        // getListOfRoles: (context) => {

        //     let parameters = {
        //         queryName: "action_get_list_roles",
        //         data: {},
        //     };

        //     context.dispatch('query/send', parameters, { root: true })
        // },

        // getListOfPairs: (context) => {

        //     let parameters = {
        //         queryName: "action_get_list_pairs",
        //         data: {},
        //     };

        //     context.dispatch('query/send', parameters, { root: true })
        // },

        set: (context, payload) => {

            let parameters = {
                queryName: "action_set",
                data: payload,
            };

            context.dispatch('query/send', parameters, { root: true })
        },

    }

}