const Commando = require('discord.js-commando');
const {
  MessageEmbed
} = require('discord.js');
const statsSchema = require('@schemas/stats-schema')

module.exports = class LossCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'loss',
      group: 'among us',
      memberName: 'loss',
      description: 'Among Us Maps',
    })
  }

  async run(message) {
    const {
      guild,
      member
    } = message

    addLoss(guild.id, member.id, 1, message)
  }
}

const addLoss = async (guildId, userId, lossToAdd, message) => {
  const result = await statsSchema.findOneAndUpdate({
    guildId,
    userId,
  }, {
    guildId,
    userId,
    $inc: {
      loss: lossToAdd,
    },
  }, {
    upsert: true,
    new: true,
  })

  let {
    loss
  } = result

  if (loss >= 0) {
    +loss
    loss -= 0

    message.reply(
      `You have now ${loss} loss(es)`
    )

    await statsSchema.updateOne({
      guildId,
      userId,
    }, {
      loss,
    })
  }
}