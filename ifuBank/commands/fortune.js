const fortune = require("../helpers/consult_fortune");
const formatCoin = require("../helpers/formatCoin");

module.exports = {
  name: "fortune",
  description: "<Comando>",
  async execute(client, message) {
    let value = Math.floor(Math.random() * 101);

    await fortune(message.author.id, value).then((result) => {
      if (result.status == 201) {
        return message.channel.send(
          `<@${message.author.id}>, Você acaba de ganhar ${formatCoin(
            value
          )}, Seu novo saldo é de ${formatCoin(result.data.coin)} Sugar.`
        );
      }
      if (result.status == 202) {
        let available_time = result.data.available_time.split(/[-, " "]/);
        return message.channel.send(
          `<@${message.author.id}>, você ainda está no intervalo de tempo, retorna somente depois das ${available_time[3]}`
        );
      }
    });
  },
};
