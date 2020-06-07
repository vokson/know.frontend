export default {
    namespaced: true,

    state: {
        items: []
    },

    getters: {
        give: function (state) {
            return state.items;
        }
    },

    mutations: {
        update: function (state, data) {

            data.map(function (e) {
                e.uploadedSize = e.size;
            });

            state.items = data;

        },

        add: function (state, newItem) {
            state.items.push(newItem);
        },

        deleteSuccess: function (state, uin) {
            state.items.map(function (elem, i) {
                if (elem.uin == uin) {
                    state.items.splice(i, 1);
                }
            });
        },

        uploadSuccess: function (state, data) {

            for (let i = 0; i < state.items.length; i++) {

                if (state.items[i].uin == data.uin) {
                    state.items[i].id = data.id;
                    break;
                }
            }

        },


        updateProgress: function (state, data) {

            for (let i = 0; i < state.items.length; i++) {

                if (state.items[i].uin == data.uin) {
                    state.items[i].size = data.size;
                    state.items[i].uploadedSize = data.uploadedSize;
                    break;
                }
            }

        },

        newArticle: function (state) {
            state.items = [];
        },


    },

    actions: {

        delete: (context, payload) => {

            let parameters = {
                queryName: "article_file_delete",
                data: {
                    file_id: payload.file_id
                },
            };

            context.dispatch('query/send', parameters, { root: true })
        },

        get: (context, payload) => {

            let parameters = {
                queryName: "article_file_get",
                data: {
                    article_id: payload.article_id
                },
            };

            context.dispatch('query/send', parameters, { root: true });
        },

        download: (context, payload) => {

            let parameters = {
                queryName: "article_file_download",

                data: {
                    file_id: payload.file_id
                },

                isInline: false // Запрос нас качивание, а не показ
            };

            context.dispatch('query/sendInOrderToGetFile', parameters, { root: true });
        },

        downloadAll: (context, payload) => {

            let parameters = {
                queryName: "article_file_download_all",
                data: {
                    article_id: payload.article_id
                }
            };

            context.dispatch('query/sendInOrderToGetFile', parameters, { root: true });
        },


        upload: (context, payload) => {

            context.commit('add', {
                id: null,
                uin: payload.uin,
                original_name: payload.file.name,
                size: payload.file.size,
                uploadedSize: 0
            });

            let parameters = {
                queryName: "article_file_upload",
                data: payload,
            };

            context.dispatch('query/sendInOrderToUploadFile', parameters, { root: true })
        },

        

    }

}