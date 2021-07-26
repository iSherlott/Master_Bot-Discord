const reactionMessage = require("../helpers/reactionMessage");

const { tag } = require("../config/config.json");

module.exports = (client, channelId, category, emojis) => {
  const getEmoji = (emojiName) =>
    client.emojis.cache.find((emoji) => emoji.name === emojiName);

  const reactions = [];

  let emojiText = `${category}\n\n`;
  for (const key in emojis) {
    const emoji = getEmoji(key);
    reactions.push(emoji);

    const role = emojis[key];
    emojiText += `${emoji} = ${role}\n`;
  }

  reactionMessage(client, emojiText, channelId, reactions);

  const handleReaction = async (reaction, user, add) => {
    if (user.bot) return;

    // reaction.message.reactions
    //   .resolve(reaction._emoji.id)
    //   .users.remove(user.id);

    const emoji = reaction._emoji.name;

    const { guild } = reaction.message;

    const roleName = emojis[emoji];
    if (!roleName) {
      return;
    }

    const role = guild.roles.cache.find((role) => role.name === roleName);
    const member = guild.members.cache.find((member) => member.id === user.id);

    if (add) {
      const guildMember = guild.members.cache.find(
        (guildMember) => guildMember.user == user.id
      );

      if (guildMember._roles.includes(role.id)) {
        member.roles.remove(role);
      } else {
        member.roles.add(role);
      }
    } else {
      member.roles.remove(role);
    }
  };

  client.on("messageReactionAdd", (reaction, user) => {
    if (reaction.message.channel.id === tag) {
      handleReaction(reaction, user, true);
    }
  });

  client.on("messageReactionRemove", (reaction, user) => {
    if (reaction.message.channel.id === tag) {
      handleReaction(reaction, user, false);
    }
  });
};
