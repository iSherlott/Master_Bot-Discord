const consultStatus = require("../helpers/consultStatus");
const { channelCommands } = require("../config/config.json");
const embedStatus = require("../views/embedStatus");

module.exports = {
  name: "status",
  async execute(client, message) {
    if (message.channel.id != channelCommands)
      return message.channel.send(`Favor usar chat <#${channelCommands}>`);

    let status = await consultStatus(message.author.id);

    embedStatus(message, status.data);
  },
};
