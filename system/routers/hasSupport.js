const isMember = require("./isMember");
const { jsonCommandsSupport } = require("../controllers/setCommands");

module.exports = (client, command, message) => {
  if (Object.keys(jsonCommandsSupport).includes(command))
    client.commands.get(command).execute(client, message);
  else isMember(client, command, message);
};
