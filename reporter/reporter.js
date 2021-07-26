const Discord = require("discord.js");
const client = new Discord.Client();

const { reporter_Bot, channelNewspaper } = require("../config.json");

const rich = require("./controllers/rankRich");

client.on("ready", () => {
  console.log(`Newspaper!`);
  client.user.setActivity(`Irei te atualizar com todas as novidades !!!`, {
    type: "LISTENING",
  });
  rich(client, channelNewspaper);
});

client.login(reporter_Bot);
