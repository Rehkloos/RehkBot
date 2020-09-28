const Commando = require('discord.js-commando');

module.exports = class VersionCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'version',
            group: 'extras',
            memberName: 'version',
            description: 'Latest commit for bot',
        })
    }

    async run(message) {
        var gitCommit = "Couldn't get commit";

        gitCommit = require('child_process')
            .execSync('git rev-parse --short HEAD')
            .toString().trim()


        message.channel.send(`Latest Bot commit: https://github.com/Rehkloos/queue-bot/commit/${gitCommit}`);
    }
}