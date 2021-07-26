const {
  reactions_Bot,
  prefix,
  channelCommands
} = require("../config.json");
const { Client, Collection } = require("discord.js");
const { readdirSync } = require("fs");
const { join } = require("path");
const pay = require("./helpers/pay");

const client = new Client({
  disableMentions: "everyone",
  restTimeOffset: 0,
});

client.commands = new Collection();

client.on("ready", () => {
  console.log(`kauzando no pedaço!`);
  client.user.setActivity(
    `Utilize ${prefix} hit/kiss/kick/hug para reagir com quem você gosta <3 !`,
    {
      type: "LISTENING",
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
  if (
    !(
      message.channel.id == channelCommands
    )
  )
    return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (!client.commands.has(command)) return;
  try {
    pay({ item_name: command }, message.author.id).then((item) => {
      let userId = message.mentions.users.map((e) => e.id);

      if (userId.length > 1)
        return message.channel.send(
          `<@${message.author.id}> ,Você só pode dar ${command} a uma pessoa por vez!`
        );

      if (userId <= 0)
        return message.channel.send(
          `<@${message.author.id}> ,Você precisa indicar quem você deseja dar ${command}`
        );

      if (item.status == 201)
        client.commands.get(command).execute(client, message);
      else
        message.channel.send(
          `<@${message.author.id}>, Seu saldo é insuficiente para esse comando!`
        );
    });
  } catch (error) {
    message.channel.send("Erro ao tentar executar o seu comando!");
  }
});

client.login(reactions_Bot);
