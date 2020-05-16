export default {
    namespaced: true,

    state: {
        id: null,
        version: null,
        subject: "",
        body: "",
        is_attachment_exist: null,
        owner: ""
    },

    getters: {
        giveId: function (state) {
            return state.id;
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
            state.id = data.id;
            state.version = data.version;
            state.subject = data.subject;
            state.body = data.body;
            state.is_attachment_exist = data.is_attachment_exist;
            state.owner = data.owner;
        },
    },

    actions: {

        get: (context, payload) => {

            let parameters = {
                queryName: "article_get",
                data: {
                    id: payload.id,
                    version: payload.version
                },
            };

            context.dispatch('query/send', parameters, { root: true })
        },

        set: (context, payload) => {

            let parameters = {
                queryName: "article_set",
                data: {
                    id: payload.id,
                    subject: payload.subject,
                    body: payload.body
                },
            };

            context.dispatch('query/send', parameters, { root: true })
        },

    }

}