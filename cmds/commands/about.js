const Commando = require('discord.js-commando');
const {
  MessageEmbed
} = require('discord.js');

module.exports = class AboutCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'about',
      group: 'among us',
      memberName: 'about',
      description: 'Adds numbers together',
    })
  }

  async run(message) {
    message.channel.send(new MessageEmbed()
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
        value: "[Add ImposterBot to server](https://discord.com/api/oauth2/authorize?client_id=349236583611891714&permissions=1371630673&scope=bot)", // im planning on making this public
        inline: "true",
      })
      .attachFiles(['./static/icon.png'])
      .setThumbnail('attachment://icon.png')
      .setTimestamp()
      .setFooter(
        `Requested by ${message.author.username}`,
        message.author.avatarURL)
    );
  }
}