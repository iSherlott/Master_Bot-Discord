const reactionMessage = require("../helpers/reactionMessage");
const formatCoin = require("../helpers/formatCoin");
const payShop = require("../helpers/payShop");
const switchShopRpg = require("../helpers/switchShopRpg");
const status = require("../helpers/consultStatus");

const { channelShop } = require("../config/config.json");


module.exports = (client, channelId, text, emojis, price, addPrice) => {
  const getEmoji = (emojiName) =>
    client.emojis.cache.find((emoji) => emoji.name === emojiName);

  const reactions = [];

  let emojiText = `${text}\n\n`;
  for (const key in emojis) {
    const emoji = getEmoji(key);
    reactions.push(emoji);

    const role = emojis[key];
    emojiText += `${emoji} = ${role} / ${addPrice[key]} ${formatCoin(
      price[key]
    )}$\n`;
  }

  reactionMessage(client, emojiText, channelId, reactions);

  const handleReaction = async (reaction, user, add) => {
    if (user.bot) return;

    reaction.message.reactions
      .resolve(reaction._emoji.id)
      .users.remove(user.id);

    const emoji = reaction._emoji.name;

    const roleName = emojis[emoji];
    if (!roleName) {
      return;
    }

    if (add) {
      let myStatus = await status(user.id);
      let value;

      if (emoji == "points") value = myStatus.data.level * price[emoji];
      else value = price[emoji];

      console.log(value);

      if (await payShop(user.id, value)) {
        await switchShopRpg(emoji, user.id, myStatus);

        reaction.message.channel
          .send(
            `Parabéns <@${user.id}>, Você acabou de adquirir ${roleName}!!!`
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
