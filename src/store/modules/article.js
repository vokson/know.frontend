export default {
    namespaced: true,

    state: {
        uin: null,
        version: null,
        max_version: null,
        subject: "",
        body: "",
        is_attachment_exist: null,
        owner: "",
        date: ""
    },

    getters: {
        giveUin: function (state) {
            return state.uin;
        },

        giveVersion: function (state) {
            return state.version;
        },

        giveMaxVersion: function (state) {
            return state.version;
        },

        givePreviousVersion: function (state) {
            return (state.version > 1) ? state.version - 1 : false;
        },

        giveNextVersion: function (state) {
            return (state.version < state.max_version) ? state.version + 1 : false;
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
        },

        giveDate: function (state) {
            return state.date;
        }
    },

    mutations: {
        update: function (state, data) {
            state.uin = parseInt(data.uin);
            state.version = parseInt(data.version);
            state.max_version = parseInt(data.max_version);
            state.subject = data.subject;
            state.body = data.body;
            state.is_attachment_exist = data.is_attachment_exist;
            state.owner = data.owner;
            state.date = data.date;
        },

        updateUin: function (state, value) {
            state.uin = parseInt(value);
        },

        updateVersion: function (state, value) {
            state.version = parseInt(value);
        },

        updateSubject: function (state, value) {
            state.subject = value;
        },

        updateBody: function (state, value) {
            state.body = value;
        },

        new: function (state) {
            state.uin = null;
            state.version = null;
            state.max_version = null;
            state.subject = "";
            state.body = "";
            state.is_attachment_exist = null;
            state.owner = "";
            state.date = "";
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