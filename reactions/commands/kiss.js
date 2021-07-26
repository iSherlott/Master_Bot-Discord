const embedAction = require("../views/embed_action");

module.exports = {
  name: "kiss",
  description: "<Comando> <alvo>",
  async execute(client, message) {
    embedAction(
      client,
      message.channel.id,
      message,
      "kiss",
      "beijou",
      "#B0C4DE",
      "💋"
    );
  },
};
