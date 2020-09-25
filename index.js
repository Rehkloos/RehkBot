const Discord = require('discord.js');
const client = new Discord.Client();
const express = require("express");
const L = require('./utils/logger');
const commandsList = require("./commands.json");
const Queue = require('./handlers/queuehandler').Queue;
require('dotenv').config();


const token = process.env.TOKEN;
const roleID = process.env.ROLE;

const app = express();
const port = process.env.PORT || '0.0.0.0';

app.listen(port, () => {
  L.log(`Server running in ${process.env.NODE_ENV} on port ${port}`);
});

client.on('ready', async () => {
  await client.user.setActivity(`Among Us | on ${client.guilds.cache.size} servers`, {
    type: "PLAYING"
  })
  L.log(`Logged in as ${client.user.tag}`);
});


const PREFIX = '!';

var q = new Queue();
var map = new Map();
var alreadyMuted = false;


client.on('message', message => {
  let args = message.content.substring(PREFIX.length).split(" ");

  switch (args[0]) {
    case 'ping':
      // Ping the bot and get the delay
      message.channel.send("Pinging...").then((msg) => {
        msg.edit("Ping: " + (Date.now() - msg.createdTimestamp + " ms"));
      });
      break;
      // adds user to the queue - if already on it, sends them a message with their position
    case 'queue': {
      message.channel.bulkDelete(1);
      if (map.has(message.author.username)) {
        message.channel.send('You are already on the queue. You are ' + map.get(message.author.username) + ' in the queue.').then(msg => {
          msg.delete({
            timeout: 3000
          })
        });
      } else {
        var description = args[1] ? ' - ' + args.slice(1, args.length).join(' ') : '';
        q.enqueue('**' + message.author.username + '**' + description);
        map.set(message.author.username, q.getLength());
        message.channel.send('You (' + message.author.username + ') have been queued! You are number ' + q.getLength() + ' on the list.');
        L.log(map.size);
      }
      setTimeout(async () => { // clean queue after 6 hours
        q.clear();
        map.clear();
      }, 1000 * 60 * 60 * 6);
    }
    break;
    // sends a message to the dequeuer with who was dequeued - in the future, it would check for role/position in the server
  case 'dequeue': {
    message.channel.bulkDelete(1);
    if (true) {
      if (q.getLength() > 0) message.channel.send('You have dequeued ' + q.peek() + '.');
      else message.channel.send('There is no one in the queue.');
      var user = '' + q.peek();
      //user = user.substring(user.indexOf('**') + 2, user.lastIndexOf('**'));
      //user.send('You have been dequeued by ' + message.author.username + '!');
      map.delete(user);
      message.channel.send("Attempting to move " + user + '. In the future, this should only work if you have permissions, and would change the voice chat of the dequeued person.').then(msg => {
        msg.delete({
          timeout: 3000
        })
      });
      q.dequeue();
      // this would change to dequeue yourself if you do not have the permissions to dequeue from the list
    } else {
      message.channel.send("You can't dequeue, you don't have the permissions!").then(msg => {
        msg.delete({
          timeout: 3000
        })
      })
    }
  }
  break;
  // displays the queue
  case 'list': {
    const displayembed = new Discord.MessageEmbed()
      .setTitle('**CURRENT QUEUE**')
      .addField('TOP OF QUEUE', q.String())
      .setColor(0xDC143C);
    message.channel.send(displayembed).then(msg => {
      msg.delete({
        timeout: 1000 * 60 * 1 // delete after one minute
      })
    })
  }
  break;
  // clears the queue
  case 'clear': {
    message.channel.bulkDelete(1);

    if (message.member.guild.me.hasPermission(['MANAGE_CHANNELS', 'MANAGE_MESSAGES'])) { // first check if user has permissions to MANAGE_MESSAGES
      q.clear();
      map.clear();
      message.channel.send("Queue has been cleared.").then(msg => {
        msg.delete({
          timeout: 3000
        })
      });
    } else if (!message.member.guild.me.hasPermission(['MANAGE_CHANNELS', 'MANAGE_MESSAGES'])) {
      message.channel.send(`You dont have permissions to run this command`).then(msg => {
          msg.delete({
            timeout: 10000
          });
        })
        .catch(console.error);
    }
  }
  break;
  case 'usage': {
    if (args[1] === undefined) {
      for (var i = 0; i < commandsList.length; i++) {
        // this is unnessacary, fix this later.
        if (commandsList[i].command == "usage") {
          const usageUsageEmbed = new Discord.MessageEmbed()
            .setColor(0xDC143C)
            .setTitle(`Usage of: ${commandsList[i].command}`)
            .setDescription(commandsList[i].usage)
            .setTimestamp()
            .setFooter(
              `Requested by ${message.author.username}`,
              message.author.avatarURL
            );
          message.channel.send(usageUsageEmbed);
        }
      }
    }
    for (var i = 0; i < commandsList.length; i++) {
      if (commandsList[i].command == args[1]) {
        const usageEmbed = new Discord.MessageEmbed()
          .setColor(0xDC143C)
          .setTitle(`Usage of: ${commandsList[i].command}`)
          .setDescription(commandsList[i].usage)
          .setTimestamp()
          .setFooter(
            `Requested by ${message.author.username}`,
            message.author.avatarURL
          );
        message.channel.send(usageEmbed);
      }
    }
  }
  break;
  case 'commands': {
    const commandsEmbed = new Discord.MessageEmbed()
      .setColor(0xDC143C)
      .setTitle("Among Us Bot Commands")
      .setDescription(
        "Below are all of the commands associated with the bot!"
      );
    for (var i = 0; i < commandsList.length; i++) {
      commandsEmbed.addField(commandsList[i].command, commandsList[i].usage);
    }
    commandsEmbed
      .setTimestamp()
      .setFooter(
        `Requested by ${message.author.username}`,
        message.author.avatarURL
      );
    message.channel.send(commandsEmbed);
  }
  break;
  case "overlay": {
    if (message.member.voice.channel) {
      message.channel.send(`**Overlay for ${message.member.voice.channel} voice channel:**\n\nhttps://streamkit.discord.com/overlay/voice/${message.member.voice.channel.guild.id}/${message.member.voice.channel.id}?icon=false&online=false&logo=white&text_color=%23ffffff&text_size=28&text_outline_color=%23000000&text_outline_size=0&text_shadow_color=%23000000&text_shadow_size=0&bg_color=%231e2124&bg_opacity=0&bg_shadow_color=%23000000&bg_shadow_size=0&invite_code=jreTYZS&limit_speaking=true&small_avatars=false&hide_names=false&fade_chat=0`)
    } else {
      message.channel.send("**Error:** Please join a voice channel.")
    }
  }
  break;
  case "nuke": {
    if (message.member.guild.me.hasPermission("MANAGE_MESSAGES")) { // first check if user has permissions to MANAGE_MESSAGES
      if ((message.guild.channels.cache.find(c => c.name === "codes"))) { // second check nuke command in codes room
        (async () => {
          let deleted;
          do {
            deleted = await message.channel.bulkDelete(100); // delete last 100 messages in channel
          } while (deleted.size != 0);
        })();
        L.log(` ${client.user.tag} to nuke channel`)
      } else if ((!message.guild.channels.cache.find(c => c.name === "codes"))) {
        message.channel.send(`You can't clear this channel`).then(msg => {
            msg.delete({
              timeout: 10000
            });
          })
          .catch(console.error);
      }
    } else if (!message.member.guild.me.hasPermission("MANAGE_MESSAGES")) {
      message.channel.send(`You dont have permissions to run this command`).then(msg => {
          msg.delete({
            timeout: 10000
          });
        })
        .catch(console.error);
    }
  }
  break;
  case "maps": {
    const mapsEmbed = new Discord.MessageEmbed()
      .setTitle('All the Among Us maps')
      .setThumbnail('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.HCuyxDU5qqVDlpp0FnPVJwAAAA%26pid%3DApi&f=1')
      .setFooter(`Requested by ${message.author.username}`,
        message.author.avatarURL)
      .setColor(0xDC143C)
      .addFields({
        name: 'Skeled',
        value: 'https://www.fanbyte.com/wp-content/uploads/2020/08/xAmong-Us-Skeled-Vents.jpg,qx96128.pagespeed.ic.UQgyhfawhK.jpg',
        inline: 'true'
      }, {
        name: 'Mira',
        value: 'https://www.fanbyte.com/wp-content/uploads/2020/08/Among-Us-MIRA-UQ-Vents.jpg',
        inline: 'true'
      }, {
        name: 'Polas',
        value: 'https://www.fanbyte.com/wp-content/uploads/2020/09/xAmong-Us-Polas-Map-Vents.jpg,qx96128.pagespeed.ic.V7Tg_KkLi6.jpg',
        inline: 'true'
      }, )
    message.channel.send(mapsEmbed)
  }
  break;
  case "about": {
    // Sends help on the bot
    const helpEmbed = new Discord.MessageEmbed()
      .setColor(0xDC143C)
      .setTitle("About Bot")
      .setDescription(
        "There are many commands with Among Us Bot. Most of them you don't even have to do anything to prep!\nBy using the `$commands` command you can view all of the commands."
      )
      .addFields({
        name: "Github",
        value: "[Contribute Here!](https://github.com/Rehkloos/queue-bot)",
        inline: "true",
      }, {
        name: "Twitter",
        value: "[Follow me on Twitter!](https://www.twitter.com/rehkloos)",
        inline: "true",
      }, {
        name: "Invite",
        value: "Currently, this bot is private however later you can add this bot to your own Discord!", // im planning on making this public
        inline: "true",
      })
      .setThumbnail(
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.HCuyxDU5qqVDlpp0FnPVJwAAAA%26pid%3DApi&f=1"
      )
      .setTimestamp()
      .setFooter(
        `Requested by ${message.author.username}`,
        message.author.avatarURL
      );
    message.channel.send(helpEmbed);
  }
  break;
  case "role":
    if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send("You need the **MANAGE_GUILD** permission to do this!")
    const embed = new Discord.MessageEmbed()
      .setColor(0xDC143C)
      .setAuthor(`Click reaction to be assigned "amongus" role`)
      .setDescription(`👍: "amongus"`)
    message.channel.send(embed).then(async msg => {
      await msg.react("👍");
    })
    break;
  case "code":
    message.delete();
    let re = new RegExp("^[A-Za-z]+");
    if (args[1] !== undefined) {
      if (args[1].length === 4 || args[1].length === 6) {
        // 6 digit codes now (at least on test branch)
        if (
          args[2] === "NA" ||
          args[2] === "na" ||
          args[2] === "EU" ||
          args[2] === "eu" ||
          args[2] === "ASIA" ||
          args[2] === "asia"
        ) {
          if (args[1].match(re)) {
            if (message.member.voice.channel) {
              const codeEmbed = new Discord.MessageEmbed()
                .setColor(0xDC143C)
                .setTitle(
                  `${args[1].toUpperCase()} on ${args[2].toUpperCase()}`
                )
                .setDescription(
                  `The code is ${args[1].toUpperCase()} on ${args[2].toUpperCase()}.\n\nCheck the voice channel name too!\n*sometimes the voice channel name wont change due to being rate limited*`
                ) // make this look better
                .setTimestamp()
                .setFooter(
                  `Requested by ${message.author.username}`,
                  message.author.avatarURL
                );
              try {
                var codesID = message.guild.channels.cache.find(
                  (channel) => channel.name === "codes"
                ).id;
                client.channels.cache.get(codesID).send(codeEmbed);
                if (!message.channel.id === codesID) {
                  // check if the command wasnt sent in the codes channel
                  message.channel
                    .send(`Sent in <#${codesID}>`)
                    .then((msg) => {
                      msg.delete({
                        timeout: 5000,
                      });
                    });
                }
              } catch (err) {
                message.channel.send(codeEmbed);
              }
              message.member.voice.channel.edit({
                name: `${args[1].toUpperCase()} | Among Us`, // This among us NEEDS to be here, it makes the bot work without storing data
              });
              /*message.guild.me.edit({
                nick: `${args[1].toUpperCase()} | ${message.client.user.username}`
              });*/
              L.log(`Updated code to ${message.content}`);
            } else {
              message.channel.send("**Error:** Please join a voice channel.");
            }
          } else {
            message.channel.send("**Error:** Invalid Code");
          }
        } else {
          message.channel.send("**Error:** Invalid Region (NA, EU, or ASIA)");
        }
      } else {
        message.channel.send("**Error:** Invalid Code");
        return;
      }
    } else {
      message.channel.send("**Error:** Missing Arguments");
    }

    setTimeout(async () => { // clean queue after 6 hours
      message.member.voice.channel.edit({
        name: `Among Us`, // This among us NEEDS to be here, it makes the bot work without storing data
      });
      message.guild.me.edit({
        nick: `${message.client.user.username}`
      });
    }, 1000 * 60 * 60 * 6);
    break;
  case "mute":
    var _game = "";
    try {
      _game = client.channels.cache.find((channel) =>
        channel.name.includes("Among Us")
      );
    } catch (err) {}
    if (message.member.voice.channel.id === _game.id) {
      var channel = message.guild.channels.cache.get(
        message.member.voice.channel.id
      );
      alreadyMuted = !alreadyMuted;
      for (const [memberID, member] of channel.members) {
        if (alreadyMuted) {
          member.voice.setMute(true);
        } else {
          member.voice.setMute(false);
        }
      }
    } else {
      message.channel.send(
        "You must be in the game channel to use this command!"
      );
    }
    break;
  }
})

// adding roles via reactions in an uncached message
client.on('messageReactionAdd', async (reaction, user) => {
  const {
    name
  } = reaction.emoji;
  const member = reaction.message.guild.members.cache.get(user.id);
  switch (name) {
    case '👍': // Javascript
      await member.roles.add(roleID);
      break;
    default:
      break;
  }
});

// removing roles
client.on('messageReactionRemove', async (reaction, user) => {
  const {
    name
  } = reaction.emoji;
  const member = reaction.message.guild.members.cache.get(user.id);
  switch (name) {
    case '👍': // Javascript
      await member.roles.remove(roleID);
      break;
    default:
      break;
  }
});

client.login(token);