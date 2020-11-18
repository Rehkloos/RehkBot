const {
  MessageEmbed
} = require('discord.js');

module.exports = {
  name: 'about', // Optional
  commands: ['about'], // Optional
  description: 'Adds numbers together', // Optional
  callback: (message) => {
    message.channel.send(new MessageEmbed()
      .setColor(0xDC143C)
      .setTitle("About Bot")
      .setDescription(
        "There are many commands with RehkBot. Most of them you don't even have to do anything to prep!\nBy using the `!commands` command you can view all of the commands."
      )
      .addFields({
        name: "Github",
        value: "[Contribute Here!](https://github.com/Rehkloos/queue-bot)",
        inline: "true",
      }, {
        name: "Twitter",
        value: "[Follow me on Twitter!](https://www.twitter.com/rehkloos)",
        inline: "true",
      })
      .attachFiles(['./assets/static/icon.png'])
      .setThumbnail('attachment://icon.png')
      .setTimestamp()
      .setFooter(
        `Requested by ${message.author.username}`,
        message.author.avatarURL())
    );
  }
}