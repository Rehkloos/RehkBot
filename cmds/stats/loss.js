const Commando = require('discord.js-commando');
const {
  MessageEmbed
} = require('discord.js');
const statsSchema = require('@schemas/stats-schema');

const roleID = process.env.ROLE;

module.exports = class LossCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'loss',
      group: 'stats',
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
    if (member.roles.cache.has(roleID)) {
      if (input == "+") {
        addLoss(guild.id, member.id, 1, message)
      } else if (input == "info") {
        addLoss(guild.id, member.id, 0, message)
      }
    } else if (!member.roles.cache.has(roleID)) {
      message.reply(
        `you do not have the "amongus" role to use this command`
      )
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