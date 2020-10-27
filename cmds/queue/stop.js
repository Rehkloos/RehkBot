const qhandler = require('@handlers/queuehandler');
const Commando = require('discord.js-commando');

module.exports = class StopCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'qstop',
            aliases: ['stop'],
            group: 'queue',
            memberName: 'qstop',
            description: "Stop queue",
        })
    }

    async run(message) {
        qhandler.onOffline(message);
    }
}