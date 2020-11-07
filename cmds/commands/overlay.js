module.exports = {
    name: 'overlay', // Optional
    commands: ['overlay'], // Optional
    description: 'Generates an overlay for OBS for the voice channel you are currently in.',

    callback: async (message) => {
        if (message.member.voice.channel) {
            message.channel.send(`**Overlay for ${message.member.voice.channel} voice channel:**\n\nhttps://streamkit.discord.com/overlay/voice/${message.member.voice.channel.guild.id}/${message.member.voice.channel.id}?icon=false&online=false&logo=white&text_color=%23ffffff&text_size=28&text_outline_color=%23000000&text_outline_size=0&text_shadow_color=%23000000&text_shadow_size=0&bg_color=%231e2124&bg_opacity=0&bg_shadow_color=%23000000&bg_shadow_size=0&invite_code=jreTYZS&limit_speaking=true&small_avatars=false&hide_names=false&fade_chat=0`)
        } else {
            message.channel.send("**Error:** Please join a voice channel.")
        }
    }
}