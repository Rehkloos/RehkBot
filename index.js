const Discord = require('discord.js');
const client = new Discord.Client();
const express = require("express");
require('dotenv').config();
require('events').EventEmitter.defaultMaxListeners = 15;


// File imports
const L = require('./utils/logger');
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

client.login(token);