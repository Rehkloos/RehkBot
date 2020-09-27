const qhandler = require('@handlers/queuehandler');
const Commando = require('discord.js-commando');

module.exports = class QueueCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'qlist',
            aliases: ['list', 'queue'],
            group: 'queue',
            memberName: 'qlist',
            description: "Check how much people are in queue",
        })
    }

    async run(message) {
        qhandler.onQueue(message);
    }
  }
  