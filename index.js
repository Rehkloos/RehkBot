const Discord = require('discord.js');
const client = new Discord.Client();
const express = require("express");
const L = require('./utils/logger');
const commandsList = require("./commands.json");
require('dotenv').config();


const token = process.env.TOKEN;

const app = express();
const port = process.env.PORT || '0.0.0.0';

app.listen(port, () => {
  L.log(`Server running in ${process.env.NODE_ENV} on port ${port}`);
});

client.on('ready', async () => {
  await client.user.setActivity("Among Us", {
    type: "PLAYING"
  })
  L.log(`Logged in as ${client.user.tag}`);
});


const PREFIX = '!';

var q = new Queue();
var map = new Map();


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
    case 'queue':
      message.channel.bulkDelete(1);
      if (map.has(message.author.username)) {
        message.author.send('You are already on the queue. You are ' + map.get(message.author.username) + ' in the queue.');
      } else {
        var description = args[1] ? ' - ' + args.slice(1, args.length).join(' ') : '';
        q.enqueue('**' + message.author.username + '**' + description);
        map.set(message.author.username, q.getLength());
        message.channel.send('You (' + message.author.username + ') have been queued! You are number ' + q.getLength() + ' on the list.');
      }
      break;
      // sends a message to the dequeuer with who was dequeued - in the future, it would check for role/position in the server
    case 'dequeue':
      //message.channel.bulkDelete(1);
      if (true) {
        if (q.getLength() > 0) message.author.send('You have dequeued ' + q.peek() + '.');
        else message.author.send('There is no one in the queue.');
        var user = '' + q.peek();
        user = user.substring(user.indexOf('**') + 2, user.lastIndexOf('**'));
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
      break;
      // displays the queue
    case 'display':
      const displayembed = new Discord.MessageEmbed()
        .setTitle('**CURRENT QUEUE**')
        .addField('TOP OF QUEUE', q.String())
        .setColor(0xDC143C);
      //message.author.send(displayembed);
      message.channel.send(displayembed).then(msg => {
        msg.delete({
          timeout: 1000 * 60 * 1 // delete after one minute
        })
      })
      //message.channel.bulkDelete(1);
      break;
      // clears the queue
    case 'clearall':
      //message.channel.bulkDelete(1);
      q.clearAll();
      message.channel.send("Queue has been cleared.").then(msg => {
        msg.delete({
          timeout: 3000
        })
      });
      break;
      // gives information on the other commands
      /*case 'help':
        //message.channel.bulkDelete(1);
        const helpembed = new Discord.MessageEmbed()
          .setTitle('Queue Bot Help')
          .addField('**COMMANDS:**', "`!queue <description>` - adds you to the queue with <description>\n`!dequeue` - removes you from the queue, only used by specified users (if not specified, removes yourself from the queue)\n`!display` - shows the current queue (and description of each entry, if you have permission\n`!clearall` - priveliged command that clears the queue\n`!help` - displays a list of commands; you're reading it right now")
          .addField('**MORE INFORMATION:**', 'ndd7xv [at] virginia [dot] edu \nsp5fd [at] virginia [dot] edu\nbpl4vv [at] virginia [dot] edu');
        message.author.send(helpembed);
        break;*/
    case 'usage':
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
      break;
    case 'commands':
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
      break;
    case "overlay":
      if (message.member.voice.channel) {
        const overlayEmbed = new Discord.MessageEmbed()
          .setColor(0xDC143C)
          .setTitle(`Overlay for ${message.member.voice.channel.name}`)
          .setURL(`https://streamkit.discord.com/overlay/voice/${message.member.voice.channel.guild.id}/${message.member.voice.channel.id}?icon=false&online=false&logo=white&text_color=%23ffffff&text_size=28&text_outline_color=%23000000&text_outline_size=0&text_shadow_color=%23000000&text_shadow_size=0&bg_color=%231e2124&bg_opacity=0&bg_shadow_color=%23000000&bg_shadow_size=0&invite_code=jreTYZS&limit_speaking=true&small_avatars=false&hide_names=false&fade_chat=0`)
          .setDescription("Create a browser capture and set the URL to:\n\nhttps://streamkit.discord.com/overlay/voice/${message.member.voice.channel.guild.id}/${message.member.voice.channel.id}?icon=false&online=false&logo=white&text_color=%23ffffff&text_size=28&text_outline_color=%23000000&text_outline_size=0&text_shadow_color=%23000000&text_shadow_size=0&bg_color=%231e2124&bg_opacity=0&bg_shadow_color=%23000000&bg_shadow_size=0&invite_code=jreTYZS&limit_speaking=true&small_avatars=false&hide_names=false&fade_chat=0")
          .setTimestamp()
          .setFooter(
            `Requested by ${message.author.username}`,
            message.author.avatarURL
          );

        message.channel.send(overlayEmbed)
      } else {
        message.channel.send("**Error:** Please join a voice channel.")
      }
      break;
    case "nuke":
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
      break;
    case "maps":
      const mapsEmbed = new Discord.MessageEmbed()
        .setTitle('All the Among Us maps')
        .setThumbnail('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.HCuyxDU5qqVDlpp0FnPVJwAAAA%26pid%3DApi&f=1')
        .setFooter('Bot made by Rehkloos. Check out my website at https://rehkloos.com', 'https://avatars1.githubusercontent.com/u/1954355?s=460&v=4')
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
      break;
    case "about":
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
      break;
  }
})

client.login(token);

/* Creates a new queue. A queue is a first-in-first-out (FIFO) data structure -
 * items are added to the end of the queue and removed from the front.
 *
 * Code taken from http://code.iamkate.com/javascript/queues/ by Kate Rose Morley
 */
function Queue() {
  // initialise the queue and offset
  var queue = [];
  var offset = 0;

  // Returns the length of the queue.
  this.getLength = function () {
    return (queue.length - offset);
  }
  // Returns true if the queue is empty, and false otherwise.
  this.isEmpty = function () {
    return (queue.length == 0);
  }
  /* Enqueues the specified item. The parameter is:
   *
   * item - the item to enqueue
   */
  this.enqueue = function (item) {
    queue.push(item);
  }
  /* Dequeues an item and returns it. If the queue is empty, the value
   * 'undefined' is returned.
   */
  this.dequeue = function () {

    // if the queue is empty, return immediately
    if (queue.length == 0) return undefined;
    // store the item at the front of the queue
    var item = queue[offset];

    // increment the offset and remove the free space if necessary
    if (++offset * 2 >= queue.length) {
      queue = queue.slice(offset);
      offset = 0;
    }

    // return the dequeued item
    return item;
  }
  /* Returns the item at the front of the queue (without dequeuing it). If the
   * queue is empty then undefined is returned.
   */
  this.peek = function () {
    return (queue.length > 0 ? queue[offset] : undefined);
  }

  /**
   * New methods for the purpose of queue bot.
   */
  this.clearAll = function () {
    while (this.getLength() != 0) this.dequeue();
  }

  this.String = function () {
    if (this.isEmpty()) return 'The queue is currently empty.';
    var s = '';
    for (var i = 0; i < this.getLength(); i++) {
      s += (i + 1) + '. ' + queue[offset + i] + '\n';
    }
    return s;
  }
}