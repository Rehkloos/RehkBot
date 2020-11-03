const qhandler = require('@handlers/queuehandler');

module.exports = {
    name: 'qdequeue',
    aliases: ['dequeue', 'leave'],
    description: 'removes yourself from ongoing queue',



    callback: async (message) => {
        qhandler.onLeave(message);
    }
}