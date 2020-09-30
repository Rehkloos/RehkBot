const Commando = require('discord.js-commando');

module.exports = class AMWikiCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'amonguswiki',
            aliases: ['auwiki', 'amwiki'],
            group: 'extras',
            memberName: 'amonguswiki',
            description: `Search amongu's wiki`,
            argsType: 'multiple',
        })
    }

    async run(message, args) {
        var search = args.join('_');
    if(!search) return message.channel.send("Input something to search for!");
    message.channel.send("https://among-us-wiki.fandom.com/wiki/" + search);
    }
}