const qhandler = require('@handlers/queuehandler');
const Commando = require('discord.js-commando');

module.exports = class ReadyCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'qready',
            aliases: ['ready', 'next'],
            group: 'queue',
            memberName: 'qready',
            description: "Ping the next persion in queue",
            argsType: 'multiple',
        })
    }

    async run(message, args) {
        qhandler.onReady(message, args);
    }
}