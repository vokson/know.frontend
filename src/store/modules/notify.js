let getText = function (code) {

    switch (code) {

        case "E_QUERY_001":
            return {
                text: "Неверное имя запроса в обработчике запросов",
                type: "error"
            }

        case "E_RESPONSE_001":
            return {
                text: "Неверное имя запроса в обработчике ответов",
                type: "error"
            }

        case "E_SERVER_001":
            return {
                text: "Сервер не отвечает",
                type: "error"
            }

        case "E_SERVER_002":
            return {
                text: "Необработанная ошибка сервера",
                type: "error"
            }

        case "E_SERVER_003":
            return {
                text: "Неизвестная ошибка приложения",
                type: "error"
            }

        case "E_AUTH_001":
            return {
                text: "Добро пожаловать !!!",
                type: "success"
            }

        case "E_AUTH_002":
            return {
                text: "Вы вышли из системы",
                type: "warn"
            }

        case "E_AUTH_003":
            return {
                text: "Новый пароль сохранен",
                type: "success"
            }

        case "E_SETTING_001":
            return {
                text: "Настройки сохранены",
                type: "success"
            }

        case "E_USER_001":
            return {
                text: "Пользователь изменен",
                type: "success"
            }

        case "E_USER_002":
            return {
                text: "Пользователь удален",
                type: "success"
            }

        case "E_USER_003":
            return {
                text: "Пользователю установлен пароль по умолчанию",
                type: "success"
            }

        case "E_USER_004":
            return {
                text: "Пользователь добавлен",
                type: "success"
            }


        case '0.0':
            return {
                title: "Ошибка 0.0",
                text: "Необработанное исключение",
                type: "error"
            }

        // AUTH
        case '1.1':
            return {
                title: "Ошибка авторизации 1.1",
                text: "Неверный логин/пароль. Авторизуйтесь повторно.",
                type: "error"
            }

        case '1.2':
            return {
                title: "Ошибка авторизации 1.2",
                text: "Пользователь отключен.",
                type: "error"
            }

        case '1.3':
            return {
                title: "Ошибка авторизации 1.3",
                text: "Неверный токен. Авторизуйтесь повторно.",
                type: "error"
            }

        case '1.4':
            return {
                title: "Ошибка авторизации 1.4",
                text: "Истек срок годности токена. Авторизуйтесь повторно.",
                type: "error"
            }

        case '1.5':
            return {
                title: "Ошибка авторизации 1.5",
                text: "Доступ запрещен.",
                type: "error"
            }

        // USER
        case '2.1':
            return {
                title: "Ошибка валидации пользователя 2.1",
                text: "Неверные данные в поле active.",
                type: "error"
            }

        case '2.2':
            return {
                title: "Ошибка валидации пользователя 2.2",
                text: "Неверные данные в поле email.",
                type: "error"
            }

        case '2.3':
            return {
                title: "Ошибка валидации пользователя 2.3",
                text: "Неверные данные в поле name.",
                type: "error"
            }

        case '2.4':
            return {
                title: "Ошибка валидации пользователя 2.4",
                text: "Неверные данные в поле surname.",
                type: "error"
            }

        case '2.5':
            return {
                title: "Ошибка валидации пользователя 2.5",
                text: "Неверные данные в поле role.",
                type: "error"
            }

        case '2.6':
            return {
                title: "Ошибка валидации пользователя 2.6",
                text: "Неверные данные в поле permission_expression.",
                type: "error"
            }

        case '2.7':
            return {
                title: "Ошибка создания пользователя 2.7",
                text: "Введенный e-mail не уникален.",
                type: "error"
            }

        case '2.8':
            return {
                title: "Ошибка сохранения пользователя 2.8",
                text: "Не существует пользователя с данным ID.",
                type: "error"
            }

        // SETTING
        case '3.1':
            return {
                title: "Ошибка валидации настроек 3.1",
                text: "Неверные данные в поле items.",
                type: "error"
            }

        case '3.2':
            return {
                title: "Ошибка валидации настроек 3.2",
                text: "Неверные данные в поле name.",
                type: "error"
            }

        case '3.3':
            return {
                title: "Ошибка валидации настроек 3.3",
                text: "Неверные данные в поле value.",
                type: "error"
            }

        case '3.4':
            return {
                title: "Ошибка сохранения настроек 3.4",
                text: "Настройки с данным именем не существует.",
                type: "error"
            }

        // ACTION
        case '4.1':
            return {
                title: "Ошибка валидации действия 4.1",
                text: "Неверные данные в поле role.",
                type: "error"
            }

        case '4.2':
            return {
                title: "Ошибка валидации действия 4.2",
                text: "Неверные данные в поле name.",
                type: "error"
            }

        case '4.3':
            return {
                title: "Ошибка валидации действия 4.3",
                text: "Неверные данные в поле state.",
                type: "error"
            }
            
        case '4.4':
            return {
                title: "Ошибка валидации действия 4.4",
                text: "Неверные данные в поле items.",
                type: "error"
            }

        // ARTICLE
        case '5.1':
            return {
                title: "Ошибка валидации статьи 5.1",
                text: "Неверные данные в поле subject.",
                type: "error"
            }

        case '5.2':
            return {
                title: "Ошибка валидации статьи 5.2",
                text: "Неверные данные в поле body.",
                type: "error"
            }

        case '5.3':
            return {
                title: "Ошибка валидации статьи 5.3",
                text: "Неверные данные в поле id.",
                type: "error"
            }

        case '5.4':
            return {
                title: "Ошибка валидации статьи 5.4",
                text: "Неверные данные в поле is_attacment_exist.",
                type: "error"
            }

        case '5.5':
            return {
                title: "Ошибка сохранения статьи 5.5",
                text: "Не существует статьи с данным ID.",
                type: "error"
            }

        case '5.6':
            return {
                title: "Ошибка получения статьи 5.6",
                text: "Не существует статьи с данными ID/VERSION.",
                type: "error"
            }

        case '5.7':
            return {
                title: "Ошибка удаления статьи 5.7",
                text: "Не существует статьи с данными ID/VERSION.",
                type: "error"
            }

        case '5.8':
            return {
                title: "Ошибка удаления статьи 5.8",
                text: "Нельзя удалить не последнюю версию статьи.",
                type: "error"
            }

        case '5.9':
            return {
                title: "Ошибка валидации статьи 5.9",
                text: "Неверные данные в поле version.",
                type: "error"
            }

        // TAG
        case '6.1':
            return {
                title: "Ошибка валидации тэга 6.1",
                text: "Неверные данные в поле id.",
                type: "error"
            }

        case '6.2':
            return {
                title: "Ошибка валидации тэга 6.2",
                text: "Неверные данные в поле name.",
                type: "error"
            }

        case '6.3':
            return {
                title: "Ошибка добавления тэга 6.3",
                text: "Не существует статьи с данным ID.",
                type: "error"
            }

        case '6.4':
            return {
                title: "Ошибка добавления тэга 6.4",
                text: "Тэг с данным именем не существует.",
                type: "error"
            }

        default:
            return {
                title: "Ошибка Уведомления",
                text: "Неверный текстовый код " + code,
                type: "error"
            }
    }

}


import Vue from 'vue'

export default {
    namespaced: true,

    state: {
        errors: []
    },

    getters: {
        giveErrors(state) {
            return state.errors;
        }
    },


    actions: {
        showNotifyByCode(context, code) {
            Vue.notify(Object.assign(getText(code), { group: "notify-group" }))
        },
    },

    mutations: {
        updateErrors: function (state, data) {
            state.errors = data;
        },

        cleanErrors: function (state) {
            state.errors = [];
        },

    }
}