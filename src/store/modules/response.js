export default {
    namespaced: true,

    actions: {

        use: (context, payload) => {

            // context.commit('setApiResponse', payload, { root: true });

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
                    case "user_create":
                        context.dispatch("user_create", payload);
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

                    case "action_get":
                        context.dispatch("action_get", payload);
                        break;

                    case "action_set":
                        context.dispatch("action_set", payload);
                        break;

                    case "article_get":
                        context.dispatch("article_get", payload);
                        break;

                    case "article_set":
                        context.dispatch("article_set", payload);
                        break;

                    case "article_search":
                        context.dispatch("article_search", payload);
                        break;

                    case "tag_list":
                        context.dispatch("tag_list", payload);
                        break;

                    case "tag_create":
                        context.dispatch("tag_create", payload);
                        break;

                    case "tag_delete":
                        context.dispatch("tag_delete", payload);
                        break;

                    case "tag_get":
                        context.dispatch("tag_get", payload);
                        break;

                    case "tag_set":
                        context.dispatch("tag_set", payload);
                        break;



                    default:
                        context.dispatch('notify/showNotifyByCode', "E_RESPONSE_001", { root: true })
                }
            }
        },

        auth_login: (context, payload) => {

            if (payload.success == 1) {
                context.commit('auth/setUser', payload, { root: true });
                context.dispatch('notify/showNotifyByCode', "E_AUTH_001", { root: true })

            } else {
                context.commit('auth/setUser', {
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

        user_create: (context, payload) => {

            if (payload.success == 1) {
                context.dispatch('notify/showNotifyByCode', "E_USER_004", { root: true })
                context.dispatch('users/get', context.rootGetters['users/givePreviousSearch'], { root: true });
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

        action_get: (context, payload) => {

            if (payload.success == 1) {
                context.commit('action/update', payload.items, { root: true });
            }

        },

        action_set: (context, payload) => {

            if (payload.success == 1) {
                context.dispatch('notify/showNotifyByCode', "E_SETTING_001", { root: true })
                context.dispatch('action/get', {}, { root: true });
            }

        },

        article_get: (context, payload) => {

            if (payload.success == 1) {
                context.commit('article/update', payload, { root: true });
            }

        },

        article_set: (context, payload) => {

            if (payload.success == 1) {
                context.dispatch('notify/showNotifyByCode', "E_ARTICLE_001", { root: true })
                context.dispatch('article/get', {
                    uin: payload.uin,
                    version: payload.version
                }, { root: true });
            }

        },

        article_search: (context, payload) => {

            if (payload.success == 1) {
                context.commit('article_search/updateArticles', payload.items, { root: true });
            }

        },

        tag_list: (context, payload) => {

            // console.log('tag_list');
            if (payload.success == 1) {
                context.commit('tag/update', payload.items, { root: true });
            }

        },

        tag_create: (context, payload) => {

            if (payload.success == 1) {
                context.dispatch('notify/showNotifyByCode', "E_TAG_001", { root: true })
                context.dispatch('tag/list', {}, { root: true });
            }

        },

        tag_delete: (context, payload) => {

            if (payload.success == 1) {
                context.dispatch('notify/showNotifyByCode', "E_TAG_002", { root: true })
                context.dispatch('tag/list', {}, { root: true });
            }

        },

        tag_get: (context, payload) => {

            // console.log('tag_get');
            if (payload.success == 1) {
                context.commit('tag/updateOnlyForSingleArticle', payload.items, { root: true });
            }

        },

        tag_set: (context, payload) => {

            if (payload.success == 1) {
                context.dispatch('notify/showNotifyByCode', "E_TAG_004", { root: true })
                // console.log('tag_set');
                context.dispatch('tag/get', {
                    id: payload.id
                }, { root: true });
            }

        },



    }

}