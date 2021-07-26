const { channelCommands } = require("../config/config.json");
const consultStatus = require("../helpers/consultStatus");
const updateRPG = require("../helpers/updateRPG");

module.exports = {
  name: "str+",
  async execute(client, message) {
    if (message.channel.id != channelCommands)
      return message.channel.send(`Favor usar chat <#${channelCommands}>`);

    let points = message.content.split(" ");

    if (points.length > 2)
      return message.channel.send(`Favor informa um número válido`);

    points = parseInt(points[1]);

    if (isNaN(points))
      return message.channel.send(`Favor informa um número válido`);

    let status = await consultStatus(message.author.id);

    if (status.data.points < points)
      message.channel
        .send(
          `<@${message.author.id}>, você não possue ${points} de pontos para efetuar o update.`
        )
        .then((msg) => {
          setTimeout(function () {
            message.delete();
            msg.delete();
          }, 5000);
        });
    else {
      await updateRPG(message.author.id, {
        str: status.data.str + points,
        points: status.data.points - points,
      });

      message.channel
        .send(
          `<@${message.author.id}>, Update de str efetuada com sucesso, utilize status para visualizar o aumento!`
        )
        .then((msg) => {
          setTimeout(function () {
            message.delete();
            msg.delete();
          }, 5000);
        });
    }
  },
};
