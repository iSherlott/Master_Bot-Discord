const transfer = require("../helpers/operation_transfer");
const formatCoin = require("../helpers/formatCoin");

module.exports = {
  name: "transfer",
  description: "<Comando> <Alvo> <Valor>",
  async execute(client, message) {
    let userId = message.mentions.users.map((e) => e.id);

    if (userId.length > 1)
      return message.channel.send(
        `<@${message.author.id}>, Você só pode dar transferir valor a uma pessoa por vez!`
      );

    if (userId <= 0)
      return message.channel.send(
        `<@${message.author.id}>, Você precisa indicar quem você deseja transferir o valor`
      );

    let msg = message.content.split(" ");

    if (msg.length != 3)
      return message.channel.send(
        `<@${message.author.id}>, construa uma requisição no formato <Comando> <Alvo> <Valor>`
      );

    let value = parseInt(msg[2]);

    if (msg[2] == 0)
      return message.channel.send(
        `Serio <@${message.author.id}> Que você me chamou para transferir 0 Sugar ?`
      );

    if (typeof value != "number")
      return message.channel.send(
        `<@${message.author.id}>, Você precisa informa o valor que deseja transferir`
      );

    const userMentions = client.guilds.cache.map((e) =>
      e.members.cache.get(userId[0])
    );
    const { user } = userMentions[0];

    if (user.bot)
      return message.channel.send(
        `<@${message.author.id}>, Você não pode transferir dinheiro para bot!`
      );

    await transfer({
      id_payer: message.author.id,
      id_receive: userId[0],
      value,
    }).then((result) => {
      if (result.status == 201) {
        return message.channel.send(
          `<@${message.author.id}>, sua transferencia de ${formatCoin(
            value
          )} Sugar para <@${userId[0]}> ocorreu perfeitamente!!!`
        );
      } else
        return message.channel.send(
          `<@${message.author.id}>, Você não pode transferir mais do que tem em conta!!!`
        );
    });
  },
};
