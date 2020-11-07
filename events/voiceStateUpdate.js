const L = require('@util/logger');

module.exports = (client) => {

    const channelNameStart = 'Among Us'

    // adding roles via reactions in an uncached message
    client.on('voiceStateUpdate', (oldState) => {
        const {
            channel
        } = oldState

        if (
            channel &&
            channel.name.startsWith(channelNameStart) &&
            channel.members.size === 0
        ) {
            channel.delete()
            L.log(`Deleting channel "${channel.name}"`)
        }
    })
}