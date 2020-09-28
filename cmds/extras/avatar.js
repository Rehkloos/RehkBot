const Commando = require('discord.js-commando');

module.exports = class AvatarCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'avatar',
            aliases: ['icon', 'pfp'],
            group: 'extras',
            memberName: 'avatar',
            description: 'Get the avatar URL of the tagged user(s), or your own avatar',
        })
    }

    async run(message) {
        if (!message.mentions.users.size) {
            return message.channel.send(`Your avatar: <${message.author.displayAvatarURL({ dynamic: true })}>`);
        }

        const avatarList = message.mentions.users.map(user => {
            return `${user.username}'s avatar: <${user.displayAvatarURL({ dynamic: true })}>`;
        });

        message.channel.send(avatarList);
    }
}