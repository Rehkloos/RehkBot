const qhandler = require('@handlers/queuehandler');
const Commando = require('discord.js-commando');

module.exports = class StartCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'qstart',
            aliases: ['start'],
            group: 'queue',
            memberName: 'qstart',
            description: "Start queue",
        })
    }

    async run(message) {
      qhandler.onOnline(message);

      setTimeout(async () => { // clean queue after 6 hours
          qhandler.onClear(message);
          qhandler.onOffline(message);
        }, 1000 * 60 * 60 * 6);
    }
  }