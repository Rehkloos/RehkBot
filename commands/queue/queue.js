const qhandler = require('@handlers/queuehandler');

module.exports = {
    commands: ['queue','list'],
    minArgs: 0,
    maxArgs: 0,
    description: "Check how much people are in queue",
    callback: (message) => {
        qhandler.onQueue(message);
    },
  }
  