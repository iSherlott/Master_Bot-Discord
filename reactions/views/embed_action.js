const Discord = require("discord.js");
const fs = require("fs");

module.exports = (client, id, message, folder, event, color, reaction) => {
  let channel = client.channels.cache.get(id);
  let userId = message.mentions.users.map((e) => e.id);

  fs.readdir(`./assets/${folder}`, (err, paths) => {
    const number = Math.floor(Math.random() * paths.length);

    const attachment = new Discord.MessageAttachment(
      `./assets/${folder}/${paths[number]}`,
      paths[number]
    );
    const embed = new Discord.MessageEmbed()
      .setDescription(
        `${reaction} <@${message.author.id}> ${event} <@${userId}> ${reaction}`
      )
      .setColor(color)
      .attachFiles(attachment)
      .setImage(`attachment://${paths[number]}`);

    channel.send({ embed });
  });
};
