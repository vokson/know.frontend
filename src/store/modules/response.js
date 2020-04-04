export default {
    namespaced: true,

    actions: {

        use: (context, payload) => {

            context.commit('setApiResponse', payload, { root: true });

            if (payload.success == 0) {
                context.dispatch('notify/showNotifyByCode', payload.error, { root: true });
                context.commit('notify/updateErrors', payload.notifications, { root: true });

            } else {

                switch (payload.queryName) {

                    case "test":
                        context.dispatch("test", payload);
                        break;

                    default:
                        context.dispatch('notify/showNotifyByCode', "E_RESPONSE_001", { root: true })
                }
            }
        },

        test: (context, payload) => {

            if (payload.success == 1) {

                console.log("TEST PASSED")
                context.dispatch('notify/showNotifyByCode', "E_001", { root: true });
                // context.commit('upload_file/uploadSuccess', payload, { root: true });
                // context.commit('model_uin/update', payload, { root: true });

            }

        }

       
    }

}