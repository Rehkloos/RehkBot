const roleID = process.env.ROLE;

module.exports = (client) => {

    // adding roles via reactions in an uncached message
    client.on('messageReactionAdd', async (reaction, user) => {
        const {
            name
        } = reaction.emoji;
        const member = reaction.message.guild.members.cache.get(user.id);
        switch (name) {
            case '👍': // Javascript
                await member.roles.add(roleID);
                break;
            default:
                break;
        }
    });

    // removing roles
    client.on('messageReactionRemove', async (reaction, user) => {
        const {
            name
        } = reaction.emoji;
        const member = reaction.message.guild.members.cache.get(user.id);
        switch (name) {
            case '👍': // Javascript
                await member.roles.remove(roleID);
                break;
            default:
                break;
        }
    });
}
