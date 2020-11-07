const qhandler = require('@features/queuehandler');

module.exports = {
    name: 'qstop',
    aliases: ['stop'],
    description: "Stop queue",


    callback: async (message) => {
        qhandler.onOffline(message);
    }
}