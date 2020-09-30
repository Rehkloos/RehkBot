const Commando = require('discord.js-commando');

module.exports = class NukeCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'nuke',
            group: 'among us',
            memberName: 'nuke',
            description: 'Clean messages in code channel. Needs admin privilages',
            clientPermissions: ['MANAGE_MESSAGES'],
            userPermissions: ['MANAGE_MESSAGES'],
        })
    }

    async run(message) {
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
    }
}