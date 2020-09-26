const qhandler = require('@handlers/queuehandler');

module.exports = {
    commands: ['join','next','j'],
    minArgs: 0,
    maxArgs: 0,
    description: "adds a user to queue and responds with user's position in queue. Please provide an issue.",
    callback: (message, args) => {
        qhandler.onNext(message, args);
    },
  }