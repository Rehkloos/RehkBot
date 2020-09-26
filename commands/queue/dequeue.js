const qhandler = require('../../handlers/queuehandler');

module.exports = {
    commands: ['dequeue', 'leave'],
    minArgs: 0,
    maxArgs: 0,
    description: "removes yourself from ongoing queue",
    callback: (message, args) => {
        qhandler.onLeave(message);
    },
  }