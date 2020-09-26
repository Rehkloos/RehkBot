const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    commands: 'role',
    minArgs: 0,
    maxArgs: 0,
    permissions: 'MANAGE_GUILD',
    description: "Assign Among Us role via reaction",
    callback: (message) => {
        const embed = new Discord.MessageEmbed()
            .setColor(0xDC143C)
            .setAuthor(`Click reaction to be assigned "amongus" role`)
            .setDescription(`👍: "amongus"`)
        message.channel.send(embed).then(async msg => {
            await msg.react("👍");
        })
    },
}