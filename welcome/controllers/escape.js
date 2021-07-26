const Discord = require("discord.js");
const { textByeBye } = require("../config/config.json");
const { channelNewspaper } = require("../../config.json")
const fs = require("fs");

module.exports = async (member) => {
  await fs.readdir(`./assets/escape`, (err, paths) => {
    const number = Math.floor(Math.random() * paths.length);

    const attachment = new Discord.MessageAttachment(
      `./assets/escape/${paths[number]}`,
      paths[number]
    );
    const goodbyembed = new Discord.MessageEmbed()
      .setAuthor(
        `${member.user.tag} Saiu do servidor!`,
        member.user.avatarURL()
      )
      .setDescription(`O <@${member.user.id}>, ${textByeBye}`)
      .setColor("#FF0000")
      .attachFiles(attachment)
      .setImage(`attachment://${paths[number]}`);

    member.guild.channels.cache.get(channelNewspaper).send(goodbyembed);
  });
};
