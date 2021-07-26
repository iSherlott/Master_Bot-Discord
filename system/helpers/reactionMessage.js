const { channelTags } = require("../../config.json");

const addReactions = (message, reactions) => {
  message.react(reactions[0]);
  reactions.shift();
  if (reactions.length > 0) {
    setTimeout(() => addReactions(message, reactions), 750);
  }
};

module.exports = async (client, text, channelId, reactions = []) => {
  const channel = await client.channels.fetch(channelTags);
  channel.messages.fetch().then((messages) => {
    messages.map((e) => {
      if (e.id == channelId) {
        addReactions(e, reactions);
        e.edit(text);
      }
    });
  });
};
