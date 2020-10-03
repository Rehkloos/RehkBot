const Commando = require('discord.js-commando');
const {
  MessageEmbed
} = require('discord.js');

module.exports = class MapsCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'maps',
      group: 'among us',
      memberName: 'maps',
      description: 'Among Us Maps',
    })
  }

  async run(message) {
    message.channel.send(new MessageEmbed()
      .setTitle('All the Among Us maps')
      .attachFiles(['./static/icon.png'])
      .setThumbnail('attachment://icon.png')
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
    );
  }
}