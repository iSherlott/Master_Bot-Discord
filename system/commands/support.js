const moveSupport = require("../controllers/moveSupport");
const { channelCommands, supportChannel } = require("../../config.json");

module.exports = {
  name: "support",
  async execute(client, message) {
    if (message.channel.id != channelCommands)
      return message.channel.send(`Favor usar chat <#${channelCommands}>`);

    switch (message.author.id) {
      default:
        moveSupport(client, message, message.author.id, supportChannel);
        break;
    }
  },
};
