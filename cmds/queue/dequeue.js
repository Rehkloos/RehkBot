const qhandler = require('@features/queuehandler');

module.exports = {
    name: 'qdequeue',
    aliases: ['dequeue', 'leave'],
    description: 'removes yourself from ongoing queue',



    callback: async (message) => {
        qhandler.onLeave(message);
    }
}