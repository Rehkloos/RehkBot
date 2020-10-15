const Commando = require('discord.js-commando');
const {
  MessageEmbed
} = require('discord.js');
const statsSchema = require('@schemas/stats-schema');
const L = require('@util/logger');

module.exports = class StatsCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'stats',
      group: 'stats',
      memberName: 'stats',
      description: `check among us stats`,
      argsType: 'multiple',
    })
  }

  async run(message) {
    const {
      guild,
      member,
      channel
    } = message

    const guildId = guild.id
    const authorId = message.author.id

    const statsData = await statsSchema.findOne({
      userId: authorId,
      guildId,
    })

    const total = statsData.wins + statsData.loss;

    const embed = new MessageEmbed()
      .setAuthor(
        member.nickname || member.displayName,
        member.user.displayAvatarURL()
      )
      .setDescription(
        `𝘄𝗶𝗻𝘀: ${statsData.wins}\n𝗹𝗼𝘀𝘀: ${statsData.loss}\n𝘁𝗼𝘁𝗮𝗹: ${total}\n`
      )
      .setTimestamp()
      .setColor(0xDC143C)


    channel.send(embed)
  }
}