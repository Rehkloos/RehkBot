const qhandler = require('@features/queuehandler');


module.exports = {
    name: 'qclear',
    aliases: ['clear'],
    description: 'fully clear queue',
    requiredPermissions: ['MANAGE_MESSAGES'],


    callback: async (message) => {
        qhandler.onClear(message);
    }
}