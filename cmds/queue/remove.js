const qhandler = require('@handlers/queuehandler');

module.exports = {
    name: 'qremove',
    aliases: ['remove', 'qwipe'],
    description: "Remove a specific person from queue",


    callback: async (message, args) => {
        qhandler.onRemove(message, args);
    }
}