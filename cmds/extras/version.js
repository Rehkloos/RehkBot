module.exports = {
    name: 'version',
    description: 'Latest commit for bot',



    callback: async (message) => {
        var gitCommit = "Couldn't get commit";

        gitCommit = require('child_process')
            .execSync('git rev-parse --short HEAD')
            .toString().trim()


        message.channel.send(`Latest Bot commit: https://github.com/Rehkloos/queue-bot/commit/${gitCommit}`);
    }
}