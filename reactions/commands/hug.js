const embedAction = require("../views/embed_action");

module.exports = {
  name: "hug",
  description: "<Comando> <alvo>",
  async execute(client, message) {
    embedAction(
      client,
      message.channel.id,
      message,
      "hug",
      "abraçou",
      "#A020F0",
      "🤗"
    );
  },
};
