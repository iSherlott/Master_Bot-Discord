module.exports = (client, message, id, channel) => {
  const user = client.guilds.cache.map((e) => e.members.cache.get(id));
  let users = user[0];

  message.mentions.users.map((userMove) => {
    const user = client.guilds.cache.map((e) =>
      e.members.cache.get(userMove.id)
    );
    let users = user[0];
    if (users.voice) users.voice.setChannel(channel);
  });

  if (users.voice) users.voice.setChannel(channel);
};
