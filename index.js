require('module-alias/register')
const Discord = require('discord.js');
const client = new Discord.Client();
const express = require("express");
require('dotenv').config();
require('events').EventEmitter.defaultMaxListeners = 30;


// File imports
const L = require('@util/logger');
const loadCommands = require('@root/commands/load-commands')
const antiAd = require('@features/anti-ad');
const roleClaim = require('@features/role-claim');
const loadFeatures = require('@root/features/load-features')


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
  roleClaim(client);
  loadFeatures(client);
});

client.login(token);