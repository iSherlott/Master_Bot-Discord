const Discord = require("discord.js");

module.exports = async (client, id, message, status, oponnentName) => {
  const embed = await new Discord.MessageEmbed()
    .setTitle(`Dados do ${oponnentName}`)
    .setDescription(
      `Você acredita que o ${oponnentName} tentou te roubar.\nEle pode ter fugido, contudo você conseguiu visualizar todos os dados dele.`
    )
    .setColor(`#ff0000`)
    .addFields(
      { name: "Str", value: status.str, inline: true },
      { name: "Agi", value: status.agi, inline: true },
      { name: "Vit", value: status.vit, inline: true },
      { name: "Int", value: status.int, inline: true },
      { name: "Dex", value: status.dex, inline: true },
      { name: "Luk", value: status.luk, inline: true },
      { name: "Level", value: status.level, inline: true }
    );

  client.users.cache.get(id).send(embed);
};
