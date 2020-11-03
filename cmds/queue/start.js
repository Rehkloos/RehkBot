const qhandler = require('@handlers/queuehandler');

module.exports = {
  name: 'qstart',
  aliases: ['start'],
  description: "Start queue",


  callback: async (message) => {
    qhandler.onOnline(message);

    const time = 1000 * 60 * 60 * 6; // clean queue after 6 hours
    setTimeout(async () => {
      qhandler.onClear(message);
      qhandler.onOffline(message);
    }, time);
  }
}