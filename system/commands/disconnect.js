const sendMenssageDM = require("../views/embedPrivatMessageGif");
const { channelCommands } = require("../../config.json");

module.exports = {
  name: "disconnect",
  async execute(client, message) {
    if (message.channel.id != channelCommands)
      return message.channel.send(`Favor usar chat <#${channelCommands}>`);

    let userId = message.mentions.users.map((e) => e.id);

    if (userId.length > 1)
      return message.channel.send(
        `<@${message.author.id}> ,Você precisa indicar quem deseja deconectar!`
      );

    if (userId <= 0)
      return message.channel.send(
        `<@${message.author.id}> ,Você só pode deconectar uma pessoa por comando!`
      );

    const user = client.guilds.cache.map((e) => e.members.cache.get(userId[0]));

    if (user[0].voice.channelID) {
      user[0].voice.setChannel(null);
      sendMenssageDM(
        client,
        userId[0],
        `Você foi desconectado pelo <@${message.author.id}>`,
        "disconnect",
        "#B8B8F3"
      );
    }
  },
};
