const Commando = require('discord.js-commando');

module.exports = class UnmuteCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'unmute',
            group: 'among us',
            memberName: 'unmute',
            description: 'Clean messages in code channel. Needs admin privilages',
            clientPermissions: ['MUTE_MEMBERS',
                'DEAFEN_MEMBERS',
                'MOVE_MEMBERS'
            ],
            userPermissions: ['MUTE_MEMBERS',
                'DEAFEN_MEMBERS',
                'MOVE_MEMBERS'
            ],
        })
    }

    async run(message) {

        if (message.member.voice.channel) {
            var channel = message.guild.channels.cache.get(
                message.member.voice.channel.id
            );
            message.member.voice.setMute(false);
        }
    }
}