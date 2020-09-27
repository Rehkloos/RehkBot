require('module-alias/register')
const path = require('path')
const Commando = require('discord.js-commando')
const express = require("express");
require('dotenv').config();


// File imports
const L = require('@util/logger');
const antiAd = require('@features/anti-ad');
const roleClaim = require('@features/amongus-role');

const prefix = process.env.PREFIX;
const owner = process.env.OWNER;
const token = process.env.TOKEN;

const client = new Commando.CommandoClient({
  owner: owner,
  commandPrefix: prefix
})

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

  client.registry
    .registerGroups([
      ['among us', 'Among Us'],
      ['moderation', 'moderation commands'],
      ['queue', 'Among Us Queue']
    ])
    .registerDefaults()
    .registerCommandsIn(path.join(__dirname, 'cmds'))

  antiAd(client);
  roleClaim(client);
});

client.login(token);