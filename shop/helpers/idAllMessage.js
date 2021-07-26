const { channelShop } = require("../../config.json");

module.exports = async (client, channelId) => {
  return new Promise(async (res, rej) => {
    const channel = await client.channels.fetch(channelShop);
    channel.messages.fetch().then((messages) => res(messages));
  });
};
