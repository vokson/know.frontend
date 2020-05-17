export default {
    namespaced: true,

    state: {
        access_token: "",
        name: "",
        surname: "",
        role: "guest",
        email: "",
        isDefaultPassword: false
    },

    getters: {
        isAuthenticated: function (state) {
            return (state.access_token == "") ? false : true;
        },

        giveAccessToken: function (state) {

            // if (state.access_token == "") {
            //     state.commit('auth/setAccessTokenUsingCookie', {}, { root: true });
            // }

            return (state.access_token == "") ? window.$cookies.get("access_token") : state.access_token;
        },

        giveName: function (state) {
            return state.name;
        },

        giveSurname: function (state) {
            return state.surname;
        },

        giveRole: function (state) {
            return state.role;
        },

        giveEmail: function (state) {
            return state.email;
        },

        giveIsDefaultPassword: function (state) {
            return state.isDefaultPassword;
        },
    },

    mutations: {
        // setApiResponse: (state, data) => {
        //   state.apiResponse = data;
        // },

        setUser: (state, data) => {
            state.access_token = data.access_token;
            state.name = data.name;
            state.surname = data.surname;
            state.role = data.role;
            state.email = data.email;
            state.id = data.id;
            state.isDefaultPassword = data.isDefaultPassword;

            window.$cookies.set("access_token", data.access_token);
        },

        setAccessTokenUsingCookie: (state) => {
            state.access_token = window.$cookies.get("access_token");
        },

    },

    actions: {

        isTokenValid: (context) => {

            let parameters = {
                queryName: "auth_is_token_valid",
                data: {},
            };

            context.dispatch('query/send', parameters, { root: true })
        },

        login: (context, payload) => {

            let parameters = {
                queryName: "auth_login",
                data: {
                    email: payload.email,
                    password: payload.password
                },
            };

            context.dispatch('query/send', parameters, { root: true })
        },

        loginByToken: (context) => {

            let parameters = {
                queryName: "auth_login_by_token",
                data: {
                    access_token: context.getters['auth/giveAccessToken']
                },
            };

            context.dispatch('query/send', parameters, { root: true })
        },

        logout: (context) => {

            context.commit('auth/setUser', {
                access_token: "",
                name: "",
                surname: "",
                role: "guest",
                email: ""
            }, { root: true });


            context.dispatch('notify/showNotifyByCode', "E_AUTH_002", { root: true })
            // context.commit('log/setCountOfNewMessages', 0, { root: true });
        },

        changePassword: (context, payload) => {

            let parameters = {
                queryName: "user_change_password",
                data: {
                    password: payload.password,
                },
            };

            context.dispatch('query/send', parameters, { root: true })
        },

    }

}