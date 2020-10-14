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
      description: `add losses or check how much losses you have. "!loss +" to add loss & "!loss info" to check loss count`,
      argsType: 'multiple',
    })
  }

  async run(message, args) {
    const {
      guild,
      member
    } = message

    const input = args;
    if (input == "+") {
      addLoss(guild.id, member.id, 1, message)
    } else if (input == "info") {
      addLoss(guild.id, member.id, 0, message)
    }
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