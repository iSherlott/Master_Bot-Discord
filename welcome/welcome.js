const Discord = require("discord.js");
const client = new Discord.Client();
const { welcome_Bot } = require("../config.json");
const banner = require("./controllers/banner");
const register = require("./controllers/register");
const escape = require("./controllers/escape");
const kick = require("./controllers/kick");
const role = require("./controllers/roleMember");

client.on("ready", () => {
  console.log("Welcome Online");
  client.user.setActivity(`Seja vem vindo a Happy Sugar Life~*`, {
    type: "LISTENING",
  });
});

client.on("guildMemberAdd", (member) => {
  if (member.user.bot) return;
  banner(client, member);
  register(member);
  role(member, "Member");
});

client.on("guildMemberRemove", (member) => {
  escape(member);
  kick(member);
});

client.login(welcome_Bot);
