const Commando = require('discord.js-commando');

module.exports = class MuteCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'mute',
            group: 'among us',
            memberName: 'mute',
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

        var alreadyMuted = false;

        var _game = "";
        try {
            _game = message.guild.channels.cache.find(channel => channel.name.includes("Among"));
        } catch (err) {}
        if (message.member.voice.channel) { // check if people are in channel
            if (message.member.voice.channel.id === _game.id) { // check for channel titled "among"
                var channel = message.guild.channels.cache.get(message.member.voice.channel.id);
                alreadyMuted = !alreadyMuted;
                for (const [memberID, member] of channel.members) {
                    if (alreadyMuted) {
                        member.voice.setMute(true);
                        //member.voice.setDeaf(true);
                        message.channel.send(`Sssh, the round begins, silence.`).then(message => {
                                message.delete({
                                    timeout: 10000
                                });
                            })
                            .catch(console.error);

                    } else {

                        member.voice.setMute(false);
                        //member.voice.setDeaf(false);
                        message.channel.send(`The round of discussion initiated.`).then(message => {
                                message.delete({
                                    timeout: 10000
                                });
                            })
                            .catch(console.error);
                    }
                }
            } else {
                message.channel.send("You must be in the game channel to use this command!");
            }
        } else {
            message.channel.send("You must be in the game channel to use this command!").then(message => {
                    message.delete({
                        timeout: 10000
                    });
                })
                .catch(console.error);
        }
    }
}