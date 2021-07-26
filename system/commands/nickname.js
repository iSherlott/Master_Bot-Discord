const pay = require("../helpers/payCoin");
const price = require("../helpers/consultPrice");
const { channelCommands } = require("../../config.json");

module.exports = {
  name: "nickname",
  async execute(client, message) {
    if (message.channel.id != channelCommands)
      return message.channel.send(`Favor usar chat <#${channelCommands}>`);

    const nickname = await price({ item_name: "nickname" });

    if (await pay(message.author.id, nickname.data.price)) {
      const user = client.guilds.cache.map((e) =>
        e.members.cache.get(message.author.id)
      );

      const nick = message.content.replace(/!nickname/i, "").trim();

      user[0].setNickname(nick);
    } else {
      message.channel.send(
        `<@${message.author.id}>, Saldo insuficiente para executar esse comando.`
      );
    }
  },
};
