const Discord = require('discord.js');
const {
    MessageEmbed
} = require('discord.js');

const L = require('@util/logger');

const blacklistedWords = new Set(['NICE', 'OKAY', 'STFU', 'WHOA', 'GUYS', 'LMAO', 'ROFL', 'FUCK', 'BRUH', 'SHIT', 'WHAT', 'LULW', 'KEKW', 'LOLW', 'DUDE', 'HAHA', 'AHAH', 'LMOA', 'JOIN', 'COME']);


module.exports = {
    commands: 'code',
    expectedArgs: '<code>',
    minArgs: 1,
    maxArgs: 1,
    description: "Post Among Us code to channel",
    callback: (message, args) => {

        const code = args[0];

        if (!blacklistedWords.has(code)) {


            var gamechannelID = "";
            gamechannelID = message.guild.channels.cache.find(channel => channel.name.includes("Among"));

            let maxMembers = -1;
            let maxChannel = null;
            for (let vc of message.guild.channels.cache.values()) {
                if (vc.type === 'voice') {
                    if (vc.members.has(message.author.id)) {
                        maxChannel = vc;
                        break;
                    } else if (vc.members.size > maxMembers) {
                        maxMembers = vc.members.size;
                        maxChannel = vc;
                    }
                }
            }

            if (message.member.voice.channel && gamechannelID) {
                try {
                    var codesID = message.guild.channels.cache.find(channel => channel.name === "codes").id;
                    const mychannel = (message.guild.channels.cache.find(c => c.name === "codes"));
                    if (mychannel) mychannel.send(new MessageEmbed()
                        .setColor(0xDC143C)
                        .setTitle(`${code}`)
                        .setDescription(`The code is ${code}.\n\nCheck the bot name too!\n*sometimes the voice channel name wont change due to being rate limited*`) // make this look better
                        .setTimestamp()
                        .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL)
                    ).then(message => {
                        message.delete({
                            timeout: 1000 * 60 * 60 * 5
                        });
                    });
                    if (!message.channel.id === codesID) {
                        // check if the command wasnt sent in the codes channel
                        message.channel.send(`Sent in <#${codesID}>`).then(message => {
                            message.delete({
                                timeout: 5000
                            });
                        });
                    }

                } catch (err) {
                    message.channel.send(mychannel);
                }

                maxChannel.edit({
                    name: `${code} | AmongUs`
                });
                message.member.voice.channel.edit({
                    name: `${code} | AmongUs` // This among us NEEDS to be here, it makes the bot work without storing data
                });
                /*message.guild.me.edit({
                  nick: `${code} | ${this.client.user.username}`
                });*/
                L.log(`Updated code to ${code}`);
            } else {
                message.channel.send("**Error:** Please join a voice channel.");
            }
        } else {
            message.channel.send("**Error:** WATCH YOUR PROFAMITY");
        }
    },
}
