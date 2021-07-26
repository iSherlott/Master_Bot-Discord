const embedAction = require("../views/embed_action");

module.exports = {
  name: "hit",
  description: "<Comando> <alvo>",
  async execute(client, message) {
    embedAction(
      client,
      message.channel.id,
      message,
      "hit",
      "socou",
      "#DB7093",
      "🎯"
    );
  },
};
