const qhandler = require('@features/queuehandler');

module.exports = {
    name: 'qjoin',
    aliases: ['join', 'j'],
    description: `adds a user to queue and responds with user's position in queue.`,


    callback: async (message, args) => {
        qhandler.onNext(message, args);
    }
}