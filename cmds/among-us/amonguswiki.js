module.exports = {
    name: 'amonguswiki',
    aliases: ['auwiki', 'amwiki'],
    description: `Search amongu's wiki`,


    callback: (message, args) => {
        var search = args.join('_');
        if (!search) return message.channel.send("Input something to search for!");
        message.channel.send("https://among-us-wiki.fandom.com/wiki/" + search);
    }
}