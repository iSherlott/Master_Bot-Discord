const { system_Bot, prefix } = require("../config.json");
const { Client, Collection } = require("discord.js");
const { readdirSync } = require("fs");
const { join } = require("path");

const isOwner = require("./routers/isOwner");
const hasSupport = require("./routers/hasSupport");
const isMember = require("./routers/isMember");

const hasRole = require("./helpers/hasRole");

const tag = require("./controllers/tag");

const client = new Client({
  disableMentions: "everyone",
  restTimeOffset: 0,
});

client.commands = new Collection();

client.on("ready", () => {
  console.log(`System Online!`);
  client.user.setActivity(
    `Qualquer duvida utilize ${prefix}help que te informo os comandos existente!`,
    {
      type: "LISTENING",
    }
  );

  tag(client);
});

const commandFiles = readdirSync(join(__dirname, "commands")).filter((file) =>
  file.endsWith(".js")
);
for (const file of commandFiles) {
  const command = require(join(__dirname, "commands", `${file}`));
  client.commands.set(command.name, command);
}

client.on("message", async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (!client.commands.has(command)) return;
  try {
    if (message.author.id == message.guild.owner)
      isOwner(client, command, message);
    else if (hasRole(message, "Support")) hasSupport(client, command, message);
    else if (hasRole(message, "Member")) isMember(client, command, message);
  } catch (error) {
    console.log(error);
    message.channel.send("Erro ao tentar executar o seu comando!");
  }
});

client.login(system_Bot);
