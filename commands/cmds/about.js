const Discord = require('discord.js');

module.exports = {
    commands: 'about',
    minArgs: 0,
    maxArgs: 0,
    callback: (message) => {
        const helpEmbed = new Discord.MessageEmbed()
            .setColor(0xDC143C)
            .setTitle("About Bot")
            .setDescription(
                "There are many commands with Among Us Bot. Most of them you don't even have to do anything to prep!\nBy using the `$commands` command you can view all of the commands."
            )
            .addFields({
                name: "Github",
                value: "[Contribute Here!](https://github.com/Rehkloos/queue-bot)",
                inline: "true",
            }, {
                name: "Twitter",
                value: "[Follow me on Twitter!](https://www.twitter.com/rehkloos)",
                inline: "true",
            }, {
                name: "Invite",
                value: "Currently, this bot is private however later you can add this bot to your own Discord!", // im planning on making this public
                inline: "true",
            })
            .setThumbnail(
                "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.HCuyxDU5qqVDlpp0FnPVJwAAAA%26pid%3DApi&f=1"
            )
            .setTimestamp()
            .setFooter(
                `Requested by ${message.author.username}`,
                message.author.avatarURL
            );
        message.channel.send(helpEmbed);
    },
}