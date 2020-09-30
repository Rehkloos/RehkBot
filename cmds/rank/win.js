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

  if (message.mentions.users.size > 2)
    return "The maximum number of imposters is 3! Use! Amongus help for help.";

  if (args.length != requiredArgs)
    return "Invalid number of arguments! Use! Amongus help for help.";

  if (mapCode < 0 || mapCode > 2 || isNaN(mapCode))
    return "The last argument must be a map number between 0 and 2. Use! Amongus help for help.";

  const victory = {
    serverID: message.guild.id,
    mode: modes[qtyImposters - 1],
    impostors: Array.from(message.mentions.users.keys()).sort(), // converte o map dos usuarios em um arra
    map: maps[mapCode],
  };
  victory.impostorsKey = victory.impostors.join("-");
  var impostorsMention = "";
  for (let i = 0; i < victory.impostors.length; i++) {
    impostorsMention += `<@${victory.impostors[i]}> `;
  }
  victory.impostorsMention = impostorsMention;

  return victory;
}

module.exports = class StartCommand extends Commando.Command {
  constructor(client) {
      super(client, {
          name: 'win',
          aliases: ['w','wins'],
          group: 'ranked',
          memberName: 'win',
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
    await db.registerWin(result);
    message.reply(
      `Victory recorded for imposters ${result.impostorsMention} on ${result.map} map`
    );
  }
};
