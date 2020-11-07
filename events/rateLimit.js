const {
    client
} = require('@root/index');
const chalk = require('chalk')
module.exports = async (client) => {
    client.on('rateLimit', async (rateLimitInfo) => {
        console.error(chalk.redBright(`RATE_LIMITED`), `Info on RateLimit:\nTimeout: ${rateLimitInfo.timeout}ms\nLimit: ${rateLimitInfo.limit}\nHTTP method: ${rateLimitInfo.method}\nPath: ${rateLimitInfo.path}\nRoute: ${rateLimitInfo.route}`);
    });
}