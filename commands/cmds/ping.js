module.exports = {
  commands: 'ping',
  minArgs: 0,
  maxArgs: 0,
  callback: (message) => {
    message.channel.send("Pinging...").then((msg) => {
      msg.edit("Ping: " + (Date.now() - msg.createdTimestamp + " ms"));
    });
  },
}
