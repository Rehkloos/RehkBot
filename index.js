const Discord = require('discord.js');
const client = new Discord.Client();
const express = require("express");
require('dotenv').config();
require('events').EventEmitter.defaultMaxListeners = 15;


// File imports
const L = require('./utils/logger');
const commandsList = require("./commands.json");
const Queue = require('./handlers/queuehandler').Queue;
const loadCommands = require('./commands/load-commands')
const antiAd = require('./anti-ad');


const token = process.env.TOKEN;

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


  antiAd(client);
  loadCommands(client);
});


const PREFIX = process.env.PREFIX;

var q = new Queue();
var map = new Map();


client.on('message', message => {
  let args = message.content.substring(PREFIX.length).split(" ");

  switch (args[0]) {
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
  }
})

client.login(token);