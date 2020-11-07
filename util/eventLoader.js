const reqEvent = (event) => require(`@events/${event}`);
const linkScanner = require('@events/linkScanner');
const roleClaim = require('@events/roleClaim');
const VSU = require('@events/voiceStateUpdate');

module.exports = (client) => {
    client.on('ready', () => reqEvent('ready')(client));
    client.on('rateLimit', reqEvent('rateLimit'));
    linkScanner(client);
    roleClaim(client);
    VSU(client);
};