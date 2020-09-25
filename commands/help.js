const Discord = require('discord.js');
const loadCommands = require('./load-commands')
const prefix = process.env.PREFIX;

module.exports = {
  commands: ['help', 'h'],
  description: "Describes all of this bot's commands",
  callback: (message, client) => {
    let reply = ''

    const commands = loadCommands()

    for (const command of commands) {
      // Check for permissions
      let permissions = command.permission

      if (permissions) {
        let hasPermission = true
        if (typeof permissions === 'string') {
          permissions = [permissions]
        }

        for (const permission of permissions) {
          if (!message.member.hasPermission(permission)) {
            hasPermission = false
            break
          }
        }

        if (!hasPermission) {
          continue
        }
      }

      // Format the text
      const mainCommand =
        typeof command.commands === 'string' ?
        command.commands :
        command.commands[0]
      const args = command.expectedArgs ? ` ${command.expectedArgs}` : ''
      const {
        description
      } = command

      reply += `**${prefix}${mainCommand}${args}** = ${description}\n`
    }

    const helpEmbed = new Discord.MessageEmbed()
      .setColor(0xDC143C)
      .setTitle("Help")
      .setDescription(`**here are supported commands:**\n
        ${reply}`)
      .setThumbnail(
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.HCuyxDU5qqVDlpp0FnPVJwAAAA%26pid%3DApi&f=1"
      )
      .setTimestamp()
      .setFooter(
        `Requested by ${message.author.username}`,
        message.author.avatarURL
      );

    message.channel.send(helpEmbed)
  },
}
