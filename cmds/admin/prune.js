const L = require('@util/logger');

module.exports = {
    name: 'prune', // Optional
    commands: ['prune'], // Optional
    description: 'Clean messages in code channel. Needs admin privilages',
    aliases: ['p'], // Optional
    requiredPermissions: ['MANAGE_MESSAGES'],

    callback: (message, args) => {
        if (!isNaN(args[0])) {
            let messagecount = parseInt(args[0]);
            try {
                if (messagecount >= 100)
                    messagecount = 99;

                message.channel.messages.fetch({
                        limit: (messagecount + 1)
                    })
                    .then(messages => {
                        message.channel.bulkDelete(messages, true)
                            .then(() => {
                                if (messages.size - 1 > 0) {
                                    message.reply(`${messages.size - 1} messages have been deleted succesfully.`)
                                        .then(msg => {
                                            msg.delete({
                                                timeout: 5000
                                            });
                                        });
                                } else {
                                    message.reply('No messages were deleted.')
                                        .then(msg => {
                                            msg.delete({
                                                timeout: 5000
                                            });
                                        });
                                }
                            })
                            .catch(e => {
                                L.err('Error: ' + e);
                            });
                    });
            } catch (err) {
                message.channel.send('No message got deleted')
                    .then(msg => {
                        L.log(err);
                        msg.delete({
                            timeout: 5000
                        });
                        message.delete({
                            timeout: 5000
                        });
                    });
            }
        } else {
            message.channel.send('You didn\'t send me a number.');
        }
    }
}