const Discord = require("discord.js");
const client = new Discord.Client();
const ytdl = require("ytdl-core-discord");
const fs = require("fs");

const { FBI_BOT } = require("../config.json")

function contains(message, parameter) {
  return message.includes(parameter);
}

client.on("ready", () => {
  console.log("Morte aos lolicons!");
  client.user.setActivity("Pronto para matar lolicons");
});

client.on("message", async (message) => {
  if (contains(message.content.toLowerCase(), "loli")) {
    fs.readdir(`./assets/`, (err, paths) => {
      const number = Math.floor(Math.random() * paths.length);

      const attachment = new Discord.MessageAttachment(
        `./assets/${paths[number]}`,
        paths[number]
      );
      const embed = new Discord.MessageEmbed()
        .setDescription(`FBI OPEN UP!!!!`)
        .setColor("#FF0000")
        .attachFiles(attachment)
        .setImage(`attachment://${paths[number]}`)
        .setFooter(`Ideia do Gabismon, desenvolvido por Rule44`);

      message.channel.send({ embed });
    });

    if (message.member.voice.channel)
      message.member.voice.channel.join().then(async (connection) => {
        connection
          .play(
            await ytdl(
              "https://www.youtube.com/watch?v=6fB8QiPTadY&ab_channel=TheQualityComedian"
            ),
            { type: "opus" }
          )
          .on("speaking", (speaking) => {
            if (!speaking) {
              connection.channel.leave();
            }
          });
      });
  }
});

client.login(FBI_BOT);
