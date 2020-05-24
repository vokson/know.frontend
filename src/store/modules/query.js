let urls = {
    auth_is_token_valid: "/user/is/token/valid",
    auth_login: "/user/login",
    auth_login_by_token: "/user/login/token",

    user_change_password: '/user/change/password',

    setting_get: '/setting/get',
    setting_set: '/setting/set',

    user_get: "/user/get",
    user_create: "/user/create",
    user_set: "/user/set",
    user_set_default_password: "/user/set/default/password",
    user_delete: "/user/delete",

    action_get: "/action/get",
    action_set: "/action/set",

    article_get: "/article/get",
    article_set: "/article/set",
    article_delete: "/article/delete",
    article_search: "/article/search",

    article_file_upload: "/article/file/upload",
    article_file_get: "/article/file/get",
    article_file_download: "/article/file/download",
    article_file_download_all: "/article/file/download/all",
    article_file_delete: "/article/file/delete",

    tag_list: "/tag/list",
    tag_create: "/tag/create",
    tag_delete: "/tag/delete",
    tag_get: "/tag/get",
    tag_set: "/tag/set",
    tag_list_by_article: "/tag/list/by/article",


    service_database_backup: '/service/database/backup',
};

let isUrlExist = function(context, payload) {

    if (!Object.prototype.hasOwnProperty.call(urls, payload.queryName)) {
        context.dispatch('notify/showNotifyByCode', "E_QUERY_001", { root: true });

        return false;
    }

    return true;
}

export default {
    namespaced: true,

    actions: {

        send: (context, payload) => {

            if (!isUrlExist(context, payload)) return;

            let data = payload.data
            data.access_token = context.rootGetters['auth/giveAccessToken'];

            let query_name = payload.queryName

            let responseFunction = function (response) {

                // console.log(query_name);
                response.data.queryName = query_name;
                context.dispatch('response/use', response.data, { root: true });
            };

            // Пробрасываем имя запроса в response, чтобы точно знать от какой функции ответ
            responseFunction.bind(this);

            window.$axios.request({
                url: urls[payload.queryName],
                data: data,
                method: 'post',
                timeout: 10000, // Ждем 10 сек ответа сервера
            })
                .then(responseFunction)
                .catch(function (error) {

                    if (error.response) {
                        context.dispatch('notify/showNotifyByCode', "E_SERVER_002", { root: true });
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        context.dispatch('notify/showNotifyByCode', "E_SERVER_001", { root: true });
                        // The request was made but no response was received
                        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                        // http.ClientRequest in node.js
                        console.log(error.request);
                    } else {
                        context.dispatch('notify/showNotifyByCode', "E_SERVER_003", { root: true });
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
                    }

                    // console.log(error.config);
                });
        },

        sendInOrderToGetFile: (context, payload) => {

            if (!isUrlExist(context, payload)) return;

            let data = payload.data
            data.access_token = context.rootGetters['auth/giveAccessToken'];

            let responseFunction = function (response) {

                // Скачивание
                if (payload.isInline == true) {

                    var newBlob = new Blob([response.data], { type: "application/pdf" })
                    const url = window.URL.createObjectURL(newBlob);
                    window.open(url);
                    window.URL.revokeObjectURL(url);

                } else {
                    // Открытие PDF на новой вкладке

                    let filename = decodeURIComponent(response.headers['content-filename']);
                    window.$download(response.data, filename);

                    // Вызов дополнительной функции после завершения запроса
                    if (payload.afterDownloadAction != null) {
                        context.dispatch(payload.afterDownloadAction, {}, { root: true });
                    }

                }
            }

            window.$axios({
                url: urls[payload.queryName],
                data: data,
                method: 'post',
                headers: {
                    'Accept': '*/* ',
                },
                responseType: 'blob'
            })
                .then(responseFunction)
                .catch(function (error) {
                    console.log(error);
                    // context.dispatch('notify/showNotifyByCode', 601, { root: true })
                });
        },

        sendInOrderToUploadFile: (context, payload) => {

            if (!isUrlExist(context, payload)) return;

            let query_name = payload.queryName;

            let responseFunction = function (response) {

                // Если загрузка файла не удалась, надо что-то делать..
                if (response.data.success == 0) {
                    payload.data.badFileUploadCallback();
                }

                // console.log(query_name);
                response.data.queryName = query_name;
                context.dispatch('response/use', response.data, { root: true });
            };

            // Пробрасываем имя запроса в response, чтобы точно знать от какой функции ответ
            responseFunction.bind(this);

            let data = payload.data

            let formData = new FormData();
            Object.keys(payload.data).map(function (key) {
                formData.append(key, data[key]);
            });

            formData.append('access_token', context.rootGetters['auth/giveAccessToken']);

            window.$axios({
                url: urls[payload.queryName],
                data: formData,
                method: 'post',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },

                onUploadProgress: payload.data.progressCallback,
            })
                .then(responseFunction)
                .catch(function (error) {
                    console.log(error);
                });


        },

    }

}