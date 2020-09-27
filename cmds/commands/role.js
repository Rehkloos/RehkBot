const Commando = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class RoleCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'role',
            group: 'among us',
            memberName: 'role',
            description: 'Assign Among Us role via reaction',
            clientPermissions: ['MANAGE_GUILD'],
            userPermissions: ['MANAGE_GUILD'],
        })
    }

    async run(message) {
        const embed = new Discord.MessageEmbed()
            .setColor(0xDC143C)
            .setAuthor(`Click reaction to be assigned "amongus" role`)
            .setDescription(`👍: "amongus"`)
        message.channel.send(embed).then(async msg => {
            await msg.react("👍");
        })
    }
}