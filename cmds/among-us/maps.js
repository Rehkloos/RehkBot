const {
  MessageEmbed
} = require('discord.js');

module.exports = {
  name: 'maps', // Optional
  commands: ['maps'], // Optional
  description: 'Among Us Maps',

  callback: (message) => {
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