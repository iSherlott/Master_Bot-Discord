module.exports = {
  name: "clearall",
  async execute(client, message) {
    client.channels
      .fetch(message.channel.id)
      .then((channel) => channel.messages.fetch())
      .then((messages) => messages.forEach((message) => message.delete()));
  },
};
