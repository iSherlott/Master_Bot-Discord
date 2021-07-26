const reactionMessage = require("../helpers/reactionMessage");
const payShop = require("../helpers/payShop");

const { channelShop } = require("../config/config.json");

module.exports = (client, channelId, category, text, emojis, price) => {
  const getEmoji = (emojiName) =>
    client.emojis.cache.find((emoji) => emoji.name === emojiName);

  const reactions = [];

  let emojiText = `${text}\n\n`;
  for (const key in emojis) {
    const emoji = getEmoji(key);
    reactions.push(emoji);

    const role = emojis[key];
    emojiText += `${emoji} = ${role}\n`;
  }

  reactionMessage(client, emojiText, channelId, reactions);

  const handleReaction = async (reaction, user, add) => {
    if (user.bot) return;

    reaction.message.reactions
      .resolve(reaction._emoji.id)
      .users.remove(user.id);

    const emoji = reaction._emoji.name;

    const { guild } = reaction.message;

    const roleName = emojis[emoji];
    if (!roleName) {
      return;
    }

    const role = guild.roles.cache.find((role) => role.name === roleName);
    const member = guild.members.cache.find((member) => member.id === user.id);

    if (member._roles.includes(role.id))
      return reaction.message.channel
        .send(
          `<@${user.id}> Você já possue essa ${category} ativada em sua conta!!!`
        )
        .then((message) =>
          setTimeout(() => {
            message.delete();
          }, 8000)
        );

    if (add) {
      if (await payShop(user.id, price)) {
        member.roles.add(role);
        reaction.message.channel
          .send(
            `A cor do <@${user.id}> Foi trocada para ${role} com sucesso!!!`
          )
          .then((message) =>
            setTimeout(() => {
              message.delete();
            }, 8000)
          );
      } else
        reaction.message.channel
          .send(
            `<@${user.id}>, Saldo insuficiente para efetuar o procedimento!!!`
          )
          .then((message) =>
            setTimeout(() => {
              message.delete();
            }, 8000)
          );
    }
  };

  client.on("messageReactionAdd", (reaction, user) => {
    if (reaction.message.channel.id === channelShop) {
      handleReaction(reaction, user, true);
    }
  });
};
