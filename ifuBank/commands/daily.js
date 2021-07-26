const daily = require("../helpers/consult_daily");
const formatCoin = require("../helpers/formatCoin");

module.exports = {
  name: "daily",
  description: "<Comando>",
  async execute(client, message) {
    daily(message.author.id).then((monny) => {
      if (monny.status == 201) {
        return message.channel.send(
          `Parabéns <@${message.author.id}>, Você acaba de ganhar ${formatCoin(
            monny.data.prize_award
          )}, Seu novo saldo é de ${formatCoin(monny.data.coin)} Sugar.`
        );
      }
      if (monny.status == 202) {
        let available_time = monny.data.daily.split("-");
        return message.channel.send(
          `<@${message.author.id}>, você já obteve o daily de hoje, tente novamente depois de ${available_time[2]}/${available_time[1]}/${available_time[0]}`
        );
      }
    });
  },
};
