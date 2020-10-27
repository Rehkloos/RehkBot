const qhandler = require('@handlers/queuehandler');
const Commando = require('discord.js-commando');

module.exports = class JoinCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'qjoin',
            aliases: ['join', 'j'],
            group: 'queue',
            memberName: 'qjoin',
            description: `adds a user to queue and responds with user's position in queue. Please provide an issue.`,
            argsType: 'multiple',
        })
    }

    async run(message, args) {
        qhandler.onNext(message, args);
    }
}