const pay = require("../helpers/payCoin");
const price = require("../helpers/consultPrice");
const sendMenssageDM = require("../views/embedPrivatMessageGif");
const { target, channelCommands } = require("../../config.json");

function kick(client, id) {
  sendMenssageDM(
    client,
    id,
    `Hoje não foi seu dia de sorte!!!`,
    "disconnect",
    "#B8B8F3"
  );
}

module.exports = {
  name: "killtarget",
  async execute(client, message) {
    if (message.channel.id != channelCommands)
      return message.channel.send(`Favor usar chat <#${channelCommands}>`);

    const killtarget = await price({ item_name: "killtarget" });

    const userKick = client.guilds.cache.map((e) =>
      e.members.cache.get(message.author.id)
    );

    const targetKick = client.guilds.cache.map((e) =>
      e.members.cache.get(target)
    );

    if (!userKick[0].voice.channelID)
      return message.channel.send(
        `<@${message.author.id}>, Você precisa estar em um channal de voz para executar o comando.`
      );
    if (!targetKick[0].voice.channelID)
      return message.channel.send(
        `<@${message.author.id}>, O target tem que estar em um servidor para usar o comando.`
      );

    if (await pay(message.author.id, killtarget.data.price)) {
      let result = Math.floor(Math.random() * 2);

      if (result == true) {
        if (targetKick[0].voice.channelID) {
          targetKick[0].voice.setChannel(null);
        }

        kick(client, target);
      } else {
        if (userKick[0].voice.channelID) {
          userKick[0].voice.setChannel(null);
        }

        kick(client, message.author.id);
      }
    } else {
      message.channel.send(
        `<@${message.author.id}>, Saldo insuficiente para executar esse comando.`
      );
    }
  },
};
