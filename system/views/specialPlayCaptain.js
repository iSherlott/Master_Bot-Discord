const Discord = require("discord.js");
const { newspaper } = require("../config/config.json");

module.exports = async (client, message) => {
  let channel = client.channels.cache.get(newspaper);

  const newspaperEmbed = await new Discord.MessageEmbed()
    .setTitle("Ganhador do jogo Capture o Ukufa de hoje!")
    .setDescription(
      `O ukufa é um grande ninja, porem o <@${message.author.id}> foi mais rapido que ele!`
    )
    .setColor(`#836FFF`)
    .setAuthor(
      message.author.username,
      `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}`
    )
    .setFooter(`Tente também capturar o Ukufa com o comando !lucky.`);
  channel.send(newspaperEmbed);
};
