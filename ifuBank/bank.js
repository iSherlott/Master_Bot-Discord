const { ifuBank_Bot, prefix, channelCommands } = require("../config.json");
const { Client, Collection } = require("discord.js");
const { readdirSync } = require("fs");
const { join } = require("path");

const client = new Client({
  disableMentions: "everyone",
  restTimeOffset: 0,
});

client.commands = new Collection();

client.on("ready", () => {
  console.log(`Sistema bancario Online!`);
  client.user.setActivity(
    `ifuBank o lugar onde seu dinheiro está mais do que protegido !!!`,
    {
      type: "WATCHING",
    }
  );
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
  if (message.channel.id != channelCommands) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(client, message);
  } catch (error) {
    message.channel.send("Erro ao tentar executar o seu comando!");
  }
});

client.login(ifuBank_Bot);
