let getText = function (code) {

    switch (code) {

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

        case 'E_001':
            return {
                text: "Тест пройден",
                type: "success"
            }

        // case 'E_002':
        //     return {
        //         text: "Все данные успешно удалены из базы данных",
        //         type: "success"
        //     }

        // case 'E_003':
        //     return {
        //         text: "Модели успешно объединены",
        //         type: "success"
        //     }

        // case '0.0':
        //     return {
        //         title: "Ошибка 0.0",
        //         text: "Необработанное исключение",
        //         type: "error"
        //     }

        // case '2.1':
        //     return {
        //         title: "Ошибка 2.1",
        //         text: "Неверный данные в запросе к серверу",
        //         type: "error"
        //     }

        // case '3.1':
        //     return {
        //         title: "Ошибка 3.1",
        //         text: "Попытка добавить в модель уже существующий элемент",
        //         type: "error"
        //     }

        // case '3.2':
        //     return {
        //         title: "Ошибка 3.2",
        //         text: "Попытка добавить в модель элемент неверного типа",
        //         type: "error"
        //     }

        // case '3.3':
        //     return {
        //         title: "Ошибка 3.3",
        //         text: "Недопустимое свойство элемента",
        //         type: "error"
        //     }

        // case '3.4':
        //     return {
        //         title: "Ошибка 3.4",
        //         text: "У элемента нет обязательного свойства",
        //         type: "error"
        //     }

        // case '3.5':
        //     return {
        //         title: "Ошибка 3.5",
        //         text: "Попытка доступа к элементу модели неверного типа",
        //         type: "error"
        //     }

        // case '3.6':
        //     return {
        //         title: "Ошибка 3.6",
        //         text: "В базе данных несколько моделей с одинаковым хэшем",
        //         type: "error"
        //     }

        // case '3.7':
        //     return {
        //         title: "Ошибка 3.7",
        //         text: "В базе данных отсутствует модель с данным хэшем",
        //         type: "error"
        //     }

        // case '4.1':
        //     return {
        //         title: "Ошибка 4.1",
        //         text: "Ошибка доступа к базе данных",
        //         type: "error"
        //     }

        // case '4.2':
        //     return {
        //         title: "Ошибка 4.2",
        //         text: "Ошибка подготовки запроса к базе данных",
        //         type: "error"
        //     }

        // case '4.3':
        //     return {
        //         title: "Ошибка 4.3",
        //         text: "Неверный тип соединения при подключении к базе данных",
        //         type: "error"
        //     }

        // case '4.4':
        //     return {
        //         title: "Ошибка 4.4",
        //         text: "Неверный оператор при подготовки запроса к базе данных",
        //         type: "error"
        //     }

        // case '4.5':
        //     return {
        //         title: "Ошибка 4.5",
        //         text: "Ошибка базы данных Neo4j",
        //         type: "error"
        //     }

        // case '5.1':
        //     return {
        //         title: "Ошибка 5.1",
        //         text: "Ошибка сохранения файла на сервере",
        //         type: "error"
        //     }

        // case '6.1':
        //     return {
        //         title: "Ошибка 6.1",
        //         text: "Ошибка импорта - неверный формат JSON",
        //         type: "error"
        //     }

        // case '6.2':
        //     return {
        //         title: "Ошибка 6.2",
        //         text: "Ошибка импорта - отсутвует обязательное свойство",
        //         type: "error"
        //     }

        // case '7.1':
        //     return {
        //         title: "Ошибка 7.1",
        //         text: "Ошибка слияния - неверный класс аргумента",
        //         type: "error"
        //     }

        // case '7.2':
        //     return {
        //         title: "Ошибка 7.2",
        //         text: "Ошибка слияния - неверный аргумент при сравнении свойств",
        //         type: "error"
        //     }

        // case '7.3':
        //     return {
        //         title: "Ошибка 7.3",
        //         text: "Ошибка слияния - попытка слияния неэквивалентных объектов",
        //         type: "error"
        //     }

        // case '7.4':
        //     return {
        //         title: "Ошибка 7.4",
        //         text: "Ошибка слияния - неизвестная ошибка",
        //         type: "error"
        //     }

        // case '7.5':
        //     return {
        //         title: "Ошибка 7.5",
        //         text: "Ошибка слияния - необходимо решение пользователя",
        //         type: "error"
        //     }

        // case '8.1':
        //     return {
        //         title: "Ошибка 8.1",
        //         text: "Попытка доступа к несуществующей стандратной настройке",
        //         type: "error"
        //     }



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