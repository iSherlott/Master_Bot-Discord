const setCommands = [];

const jsonCommandsOwner = {
  clearall: "apaga todas as messages no channel que foi executado o comando.",
};

const jsonCommandsSupport = {
  disconnect: "Desconecta a pessoa que está dentro do parâmetro.",
  support: "Envia você e todos que passou no parâmetro para sua sala oculta.",
  test: "test de comando.",
};

const jsonCommandsMember = {
  help:
    "Obtem informação de todos os comandos que você tem permissão de acesso.",
  info:
    "Passe como parâmetro o comando para obter informações sobre o comando.",
  hit: "Envia um gif aleatorio dando um soco em quem você mencionar.",
  hug: "Envia um gif aleatorio dando um abraço em quem você mencionar.",
  kiss: "Envia um gif aleatorio dando um beijo em quem você mencionar.",
  kick: "Envia um gif aleatorio dando um chute em quem você mencionar.",
  killtarget: "faz o target feliz!!!",
  nickname: "Utilize essa função para trocar o seu nome",
  lucky:
    "Teste sua sorte, se o special play estiver em um canal de voz, você ganha 10 000 Sugar. isso ira lhe custar 500 Sugar.",
  status: "Te envia os seus status do Heroine.",
  "str+": "Aumenta seus pontos de Força.",
  "agi+": "Aumenta seus pontos de Agilidade.",
  "int+": "Aumenta seus pontos de Inteligencia.",
  "vit+": "Aumenta seus pontos de Vitalidade.",
  "dex+": "Aumenta seus pontos de Destreza.",
  "luk+": "Aumenta seus pontos de Sorte.",
  assault: "Rouba o alvo mencionado.",
  daily: "Obtenha moedas diariamente.",
  fortune: "Obtenha moedas a cada 1h.",
  wallet: "Informa quantas moedas tem em sua conta.",
  roulette:
    "Desconecta uma pessoa aleatoria do canal de voz que você se encontra.",
};

const jsonCommands = Object.assign(
  {},
  jsonCommandsOwner,
  jsonCommandsSupport,
  jsonCommandsMember
);
exports.jsonCommands = jsonCommands;

for (let key in jsonCommands) setCommands.push(key);
exports.setCommands = setCommands;

exports.jsonCommandsOwner = Object.assign(
  {},
  jsonCommandsOwner,
  jsonCommandsSupport,
  jsonCommandsMember
);

exports.jsonCommandsSupport = Object.assign(
  {},
  jsonCommandsSupport,
  jsonCommandsMember
);
exports.jsonCommandsMember = jsonCommandsMember;
