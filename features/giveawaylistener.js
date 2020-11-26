const Discord = require('discord.js');
const ms = require("ms");

exports.giveaway = async (message, args) => {
    if (!args[0]) return message.channel.send(`Please provide a valid duration`);
    if (
        !args[0].endsWith("w") &&
        !args[0].endsWith("d") &&
        !args[0].endsWith("h") &&
        !args[0].endsWith("m") &&
        !args[0].endsWith("s")
    )
        return message.channel.send(`You did not use the correct formatting for the time!`);
    if (isNaN(args[0][0])) return message.channel.send(`That is not a number!`);
    let giveawayChannel = message.mentions.channels.first();
    if (!giveawayChannel) return message.channel.send('You have to mention a valid channel!');
    let giveawayNumberWinners = args[2];
    if (isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)) return message.channel.send('You have to specify a valid number of winners!');
    let giveawayPrize = args.slice(3).join(' ');
    if (!giveawayPrize) return message.channel.send('You have to specify a valid prize!');
    message.channel.send(`:tada: Done! The giveaway for the **${giveawayPrize}** is starting in ${giveawayChannel}!`);
    const embed = new Discord.MessageEmbed()
        .setTitle(`${giveawayPrize}`)
        .setDescription(`React with  🎉  to enter!\n\nTime duration: ${args[0]} \n\nHosted by: ${message.author}`)
        .setTimestamp(Date.now() + ms(args[0]))
        .setColor(0xDC143C);
    let msg = await message.channel.send(':tada: **GIVEAWAY** :tada:', embed)
    msg.react("🎉");
    setTimeout(() => {
        msg.reactions.cache.get('🎉').users.remove(message.guild.id)
        setTimeout(() => {
            let winner = msg.reactions.cache.get("🎉").users.cache.filter((u) => !u.bot).random();
            if (msg.reactions.cache.get('🎉').users.cache.size < 1) {
                const winner_embed = new Discord.MessageEmbed()
                    .setTitle(`${giveawayPrize}`)
                    .setDescription(`Could not determine a winner!\n\nHosted by: ${message.author}`)
                    .setTimestamp()
                    .setColor(`GREY`)
                    .setFooter('Ended at')
                giveawayChannel.send(`A winner could not be determined!`);
                msg.edit(':tada: **GIVEAWAY ENDED** :tada:', winner_embed);
            }
            if (!msg.reactions.cache.get('🎉').users.cache.size < 1) {
                const winner_embed = new Discord.MessageEmbed()
                    .setTitle(`${giveawayPrize}`)
                    .setDescription(`Winner: ${winner}\n\nHosted by: ${message.author}`)
                    .setTimestamp()
                    .setColor(`GREY`)
                    .setFooter('Ended at')
                giveawayChannel.send(`Congratulations ${winner}! You won the **${giveawayPrize}**!`);
                msg.edit(':tada: **GIVEAWAY ENDED** :tada:', winner_embed);
            }
        }, 1000);
    }, ms(args[0]));
}