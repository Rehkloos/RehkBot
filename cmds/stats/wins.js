const Commando = require('discord.js-commando');
const {
  MessageEmbed
} = require('discord.js');
const statsSchema = require('@schemas/stats-schema')

module.exports = class WinsCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'wins',
      group: 'among us',
      memberName: 'wins',
      description: 'Among Us Maps',
    })
  }

  async run(message) {
    const {
      guild,
      member
    } = message

    addWins(guild.id, member.id, 1, message)
  }
}

const addWins = async (guildId, userId, winsToAdd, message) => {
  const result = await statsSchema.findOneAndUpdate({
    guildId,
    userId,
  }, {
    guildId,
    userId,
    $inc: {
      wins: winsToAdd,
    },
  }, {
    upsert: true,
    new: true,
  })

  let {
    wins
  } = result

  if (wins >= 0) {
    +wins
    wins -= 0

    message.reply(
      `You have now ${wins} win(s)`
    )

    await statsSchema.updateOne({
      guildId,
      userId,
    }, {
      wins,
    })
  }
}