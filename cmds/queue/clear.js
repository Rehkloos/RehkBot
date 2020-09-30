const qhandler = require('@handlers/queuehandler');
const Commando = require('discord.js-commando');

module.exports = class ClearCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'qclear',
            aliases: ['clear'],
            group: 'queue',
            memberName: 'qclear',
            description: 'fully clear queue',
            clientPermissions: ['MANAGE_MESSAGES'],
            userPermissions: ['MANAGE_MESSAGES'],
        })
    }

    async run(message) {
        qhandler.onClear(message);
    }
}