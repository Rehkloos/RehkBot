const qhandler = require('../../handlers/queuehandler');

module.exports = {
    commands: 'start',
    minArgs: 0,
    maxArgs: 0,
    description: "Start queue handler",
    callback: (message) => {
        qhandler.onOnline(message);

        setTimeout(async () => { // clean queue after 6 hours
            qhandler.onClear(message);
            qhandler.onOffline(message);
          }, 1000 * 60 * 60 * 6);
    },
  }