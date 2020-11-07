const qhandler = require('@features/queuehandler');

module.exports = {
    name: 'qlist',
    aliases: ['list', 'queue'],
    description: "Check how much people are in queue",


    callback: async (message) => {
        qhandler.onQueue(message);
    }
}