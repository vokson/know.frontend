let guest = [
    '/',
    '/login',
];

let reader = [
    '/home',
    '/article/search',
    '?/article/read'

];

let editor = [
    '/tag',
    '?/article/edit'
];

let admin = [
    '?/admin'
];

let permissions = {
    guest: guest,
    reader: guest.concat(reader),
    editor: guest.concat(reader).concat(editor),
    admin: guest.concat(reader).concat(editor).concat(admin)
}


export default {
    namespaced: true,

    state: {
        isOk: false
    },

    getters: {
        mayEnter: function (state) {
            return state.isOk;
        }
    },

    mutations: {
        path: function (state, payload) {
            state.isOk = false;

            if (Object.prototype.hasOwnProperty.call(permissions, payload.role)) {
                let urls = permissions[payload.role];
                // console.log(urls);

                urls.forEach(function (url) {

                    if (state.isOk === false) {

                        let cleanUrl = url;
                        let exactMatch = true;

                        if (url[0] === '?') {
                            cleanUrl = url.substring(1);
                            exactMatch = false;
                        }

                        // console.log('COMPARE ' + payload.path + ' WITH ' + cleanUrl);

                        if (exactMatch === true) {
                            if (cleanUrl == payload.path) {
                                // console.log('PASS EXACT MATCH');
                                state.isOk = true;
                            }
                        } else {
                            if (payload.path.includes(cleanUrl)) {
                                // console.log('PASS INCLUDES');
                                state.isOk = true;
                            }
                        }

                    }



                })

            }


        }
    }

}