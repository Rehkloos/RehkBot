const Discord = require('discord.js');
const lineReader = require('line-reader');
const L = require('@util/logger');

module.exports = (client) => {
  const isInvite = async (guild, code) => {
    return await new Promise((resolve) => {
      guild.fetchInvites().then((invites) => {
        for (const invite of invites) {
          if (code === invite[0]) {
            resolve(true)
            return
          }
        }

        resolve(false)
      })
    })
  }

  client.on('message', async (message) => {
    const {
      guild,
      content
    } = message

    // discord.gg/23RAN4

    const code = content.split('discord.gg/')[1]
    if (content.includes('discord.gg/')) {
      const isOurInvite = await isInvite(guild, code)
      if (!isOurInvite) {
        // we know that they are advertising an outside discord server
      }
    }


    var j = 1;

    function isValidURL(string) {
      //regex for link
      // eslint-disable-next-line no-useless-escape
      const res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
      return (res !== null);
    }

    if (isValidURL(message.content.toLowerCase()) == true) {
      var a = message.id;
      //do not open any link mentioned in the dangurls text file. You have been warned
      lineReader.eachLine('./assets/bannedurls.txt', (line) => {
        if (message.content.toLowerCase().startsWith("https://www." + line) || (message.content.toLowerCase().startsWith("http://www." + line)) || (message.content.toLowerCase().startsWith(line)) || (message.content.toLowerCase().startsWith("http://" + line)) || (message.content.toLowerCase().startsWith("https://" + line))) {
          message.channel.bulkDelete(1, true).then(msg => {
            L.log(`${msg.size} is deleted!`)
          }).catch(err => {
            L.log(err)
          })
          let links = new Discord.MessageEmbed()
            .setColor(0xE7A700)
            .setTitle(`⚠ This link is DANGEROUS ⚠`)
            .setDescription(`${message.author}`)
            .setFooter("This filter is in beta. False negatives are possible but very rare. If you got this warning be careful of the link");

          message.reply(links).catch(err => {
            message.reply("An error occured");
          }).then((m) => m.delete({
            timeout: 4500
          }));
          j++;
          return false;
        }
      });
    }
  })
}