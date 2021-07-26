const { channelShop } = require("../config/config.json");

const consultPrice = require("../helpers/consultPrice");
const formatCoin = require("../helpers/formatCoin");
const channelIds = require("../helpers/idAllMessage");

const claim = require("./claim");
const multiClaim = require("./multiClaim");
const cliamItem = require("./claimItem");

module.exports = async (client) => {
  // const channel = await client.channels.fetch(channelShop);
  // channel.send(`new catalog`);

  ids = await channelIds(client);
  newIds = ids.map(function (item) {
    return item.id;
  });

  newIds.reverse();

  let color = await consultPrice({ item_name: "color" });
  let point = await consultPrice({ item_name: "points" });
  let element = await consultPrice({ item_name: "element" });
  let restore = await consultPrice({ item_name: "restore" });
  let stamina_restorer = await consultPrice({ item_name: "stamina_restorer" });

  await claim(
    client,
    newIds[0],
    "color",
    `Selecione a cor que deseja a ser atribuida a seu discord, isso ira lhe custar somente ${formatCoin(
      color.data.price
    )} Sugar`,
    {
      yellow: "Yellow",
      blue: "Blue",
      white: "White",
      orange: "Orange",
      brown: "Brown",
      violet: "Violet",
      green: "Green",
      red: "Red",
    },
    color.data.price
  );
  await claim(
    client,
    newIds[1],
    "color",
    `Selecione o elemento que deseja a ser atribuida a seu discord, isso ira lhe custar somente ${formatCoin(
      element.data.price
    )} Sugar`,
    {
      agua: "Água",
      fogo: "Fogo",
      terra: "Terra",
      ar: "Ar",
      arcano: "Arcano",
    },
    element.data.price
  );
  await cliamItem(
    client,
    newIds[2],
    `Selecione o item que deseja a ser atribuida a seu discord`,
    {
      stamina: "Poção de Stamina",
      points: "Poção de 1 Ponto",
      restore: "Resetar Pontos",
    },
    {
      stamina: stamina_restorer.data.price,
      points: point.data.price,
      restore: restore.data.price,
    },
    {
      stamina: "",
      points: "Seu level x",
      restore: "",
    }
  );
};
