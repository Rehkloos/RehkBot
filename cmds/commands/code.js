const Commando = require('discord.js-commando')
const {
    MessageEmbed
} = require('discord.js')
const L = require('@util/logger');

const blacklist = require('@assets/bannedwords.json');

const amongUsCategorySchema = require('@schemas/among-us-category-schema')

const channelNameStart = 'Among Us'

const blacklistedWords = new Set(blacklist);

module.exports = class CodeCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'code',
            group: 'among us',
            memberName: 'code',
            description: 'Makes it easier to play "Among Us" with friends',
            argsType: 'multiple',
        })

        client.on('voiceStateUpdate', (oldState) => {
            const {
                channel
            } = oldState

            if (
                channel &&
                channel.name.startsWith(channelNameStart) &&
                channel.members.size === 0
            ) {
                channel.delete()
                L.log(`Deleting channel "${channel.name}"`)
            }
        })
    }

    run = async (message, args) => {
        //!au <Region> <Code>
        const [region, code] = args

        if (!region) {
            message.reply('Please specify a region')
            return
        }

        if (!code) {
            message.reply('Please specify the game code')
            return
        }

        const {
            channel,
            guild,
            member
        } = message

        const categoryDocument = await amongUsCategorySchema.findOne({
            _id: guild.id,
        })

        if (!categoryDocument) {
            message.reply('An Among Us category has not been set within this server')
            return
        }

        if (!blacklistedWords.has(code.toUpperCase())) {
            const channelName = `${channelNameStart} "${code}"`
            await guild.channels.create(channelName, {
                type: 'voice',
                userLimit: 10,
                parent: categoryDocument.categoryId,
            })

            const embed = new MessageEmbed()
                .setTitle(`LOBBY CODE: ${code.toUpperCase()}`)
                .setDescription(
                    `${member} created a new Among Us game! Join channel "${channelName}"`
                )
                .setColor(0xDC143C)
                .addField('Region', region.toUpperCase())
                .setTimestamp()
                .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL())

            channel.send(embed)
        } else {
            message.channel.send("**Error:** WATCH YOUR PROFAMITY");
        }
    }
}