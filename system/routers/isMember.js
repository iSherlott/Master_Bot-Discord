const { jsonCommandsMember } = require("../controllers/setCommands");
const { ukufa } = require("../config/config.json");

module.exports = (client, command, message) => {
  if (
    Object.keys(jsonCommandsMember).includes(command) ||
    (message.author.id == ukufa && command == "special")
  )
    client.commands.get(command).execute(client, message);
};
