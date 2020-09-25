const Discord = require('discord.js');

module.exports = {
    commands: 'maps',
    minArgs: 0,
    maxArgs: 0,
    callback: (message) => {
        const mapsEmbed = new Discord.MessageEmbed()
            .setTitle('All the Among Us maps')
            .setThumbnail('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.HCuyxDU5qqVDlpp0FnPVJwAAAA%26pid%3DApi&f=1')
            .setFooter(`Requested by ${message.author.username}`,
                message.author.avatarURL)
            .setColor(0xDC143C)
            .addFields({
                name: 'Skeled',
                value: 'https://www.fanbyte.com/wp-content/uploads/2020/08/xAmong-Us-Skeled-Vents.jpg,qx96128.pagespeed.ic.UQgyhfawhK.jpg',
                inline: 'true'
            }, {
                name: 'Mira',
                value: 'https://www.fanbyte.com/wp-content/uploads/2020/08/Among-Us-MIRA-UQ-Vents.jpg',
                inline: 'true'
            }, {
                name: 'Polas',
                value: 'https://www.fanbyte.com/wp-content/uploads/2020/09/xAmong-Us-Polas-Map-Vents.jpg,qx96128.pagespeed.ic.V7Tg_KkLi6.jpg',
                inline: 'true'
            }, )
        message.channel.send(mapsEmbed)
    },
}