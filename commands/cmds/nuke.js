//const L = require('../utils/logger');

module.exports = {
    commands: 'nuke',
    minArgs: 0,
    maxArgs: 0,
    description: "Clean messages in code channel. Needs admin privilages",
    permissions: 'MANAGE_MESSAGES',
    callback: (message, client) => {
        if ((message.guild.channels.cache.find(c => c.name === "codes"))) { // second check nuke command in codes room
            (async () => {
                let deleted;
                do {
                    deleted = await message.channel.bulkDelete(100); // delete last 100 messages in channel
                } while (deleted.size != 0);
            })();
            //L.log(` ${client.user.tag} to nuke channel`)
        } else if ((!message.guild.channels.cache.find(c => c.name === "codes"))) {
            message.channel.send(`You can't clear this channel`).then(msg => {
                    msg.delete({
                        timeout: 10000
                    });
                })
                .catch(console.error);
        }
    },
}