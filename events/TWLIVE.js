const Discord = require('discord.js');
const lineReader = require('line-reader');
const L = require('@util/logger');

module.exports = (client) => {
  const {
    db
  } = require('@util/db');
  //? Handling ready event - Log to the console & start monitoring
  client.on('ready', async () => {
    //? Log when online
    console.log(`[Discord] ${client.user.username} is online.`);
    //? Init DB
    await db.init();
    //? Start Monitoring
    require('@util/twitch-monitor')(client);
  });
}