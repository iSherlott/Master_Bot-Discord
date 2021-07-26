const { rpg_Bot, prefix } = require("../config.json");
const { Client, Collection } = require("discord.js");
const { readdirSync } = require("fs");
const { join } = require("path");

const updateStamina = require("./controllers/updateStamina");

const client = new Client({
  disableMentions: "everyone",
  restTimeOffset: 0,
});

client.commands = new Collection();

client.on("ready", () => {
  console.log(`RPG Online!`);

  client.user.setActivity(`Que os jogos comecem!!!`, {
    type: "LISTENING",
  });

  updateStamina();
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
    client.commands.get(command).execute(client, message);
  } catch (error) {
    console.log(error);
    message.channel.send("Erro ao tentar executar o seu comando!");
  }
});

client.login(rpg_Bot);
