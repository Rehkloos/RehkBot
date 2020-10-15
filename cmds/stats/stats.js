const Commando = require('discord.js-commando');
const {
  MessageEmbed
} = require('discord.js');
const statsSchema = require('@schemas/stats-schema');
const L = require('@util/logger');

const roleID = process.env.ROLE;

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

    // Calculations
    const total = statsData.wins + statsData.loss;
    const winP = statsData.wins/total*100;

    if (member.roles.cache.has(roleID)) {
      const embed = new MessageEmbed()
        .setAuthor(
          member.nickname || member.displayName,
          member.user.displayAvatarURL()
        )
        .setDescription(
          `𝘄𝗶𝗻𝘀: ${statsData.wins}\n𝗹𝗼𝘀𝘀: ${statsData.loss}\n𝘁𝗼𝘁𝗮𝗹: ${total}\n𝘄𝗶𝗻 𝗿𝗮𝘁𝗲: ${winP}%`
        )
        .setTimestamp()
        .setColor(0xDC143C)


      channel.send(embed)
    } else if (!member.roles.cache.has(roleID)) {
      message.reply(
        `you do not have the "amongus" role to use this command`
      )
    }
  }
}