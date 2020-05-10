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


    }

}