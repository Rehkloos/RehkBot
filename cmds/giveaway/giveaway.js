const GVYL = require('@features/giveawaylistener');

module.exports = {
    name: 'giveaway',
    category: "Giveaway",
    requiredPermissions: ['ADMINISTRATOR'],
    description: 'Basic discord giveaway',



    callback: async (message, args) => {
        if (!message.guild) return;
        GVYL.giveaway(message, args);
    }
}