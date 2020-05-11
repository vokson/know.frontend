export default {
    namespaced: true,

    actions: {

        getDatabaseBackup: (context) => {

            let parameters = {
                queryName: "service_database_backup",
                data: {},
            };

            context.dispatch('query/sendInOrderToGetFile', parameters, { root: true });
        }

       
    }

}