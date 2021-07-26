const Discord = require("discord.js");

module.exports = (message, status) => {
  const embed = new Discord.MessageEmbed()
    .setTitle(`Status do ${message.author.username}`)
    .setColor(`#bfff00`)
    .addFields(
      { name: "Str", value: status.str, inline: true },
      { name: "Agi", value: status.agi, inline: true },
      { name: "Vit", value: status.vit, inline: true },
      { name: "Int", value: status.int, inline: true },
      { name: "Dex", value: status.dex, inline: true },
      { name: "Luk", value: status.luk, inline: true },
      {
        name: "Stamina",
        value: `${status.stamina}/${status.stamina_max}`,
      },
      { name: "Level", value: status.level, inline: true },
      {
        name: "EXP",
        value: `${status.exp}/${status.level * status.level * 100}`,
        inline: true,
      },
      {
        name: "ASPD",
        value: `${status.aspd}`,
        inline: true,
      }
    )
    .setFooter(
      `Você tem ${status.points} Pontos para atribuir a os atributos.`
    );

  message.author.send(embed);
};
