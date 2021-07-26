const consult_balance = require("../helpers/consult_balance");
const formatCoin = require("../helpers/formatCoin");

module.exports = {
  name: "wallet",
  description: "<Comando>",
  async execute(client, message) {
    consult_balance(message.author.id).then((wallet) => {
      message.channel.send(
        `<@${message.author.id}>, Seu saldo é de ${formatCoin(
          wallet.data.coin
        )} Sugar`
      );
    });
  },
};
