const L = require('@util/logger');

module.exports = async (client) => {
    try {
        await client.user.setActivity(`Among Us | on ${client.guilds.cache.size} servers`, {
            type: "PLAYING"
        })
        L.log(`Logged in as ${client.user.tag}`);

    } catch (err) {
        return;
    }
};