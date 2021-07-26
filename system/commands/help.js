const { jsonCommandsOwner } = require("../controllers/setCommands");
const { jsonCommandsSupport } = require("../controllers/setCommands");
const { jsonCommandsMember } = require("../controllers/setCommands");

const hasRole = require("../helpers/hasRole");

const embedHelp = require("../views/embedHelp");

module.exports = {
  name: "help",
  async execute(client, message) {
    if (message.author.id == message.guild.owner)
      embedHelp(message, jsonCommandsOwner);
    else if (hasRole(message, "Support"))
      embedHelp(message, jsonCommandsSupport);
    else if (hasRole(message, "Member")) embedHelp(message, jsonCommandsMember);
  },
};
