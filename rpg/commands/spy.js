const { channelCommands } = require("../config/config.json");
// const channelCommands = "828958044104687616";
const consultStatus = require("../helpers/consultStatus");
const updateUsers = require("../helpers/updateUsers");
const updateRPG = require("../helpers/updateRPG");
const levelUp = require("../views/levelUp");

const opcStatus = ["str", "agi", "vit", "int", "dex", "luk"];

module.exports = {
  name: "spy",
  async execute(client, message) {
    if (message.channel.id != channelCommands)
      return message.channel.send(`Favor usar chat <#${channelCommands}>`);

    let userId = message.mentions.users.map((e) => e.id);

    if (userId.length <= 0)
      return message.channel.send(
        `<@${message.author.id}>, Você precisa indicar quem deseja espiar!`
      );

    if (userId.length > 1)
      return message.channel.send(
        `<@${message.author.id}>, Você só pode espiar uma pessoa por comando!`
      );

    let isBot = await message.mentions.users.map((e) => e)[0].bot;
    if (isBot)
      return message.channel.send(
        `<@${message.author.id}> ,Você não pode efetuar esse comando a um bot`
      );

    let myStatus = await consultStatus(message.author.id);
    let opponentStatus = await consultStatus(userId[0]);

    let cost = opponentStatus.data.level - myStatus.data.level;

    if (opponentStatus.data == "")
      return message.channel.send(`Usuario não localizado!`);

    cost = cost >= 0 ? 1 : cost;
    cost = cost < 0 ? -1 * cost : cost;

    cost = cost * 5;

    if (myStatus.data.stamina < cost)
      return message.channel.send(
        `<@${message.author.id}>, Você não possue stamina suficiente para efetuar um espiar.`
      );

    let staminaCost = myStatus.data.stamina - cost;
    staminaCost = staminaCost == 0 ? "0" : staminaCost;

    await updateRPG(message.author.id, {
      stamina: staminaCost,
    });

    if (opponentStatus.data.id == myStatus.data.id)
      return message.channel.send(
        `<@${message.author.id}>, Você não pode espiar você mesmo!`
      );

    if (myStatus.data.aspd <= opponentStatus.data.aspd) {
      await updateUsers(message.author.id, { exp: myStatus.data.exp + 100 });
      await updateUsers(userId[0], { exp: opponentStatus.data.exp + 50 });

      if (
        myStatus.data.exp + 100 >=
        myStatus.data.level * myStatus.data.level * 100
      )
        levelUp(client, myStatus.data);

      if (
        opponentStatus.data.exp + 50 >=
        opponentStatus.data.level * opponentStatus.data.level * 100
      )
        levelUp(client, opponentStatus.data);

      let opc = opcStatus[Math.floor(Math.random() * opcStatus.length)];

      message.channel.send(
        `Em um ataque furtivo o <@${message.author.id}> conseguiu visualizar a ${opc} do <@${opponentStatus.data.id}>\n\n Level: ${opponentStatus.data.level}\n${opc}: ${opponentStatus.data[opc]} pts`
      );
    } else {
      await updateUsers(message.author.id, { exp: myStatus.data.exp + 50 });
      await updateUsers(userId[0], { exp: opponentStatus.data.exp + 50 });

      if (
        myStatus.data.exp + 50 >=
        myStatus.data.level * myStatus.data.level * 100
      )
        levelUp(client, myStatus.data);

      if (
        opponentStatus.data.exp + 50 >=
        opponentStatus.data.level * opponentStatus.data.level * 100
      )
        levelUp(client, opponentStatus.data);

      message.channel.send(
        `<@${message.author.id}>, Sua velocidade não é alta o bastante para conseguir visualizar os dados do <@${userId[0]}>`
      );
    }
  },
};
