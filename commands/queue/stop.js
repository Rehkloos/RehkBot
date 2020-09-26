const qhandler = require('../../handlers/queuehandler');

module.exports = {
    commands: 'stop',
    minArgs: 0,
    maxArgs: 0,
    description: "Stop queue handler",
    callback: (message) => {
        qhandler.onOffline(message);
    },
}