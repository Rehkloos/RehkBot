const reqEvent = (event) => require(`@events/${event}`);
const linkScanner = require('@events/linkScanner');
const roleClaim = require('@events/roleClaim');
const VSU = require('@events/voiceStateUpdate');
const MPR = require('@events/MusicPlayer');
const TWL = require('@events/TWLIVE');

module.exports = (client) => {
    client.on('ready', () => reqEvent('ready')(client));
    linkScanner(client);
    roleClaim(client);
    VSU(client);
    // MPR(client);
    TWL(client);
};