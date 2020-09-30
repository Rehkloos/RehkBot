const qhandler = require('@handlers/queuehandler');
const Commando = require('discord.js-commando');

module.exports = class DequeueCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'qdequeue',
            aliases: ['dequeue'],
            group: 'queue',
            memberName: 'qdequeue',
            description: 'removes yourself from ongoing queue',
        })
    }

    async run(message) {
        qhandler.onLeave(message);
    }
  }