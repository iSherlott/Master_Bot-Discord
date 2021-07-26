const schedule = require("node-schedule");
const Discord = require("discord.js");

const rich = require("../helpers/consultRich");
const formatCoin = require("../helpers/formatCoin");

module.exports = async (client, channelNewspaper) => {
  const channelId = await client.channels.fetch(channelNewspaper);

  const rule = new schedule.RecurrenceRule();
  rule.dayOfWeek = [new schedule.Range(0, 6)];
  rule.hour = 00;
  rule.minute = 00;
  rule.second = 01;

  schedule.scheduleJob(rule, function () {
    const richEmbed = new Discord.MessageEmbed()
      .setDescription(`Rank dos mais ricos!!!`)
      .setColor(`#9367F3`);

    rich(`limit=3`, `order=desc`).then((result) => {
      let index = 0;
      for (let key of result.data) {
        index += 1;
        richEmbed.addField(
          `${index}° Por ter uma riqueza de ${formatCoin(key.coin)} Sugar.`,
          `<@${key.id}>`
        );
      }
      channelId.send(richEmbed);
    });
  });
};
