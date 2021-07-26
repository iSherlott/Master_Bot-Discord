const embedAction = require("../views/embed_action");

module.exports = {
  name: "kick",
  description: "<Comando> <alvo>",
  async execute(client, message) {
    embedAction(
      client,
      message.channel.id,
      message,
      "kick",
      "chutou",
      "#7FFFD4",
      "🦶"
    );
  },
};
