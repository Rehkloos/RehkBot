const db = require("@handlers/firebaseDB");
const Commando = require('discord.js-commando')

const maps = ["theskeld", "mirahq", "polus"];
const modes = ["solo", "duo", "trio"];


function Verify(message, args) {
  const qtyImposters = message.mentions.users.size;
  const requiredArgs = qtyImposters + 1;
  const mapCode = args[args.length - 1];

  if (!qtyImposters)
    return "Use! Amongus help for help using the command.";

  if (message.mentions.users.size > 3)
    return "The maximum number of imposters is 3! Use! Amongus help for help.";

  if (args.length != requiredArgs)
    return "Invalid number of arguments! Use! Amongus help for help.";

  if (mapCode < 0 || mapCode > 2 || isNaN(mapCode))
    return "The last argument must be a map number between 0 and 2. Use! Amongus help for help.";

  const Loss = {
    serverID: message.guild.id,
    mode: modes[qtyImposters - 1],
    impostors: Array.from(message.mentions.users.keys()).sort(), // converts the users map into an array
    map: maps[mapCode],
  };
  Loss.impostorsKey = Loss.impostors.join("-");
  var impostorsMention = "";
  for (let i = 0; i < Loss.impostors.length; i++) {
    impostorsMention += `<@${Loss.impostors[i]}> `;
  }
  Loss.impostorsMention = impostorsMention;

  return Loss;
}

module.exports = class StartCommand extends Commando.Command {
  constructor(client) {
      super(client, {
          name: 'loss',
          aliases: ['l','losses'],
          group: 'ranked',
          memberName: 'loss',
          description: "Wins counter based on maps. syntax: !win (name) 0-2  ",
          argsType: 'multiple',
      })
  }

  async run(message, args) {
    const result = Verify(message, args);
    if (typeof result === "string") {
      message.reply(result);
      return false;
    }
    await db.registerLoss(result);
    message.reply(
      `Loss recorded for imposters ${result.impostorsMention} on ${result.map} map`
    );
  }
};