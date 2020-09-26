module.exports = {
    commands: 'unmute',
    minArgs: 0,
    maxArgs: 0,
    description: "Un-mute users in voice channel",
    permissions: [],
    callback: (message) => {
        if (message.member.voice.channel) {
            var channel = message.guild.channels.cache.get(
                message.member.voice.channel.id
            );
            message.member.voice.setMute(false);
        }
    },
}