const qhandler = require('@handlers/queuehandler');
const Commando = require('discord.js-commando');

module.exports = class RemoveCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'qremove',
            aliases: ['remove', 'qwipe'],
            group: 'queue',
            memberName: 'qremove',
            description: "Remove a specific person from queue",
            argsType: 'multiple',
        })
    }

    async run(message, args) {
        qhandler.onRemove(message, args);
    }
  }