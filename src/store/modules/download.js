export default {
    namespaced: true,

    state: {
        items: [],
    },

    getters: {
        give: function (state) {
            return state.items;
        },
    },

    mutations: {
        update: function (state, data) {

            data.map(function (e) {
                e.downloadedSize = e.size;
            });

            state.items = data;

        },

        add: function (state, newItem) {
            state.items.push(newItem);
        },

        updateProgress: function (state, data) {

            for (let i = 0; i < state.items.length; i++) {

                if (state.items[i].uin == data.uin) {
                    state.items[i].size = Number(data.size);
                    state.items[i].downloadedSize = Number(data.downloadedSize);

                    if (state.items[i].downloadedSize >= state.items[i].size) {
                        state.items.splice(i, 1);
                    }

                    break;
                }
            }

        },

    },

    actions: {

        do: (context, payload) => {

            let uin = window.$guid();

            context.commit('add', {
                uin: uin,
                size: 0,
                downloadedSize: 0
            });

            let updateProgress = function (uin, downloadedBytes, totalBytes) {

                this.commit("updateProgress", {
                    uin: uin,
                    size: totalBytes,
                    downloadedSize: downloadedBytes
                });
            }

            let progressCallback = updateProgress.bind(context);

            

            let badDownloadFunction = function () {
                this.dispatch('notify/showNotifyByCode', "E_DOWNLOAD_001", { root: true });
            };

            let parameters = {

                uin: uin,
                queryName: payload.queryName,
                data: payload.data,
                isInline: false, // Запрос на скачивание, а не показ

                progressCallback: function (e) {
                    progressCallback(uin, e.loaded, e.total);
                },

                badFileDownloadCallback: badDownloadFunction.bind(context)
            };

            context.dispatch('query/sendInOrderToGetFile', parameters, { root: true });
        },

    }

}