require('module-alias/register')
const path = require('path')
const Commando = require('discord.js-commando')
const express = require("express");
const {
  MongoClient
} = require('mongodb')
const MongoDBProvider = require('commando-provider-mongo')
require('dotenv').config();



// File imports
const L = require('@util/logger');
const antiAd = require('@features/anti-ad');
const roleClaim = require('@features/roleAdd');
const eventloader = require('@util/eventLoader');
const mongo = require('@util/mongo')

const prefix = process.env.PREFIX;
const owner = process.env.OWNER;
const token = process.env.TOKEN;
const mongoP = process.env.MONGO;

const client = new Commando.CommandoClient({
  owner: owner,
  commandPrefix: prefix
})

client.setProvider(
  MongoClient.connect(mongoP, {
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((client) => {
    return new MongoDBProvider(client, 'among-us') // name of cluster
  })
  .catch((err) => {
    L.error(err)
  })
)

const app = express();
const port = process.env.PORT || '0.0.0.0';

app.listen(port, () => {
  L.log(`Server running in ${process.env.NODE_ENV} on port ${port}`);
});

client.on('ready', async () => {

  await mongo();

  client.registry
    .registerGroups([
      ['among us', 'Among Us'],
      ['moderation', 'moderation commands'],
      ['queue', 'Among Us Queue'],
      ['extras', 'Extra Commands'],
      ['admin', 'Admin'],
      ['stats', 'Among Us stats']
    ])
    .registerDefaults()
    .registerCommandsIn(path.join(__dirname, 'cmds'))

  antiAd(client);
  roleClaim(client);
});

eventloader(client);
client.login(token);