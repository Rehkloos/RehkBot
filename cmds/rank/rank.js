const Commando = require('discord.js-commando');
const db = require("@handlers/firebaseDB");
const {
  MessageEmbed
} = require('discord.js');
const maps = ["theskeld", "mirahq", "polus"];

function parseMode(top, type) {
  var final = {
    first: [],
    second: [],
    third: [],
  };
  if (type === "solo") {
    final.first.push(`<@${top[2][0]}>`);
    final.first.push(top[2][1]);
    final.second.push(`<@${top[1][0]}>`);
    final.second.push(top[1][1]);
    final.third.push(`<@${top[0][0]}>`);
    final.third.push(top[0][1]);
  } else {
    const names = top.map(i => i[0].split("-"));
    var completed = [];
    names.forEach(name => {
      var mention = "";
      name.forEach(j => {
        mention += `<@${j}> `;
      });
      completed.push(mention);
    });
    final.first.push(completed[2]);
    final.first.push(top[2][1]);
    final.second.push(completed[1]);
    final.second.push(top[1][1]);
    final.third.push(completed[0]);
    final.third.push(top[0][1]);
  }

  return final;
}

module.exports = class RankCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'rank',
      aliases: ['ranks, r'],
      group: 'ranked',
      memberName: 'rank',
      description: "Ping the next persion in queue",
      argsType: 'multiple',
    })
  }

  async run(message, args) {
    var requiredArgs = 1;
    const type = args[2];
    if (message.mentions.users.size) requiredArgs += message.mentions.users.size - 1;
    if (args.length != requiredArgs || message.mentions.users.size > 3) {
      message.reply("Invalid amount of arguments!");
      return false;
    }
    // SEARCH BY IMPOSTORS
    if (message.mentions.users.size) {
      const impostors = Array.from(message.mentions.users.keys()).sort();
      var impostorsMention = "";
      for (let i = 0; i < impostors.length; i++) {
        impostorsMention += `<@${impostors[i]}> `;
      }
      const impostorsKey = impostors.join("-");
      const mode =
        impostors.length === 1 ?
        "solo" :
        impostors.length === 2 ?
        "duo" :
        "trio";
      await db.rankImpostors(impostorsKey, message.guild.id, mode).then(res => {
        if (res.total == 0) {
          message.reply(
            "Insufficient data to rank! Keep recording wins"
          );
          return false;
        }
        message.channel.send(new MessageEmbed()
          .setColor(0xDC143C)
          .setTitle(`Ranked Results`)
          .setDescription(`Number of wins in ${mode} for ${impostorsMention}:
        Wins: ${res.wins},
        Loss: ${res.loss},
        The Skeld: ${res.theskeld},
        Mira HQ: ${res.mirahq},
        Polus: ${res.polus}`)
          .setTimestamp()
          .setFooter(
            `Requested by ${message.author.username}`)
          .setThumbnail(
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.HCuyxDU5qqVDlpp0FnPVJwAAAA%26pid%3DApi&f=1"
          ));
      });
    }

    if (type === "solo" || type === "duo" || type === "trio") {
      const top = await db.rankMode(message.guild.id, type);
      if (top.length != 3) {
        message.reply(
          "Insufficient data to rank! Keep recording wins"
        );
        return false;
      }
      const fileredTop = parseMode(top, type);
      message.reply(`Winning Ranking ${type}:
      Top 1: ${fileredTop.first[0]} - ${fileredTop.first[1]} wins!
      Top 2: ${fileredTop.second[0]} - ${fileredTop.second[1]} wins!
      Top 3: ${fileredTop.third[0]} - ${fileredTop.third[1]} wins!`);
    }
  }
};
