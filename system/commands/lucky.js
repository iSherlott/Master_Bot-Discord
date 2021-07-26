const { channelCommands, specialPlay } = require("../../config.json");

const receive = require("../helpers/receive");
const consultAward = require("../helpers/consultAward");
const consultPrice = require("../helpers/consultPrice");
const consultRank = require("../helpers/consultRank");
const formatCoin = require("../helpers/formatCoin");
const update = require("../helpers/updateDateRank");
const pay = require("../helpers/payCoin");

const sendNews = require("../views/specialPlayCaptain");

module.exports = {
  name: "lucky",
  async execute(client, message) {
    if (message.channel.id != channelCommands)
      return message.channel.send(`Favor usar chat <#${channelCommands}>`);

    const rank = await consultRank(message.author.id);
    if (rank.status == 201)
      return message.channel.send(
        `<@${message.author.id}>, Você já obteve o Lucky hoje, não estrage a brincadeira.`
      );

    if (rank.status != 200)
      return message.channel.send(
        `Favor tirar print dessa message e enviar para um dos Support`
      );

    const permissionCommand = client.guilds.cache.map((e) =>
      e.members.cache.get(message.author.id)
    );

    if (!permissionCommand[0].voice.channelID)
      return message.channel.send(
        `<@${message.author.id}>, Você precisa estar em um channal de voz para executar o comando.`
      );

    const specialPlayId = client.guilds.cache.map((e) => e.members.cache.get(specialPlay));

    if (specialPlayId[0].voice.channelID == "832632289246445651")
      return message.channel.send(
        `Na sala <#832632289246445651> o <@237111999870402560> está protegido`
      );

    let price = await consultPrice({ item_name: "specialPlay" });
    let result = await pay(message.author.id, price.data.price);

    if (!result)
      return message.channel.send(
        `<@${message.author.id}>, Saldo insuficiente para tentar a sorte, você precisa de 500 Sugar para tentar a sorte.`
      );

    if (!specialPlayId[0].voice.channelID)
      return message.channel.send(
        `<@${message.author.id}>, infelizmente o <@${specialPlay}> não está em um canal de voz, tente novamente mais tarde.`
      );
    else {
      let award = await consultAward({ name_award: "specialPlay" });
      let status = await receive(message.author.id, award.data.prize_award);
      console.log(status);
      if (status.status != 201)
        return message.channel.send(
          `Favor tirar print dessa message e enviar para um dos Support`
        );

      await update(message.author.id);
      await sendNews(client, message);

      message.channel.send(
        `<@${
          message.author.id
        }>, Você tirou a sorte grande, acabou de adquirir ${formatCoin(
          award.data.prize_award
        )} Sugar`
      );
    }
  },
};
