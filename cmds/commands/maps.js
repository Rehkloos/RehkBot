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
      .attachFiles(['./assets/static/icon.png'])
      .setThumbnail('attachment://icon.png')
      .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL())
      .setColor(0xDC143C)
      .addFields({
        name: 'Skeled',
        value: 'https://github.com/Rehkloos/queue-bot/raw/master/assets/static/maps/TheSkeld.png',
        inline: 'true'
      }, {
        name: 'Mira',
        value: 'https://github.com/Rehkloos/queue-bot/raw/master/assets/static/maps/Mirahq.png',
        inline: 'true'
      }, {
        name: 'Polas',
        value: 'https://github.com/Rehkloos/queue-bot/raw/master/assets/static/maps/Polus.png',
        inline: 'true'
      }, )
    );
  }
}