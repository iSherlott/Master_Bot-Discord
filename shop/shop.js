const Discord = require("discord.js");
const client = new Discord.Client();

const shopController = require("./controllers/shopController");

const { shop_Bot } = require("./config/config");

client.on("ready", () => {
  console.log(`Lojinha aberta!`);
  client.user.setActivity(`Shop !!!`, {
    type: "LISTENING",
  });

  shopController(client);
});

client.login(shop_Bot);
