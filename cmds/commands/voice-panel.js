const Commando = require('discord.js-commando');
const {
    MessageEmbed
} = require('discord.js');
const Discord = require('discord.js');
const voicehandler = require('@handlers/voicehandler');
const L = require('@util/logger');

module.exports = class VoicePanelCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'voice-panel',
            aliases: ['voice', 'vc'],
            group: 'among us',
            memberName: 'voice-panel',
            description: 'Embed with controls for muting/unmuting main Among us voice channel',
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

        var _game = "";
        try {
            _game = message.guild.channels.cache.find(channel => channel.name.includes("Among"));
        } catch (err) {}
        const voiceChannel = message.member.voice.channel;
        if (voiceChannel) { // check if people are in channel
            if (voiceChannel.id === _game.id) { // check for channel titled "among" 

                if (message.client.started && message.client.started[voiceChannel.id])
                    return message.channel.send('A game was already started in that voice channel.');

                if (!message.client.started)
                    message.client.started = {};

                message.client.started[voiceChannel.id] = true;

                const embed = new MessageEmbed()
                    .setColor(0xDC143C)
                    .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL())
                    .setTitle(`Among Us started in [🔊 ${voiceChannel.name}]`)
                    .setDescription(
                        'Click 🔇 to mute everyone.\n' +
                        'Click 🗣️ to unmute everyone.\n' +
                        'Click ❌ if the game has ended.'
                    );

                const control = await message.channel.send({
                    embed
                });
                await Promise.all(
                    [
                        control.react('🔇'),
                        control.react('🗣️'),
                        control.react('❌'),
                    ]);

                const panelTime = 1000 * 60 * 60 * 6; // 6 hours 
                const reactions = control.createReactionCollector(
                    ({
                        emoji
                    }, user) =>
                    user.id === message.author.id && ['🔇', '🗣️', '❌'].includes(emoji.name), {
                        dispose: true,
                        time: panelTime
                    },
                );

                const onReact = async ({
                    emoji
                }) => {
                    const members = [...message.member.voice.channel.members.values()];

                    switch (emoji.name) {
                        case '❌': // Javascript
                            delete message.client.started[voiceChannel.id];
                            reactions.stop();
                            try {
                                await message.delete();
                                await control.delete();
                            } catch (error) {
                                message.channel.send('Game has ended.');
                            }
                            return;
                            break;
                        case '🔇':
                            for (const member of members)
                                await new voicehandler(Discord, message.guild, member).muteAll();
                            break;
                        case '🗣️':
                            for (const member of members)
                                await new voicehandler(Discord, message.guild, member).unmuteAll();
                            break;
                        default:
                            break;
                    }
                };

                reactions.on('collect', onReact);
                reactions.on('remove', onReact);
            } else {
                message.channel.send(`You must be in a Among Us VC to use this command!`);
            }
        } else {
            message.channel.send("You must be in a voice channel").then(message => {
                    message.delete({
                        timeout: 10000
                    });
                })
                .catch(console.error);
        }
    }
}