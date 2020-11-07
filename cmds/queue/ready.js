const qhandler = require('@features/queuehandler');

module.exports = {
    name: 'qready',
    aliases: ['ready', 'next'],
    description: "Ping the next persion in queue",



    callback: async (message, args) => {
        qhandler.onReady(message, args);
    }
}