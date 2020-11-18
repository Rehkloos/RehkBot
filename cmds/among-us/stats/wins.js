const {
  MessageEmbed
} = require('discord.js');
const statsSchema = require('@schemas/stats-schema');

const roleID = process.env.ROLE;

module.exports = {
  name: 'wins',
  description: `add wins or check how much wins you have. "!win +" to add loss & "!win info" to check loss count`,


  callback: async (message) => {
    const {
      guild,
      member
    } = message

    const input = args;
    if (member.roles.cache.has(roleID)) {
      if (input == "+") {
        addWins(guild.id, member.id, 1, message)
      } else if (input == "info") {
        addWins(guild.id, member.id, 0, message)
      }
    } else if (!member.roles.cache.has(roleID)) {
      message.reply(
        `you do not have the "amongus" role to use this command`
      )
    }
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