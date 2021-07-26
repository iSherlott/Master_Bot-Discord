const Discord = require("discord.js");
const { prefix } = require("../config/config.json");

module.exports = (message, commands) => {
  const embed = new Discord.MessageEmbed()
    .setTitle("Help Commands")
    .setColor(`#8A2BE2`)
    .setFooter(`Utilize o prefixo ${prefix} antes de cada comando.`);

  for (const [key, value] of Object.entries(commands))
    embed.addField(key, value, true);

  message.channel.send(embed);
};
