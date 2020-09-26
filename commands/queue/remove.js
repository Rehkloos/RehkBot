const qhandler = require('@handlers/queuehandler');

module.exports = {
    commands: 'remove',
    minArgs: 0,
    maxArgs: 0,
    description: "Force remove someone from queue",
    permissions: 'MANAGE_CHANNELS',
    callback: (message, args) => {
        qhandler.onRemove(message, args);
    },
  }