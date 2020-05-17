export default {
    namespaced: true,

    state: {
        uin: null,
        version: null,
        subject: "",
        body: "",
        is_attachment_exist: null,
        owner: ""
    },

    getters: {
        giveUin: function (state) {
            return state.uin;
        },

        giveVersion: function (state) {
            return state.version;
        },

        giveSubject: function (state) {
            return state.subject;
        },

        giveBody: function (state) {
            return state.body;
        },

        giveIsAttachmentExist: function (state) {
            return state.is_attachment_exist;
        },

        giveOwner: function (state) {
            return state.owner;
        }
    },

    mutations: {
        update: function (state, data) {
            state.uin = data.uin;
            state.version = data.version;
            state.subject = data.subject;
            state.body = data.body;
            state.is_attachment_exist = data.is_attachment_exist;
            state.owner = data.owner;
        },

        updateUin: function (state, value) {
            state.uin = value;
        },

        updateVersion: function (state, value) {
            state.version = value;
        },

        updateSubject: function (state, value) {
            state.subject = value;
        },

        updateBody: function (state, value) {
            state.body = value;
        },
    },

    actions: {

        get: (context, payload) => {

            let parameters = {
                queryName: "article_get",
                data: {
                    uin: payload.uin,
                    version: payload.version
                },
            };

            context.dispatch('query/send', parameters, { root: true })
        },

        set: (context) => {

            let parameters = {
                queryName: "article_set",
                data: {
                    uin: context.state.uin,
                    subject: context.state.subject,
                    body: context.state.body
                },
            };

            context.dispatch('query/send', parameters, { root: true })
        },

    }

}