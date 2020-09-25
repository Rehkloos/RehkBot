module.exports = {
    commands: ['version', 'v'],
    minArgs: 0,
    maxArgs: 0,
    description: "Latest commit for bot",
    callback: (message) => {

        var gitCommit = "Couldn't get commit";

        gitCommit = require('child_process')
            .execSync('git rev-parse --short HEAD')
            .toString().trim()


        message.channel.send(`Latest Bot commit: https://github.com/Rehkloos/queue-bot/commit/${gitCommit}`);
    },
}
