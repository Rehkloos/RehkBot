const qhandler = require('../../handlers/queuehandler');

module.exports = {
    commands: 'ready',
    minArgs: 0,
    maxArgs: 0,
    description: "Ping the next persion in queue",
    callback: (message, args) => {
        qhandler.onReady(message, args);
    },
  }