const hasSupport = require("./hasSupport");
const { jsonCommandsOwner } = require("../controllers/setCommands");

module.exports = (client, command, message) => {
  client.commands.get(command).execute(client, message);
};
