const Discord = require('discord.js');
const client = new Discord.Client();
const WOKcmds = require('wokcommands');
const express = require("express");
require('module-alias/register');
require('dotenv').config();
require('@util/eventLoader')(client);

// File imports
const L = require('@util/logger');

// const prefix = process.env.PREFIX;
// const owner = process.env.OWNER;
const token = process.env.TOKEN;
const mongoP = process.env.MONGO;

const app = express();
const port = process.env.PORT || '0.0.0.0';

app.listen(port, () => {
  L.log(`Server running in ${process.env.NODE_ENV} on port ${port}`);
});

client.on('ready', async () => {

  new WOKcmds(client, 'cmds', 'features')
    .setMongoPath(mongoP)
    .setSyntaxError('Incorrect syntax! Please use {PREFIX}{COMMAND} {ARGUMENTS}')
});


client.login(token);