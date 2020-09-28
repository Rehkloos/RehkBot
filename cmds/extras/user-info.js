const Commando = require('discord.js-commando');

module.exports = class UserInfoCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'user-info',
            group: 'extras',
            memberName: 'user-info',
            description: 'Display info about yourself',
        })
    }

    async run(message) {
        message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
    }
}