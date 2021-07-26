const { tag } = require("../config/config.json");
const claim = require("./claim");
const multiClaim = require("./multiClaim");

const channelIds = require("../helpers/idAllMessage");

module.exports = async (client) => {
  // const channel = await client.channels.fetch(tag);
  // await channel.send(`Categoria`);

  ids = await channelIds(client, tag);
  newIds = ids.map(function (item) {
    return item.id;
  });

  newIds.reverse();

  await claim(client, newIds[0], "Gênero", {
    malesign: "Masculino",
    femaleSign: "Feminino",
    naoBinario: "Não-Binário",
  });
  await multiClaim(client, newIds[1], "Programming language", {
    python: "Python",
    javascript: "Javascript",
    java: "Java",
    ruby: "Ruby",
    cSharp: "C#",
  });
  await claim(client, newIds[2], "Orientação Sexual", {
    heterossexual: "Homossexual",
    homossexual: "Heterossexual",
    pansexual: "Pansexual",
    bissexual: "Bissexual",
    furry: "Furry",
    desativado: "Sexualmente Desativado",
    hcpatack: "Helicóptero de Ataque",
  });
  await claim(client, newIds[3], "Status", {
    solteiro: "Solteiro",
    namorando: "Namorando",
    casado: "Casado",
    enrolado: "Enrolado",
    off: "Desativado por Inutilidade",
  });
  await multiClaim(client, newIds[4], "Games", {
    minecraft: "Minecraft",
    cs_go: "CS:GO",
    valorant: "Valorant",
  });
};
