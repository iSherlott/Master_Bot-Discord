const Discord = require("discord.js");
const fs = require("fs");

module.exports = (client, id, message, folder, color) => {
  fs.readdir(`./assets/${folder}`, (err, paths) => {
    const number = Math.floor(Math.random() * paths.length);
    const attachment = new Discord.MessageAttachment(
      `./assets/${folder}/${paths[number]}`,
      paths[number]
    );

    const embed = new Discord.MessageEmbed()
      .setDescription(message)
      .setColor(color)
      .attachFiles(attachment)
      .setImage(`attachment://${paths[number]}`);

    client.users.cache.get(id).send({ embed });
  });
};
