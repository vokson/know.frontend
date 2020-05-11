export default {
    namespaced: true,

    actions: {

        use: (context, payload) => {

            context.commit('setApiResponse', payload, { root: true });

            if (payload.success == 0) {
                context.dispatch('notify/showNotifyByCode', payload.error, { root: true });
                context.commit('notify/updateErrors', payload.notifications, { root: true });

            } else {

                switch (payload.queryName) {

                    case "auth_login":
                    case "auth_login_by_token":
                        context.dispatch("auth_login", payload);
                        break;

                    case "auth_check_token":
                        break;

                    case "user_change_password":
                        context.dispatch("user_change_password", payload);
                        break;

                    case "user_get":
                        context.dispatch("user_get", payload);
                        break;
                    case "user_set":
                        context.dispatch("user_set", payload);
                        break;
                    case "user_set_default_password":
                        context.dispatch("user_set_default_password", payload);
                        break;
                    case "user_delete":
                        context.dispatch("user_delete", payload);
                        break;

                    case "setting_get":
                        context.dispatch("setting_get", payload);
                        break;

                    case "setting_set":
                        context.dispatch("setting_set", payload);
                        break;

                    default:
                        context.dispatch('notify/showNotifyByCode', "E_RESPONSE_001", { root: true })
                }
            }
        },

        auth_login: (context, payload) => {

            if (payload.success == 1) {
                context.commit('setUser', payload, { root: true });
                context.dispatch('notify/showNotifyByCode', "E_AUTH_001", { root: true })

            } else {
                context.commit('setUser', {
                    access_token: "",
                    name: "",
                    surname: "",
                    role: "guest",
                    email: ""
                }, { root: true });
            }

        },

        user_change_password: (context, payload) => {

            if (payload.success == 1) {
                context.dispatch('notify/showNotifyByCode', "E_AUTH_003", { root: true })
                // context.dispatch('auth/loginByToken', context.rootState.user.access_token, { root: true });
            }

        },

        user_get: (context, payload) => {

            if (payload.success == 1) {
                context.commit('users/update', payload.items, { root: true });
            }

        },

        user_set: (context, payload) => {

            if (payload.success == 1) {
                context.dispatch('notify/showNotifyByCode', "E_USER_001", { root: true })
                context.dispatch('users/get', context.rootGetters['users/givePreviousSearch'], { root: true });
            }

        },

        user_set_default_password: (context, payload) => {

            if (payload.success == 1) {
                context.dispatch('notify/showNotifyByCode', "E_USER_003", { root: true })
            }

        },

        user_delete: (context, payload) => {

            if (payload.success == 1) {
                context.dispatch('notify/showNotifyByCode', "E_USER_002", { root: true })
                context.dispatch('users/get', context.rootGetters['users/givePreviousSearch'], { root: true });
            }

        },

        setting_get: (context, payload) => {

            if (payload.success == 1) {
                context.commit('setting/update', payload.items, { root: true });
            }

        },

        setting_set: (context, payload) => {

            if (payload.success == 1) {
                context.dispatch('notify/showNotifyByCode', "E_SETTING_001", { root: true })
            }

        },



    }

}