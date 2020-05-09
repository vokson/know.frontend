export default {
    namespaced: true,

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

        loginByToken: (context, token) => {

            let parameters = {
                queryName: "auth_login_by_token",
                data: {
                    access_token: token
                },
            };

            context.dispatch('query/send', parameters, { root: true })
        },

        logout: (context) => {
            context.commit('setUser', {
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
                queryName: "auth_change_password",
                data: {
                    password: payload.password,
                },
            };

            context.dispatch('query/send', parameters, { root: true })
        },

    }

}