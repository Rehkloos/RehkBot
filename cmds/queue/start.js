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

        const time = 1000 * 60 * 60 * 6; // clean queue after 6 hours
      setTimeout(async () => { 
          qhandler.onClear(message);
          qhandler.onOffline(message);
        }, time);
    }
  }