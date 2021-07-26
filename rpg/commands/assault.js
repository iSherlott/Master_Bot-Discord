const { channelCommands } = require("../config/config.json");
//const channelCommands = "828958044104687616";
const consultStatus = require("../helpers/consultStatus");
const updateRPG = require("../helpers/updateRPG");
const updateUsers = require("../helpers/updateUsers");
const hasElement = require("../helpers/hasElement");
const resultElement = require("../helpers/resultElement");
const transfer = require("../helpers/transfer");
const embedSpy = require("../views/embedSpy");
const levelUp = require("../views/levelUp");

module.exports = {
  name: "assault",
  async execute(client, message) {
    message.delete();

    if (message.channel.id != channelCommands)
      return message.channel.send(`Favor usar chat <#${channelCommands}>`);

    let myStatus = await consultStatus(message.author.id);

    let userId = message.mentions.users.map((e) => e.id);

    if (userId.length <= 0)
      return message.channel.send(
        `<@${message.author.id}>, Você precisa indicar quem deseja roubar!`
      );

    if (userId.length > 1)
      return message.channel.send(
        `<@${message.author.id}>, Você só pode roubar uma pessoa por comando!`
      );

    let opponentStatus = await consultStatus(userId[0]);

    if (opponentStatus.data.id == myStatus.data.id)
      return message.channel.send(
        `<@${message.author.id}>, Você não pode roubar você mesmo!`
      );

    let isBot = await message.mentions.users.map((e) => e);
    if (isBot[0].bot)
      return message.channel.send(
        `<@${message.author.id}> ,Você não pode efetuar esse comando a um bot`
      );

    let cost = opponentStatus.data.level - myStatus.data.level;

    if (opponentStatus.data == "")
      return message.channel.send(`Usuario não localizado!`);

    cost = cost >= 0 ? 1 : cost;
    cost = cost < 0 ? -1 * cost : cost;

    cost = cost * 5;

    if (myStatus.data.stamina < cost)
      return message.channel.send(
        `<@${message.author.id}>, Você não possue stamina suficiente para efetuar um roubo.`
      );

    let staminaCost = myStatus.data.stamina - cost;
    staminaCost = staminaCost == 0 ? "0" : staminaCost;

    await updateRPG(message.author.id, {
      stamina: staminaCost,
    });

    let lucky = myStatus.data.luk - opponentStatus.data.int;
    let attributeUser = await hasElement(message, message.author.id);
    let attributeOpponent = await hasElement(message, userId[0]);
    let result;

    lucky = lucky < 0 ? 0 : lucky;
    lucky = lucky > 100 ? 100 : lucky;

    result = await resultElement(
      attributeUser.element,
      attributeOpponent.element
    );

    if (result == "Win") lucky = lucky * 2;
    if (result == "Lose") lucky = lucky / 2;

    let score = Math.floor(Math.random() * 101);

    if (lucky > score) {
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

      let profit;

      profit = Math.floor(
        (opponentStatus.data.coin *
          (myStatus.data.str - opponentStatus.data.dex)) /
          100
      );

      if (profit > 0) {
        let resultGame = await transfer({
          id_payer: userId[0],
          id_receive: message.author.id,
          value: profit,
        });

        if (resultGame.status != 201)
          return message.channel.send(`Erro interno`);

        message.channel.send(
          `<@${message.author.id}>, Roubado com sucesso, você conseguiu roubar ${profit}!`
        );
      } else {
        message.channel.send(
          `<@${message.author.id}>, Você até tentou roubar, porém não teve força suficiente para capturar moedas!`
        );
      }
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

      if (opponentStatus.data.agi > myStatus.data.agi) {
        let choice = opponentStatus.data.agi - myStatus.data.agi;
        let score = Math.floor(Math.random() * 101);

        choice = choice > 99 ? 99 : choice;

        if (score > choice)
          return message.channel.send(
            `<@${message.author.id}>, Cuidado, você foi quase pego roubando!`
          );
        else {
          await embedSpy(
            client,
            opponentStatus.data.id,
            message,
            myStatus.data,
            message.author.username
          );
          return message.channel.send(
            `<@${message.author.id}>, Você foi pego roubado!`
          );
        }
      } else return message.channel.send(`Falha no roubo!`);
    }
  },
};
