module.exports = async (client, channelId) => {
  return new Promise(async (res, rej) => {
    const channel = await client.channels.fetch(channelId);
    channel.messages.fetch().then((messages) => res(messages));
  });
};
