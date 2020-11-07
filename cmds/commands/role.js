const Discord = require('discord.js');

module.exports = {
    name: 'role', // Optional
    commands: ['role'], // Optional
    description: 'Assign Among Us role via reaction',
    requiredPermissions: ['MANAGE_ROLES'],

    callback: async (message) => {
        const embed = new Discord.MessageEmbed()
            .setColor(0xDC143C)
            .setAuthor(`Click reaction to be assigned "amongus" role`)
            .setDescription(`👍: "amongus"`)
            .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL())
        message.channel.send(embed).then(async msg => {
            await msg.react("👍");
        })
    }
}