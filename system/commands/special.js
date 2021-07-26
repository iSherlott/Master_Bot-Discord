const { channelCommands, specialPlay } = require("../config/config.json");
const sendMenssageDM = require("../views/embedPrivatMessageGif");

module.exports = {
  name: "special",
  async execute(client, message) {
    if (message.author.id != specialPlay)
      return message.channel.send(`Esse comando é exclusivo do special play.`);

    if (message.channel.id != channelCommands)
      return message.channel.send(`Favor usar chat <#${channelCommands}>`);

    const specialPlayId = client.guilds.cache.map((e) => e.members.cache.get(specialPlay));

    if (!specialPlayId[0].voice.channelID)
      return message.channel.send(
        `<@${message.author.id}>, a regra é você estar em um canal de voz.`
      );

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

    if (user[0].voice.channelID == "832632289246445651")
      return message.channel.send(
        `Na sala <#832632289246445651> você não poderá desconectar com o special, tente usar outro comando!`
      );

    if (user[0].voice.channelID) {
      user[0].voice.setChannel(null);
      sendMenssageDM(
        client,
        userId[0],
        `Você foi desconectado pelo <@${message.author.id}>, isso significa que ele está em um chat de voice, rode o comando !lucky e se ele ainda estiver, você ira ganhar moedas.`,
        "disconnect",
        "#B8B8F3"
      );
    }
  },
};
