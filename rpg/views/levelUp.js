const Discord = require("discord.js");

module.exports = (client, status) => {
  const embed = new Discord.MessageEmbed()
    .setTitle(`Parabéns você subiu de nivel`)
    .setDescription(
      `Você atingiu o level ${
        status.level + 1
      }\nUse os novos pontos para aumentar seus status.`
    )
    .setColor(`#bfff00`)
    .setFooter(
      `Você tem ${status.points + 5} Pontos para atribuir a os atributos.`
    );
  client.users.cache.get(status.id).send(embed);
};
