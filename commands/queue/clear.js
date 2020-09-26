const qhandler = require('../../handlers/queuehandler');

module.exports = {
    commands: 'clear',
    minArgs: 0,
    maxArgs: 0,
    description: "removes all users from the queue and removes any next messages that were in the chat.",
    permissions: 'MANAGE_CHANNELS',
    callback: (message, args) => {
        qhandler.onClear(message);
    },
}