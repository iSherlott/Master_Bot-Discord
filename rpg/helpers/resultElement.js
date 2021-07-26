module.exports = (user, oponent) => {
  let element = ["Água", "Fogo", "Terra", "Ar", "Arcano", "Default"];

  let player_1 = element.indexOf(user);
  let player_2 = element.indexOf(oponent);

  let table = [];

  table.push(["Draw", "Win", "Lose", "Win", "Lose", "Win"]);
  table.push(["Lose", "Draw", "Win", "Lose", "Win", "Win"]);
  table.push(["Win", "Lose", "Draw", "Win", "Lose", "Win"]);
  table.push(["Lose", "Win", "Lose", "Draw", "Win", "Win"]);
  table.push(["Win", "Lose", "Win", "Lose", "Draw", "Win"]);
  table.push(["Lose", "Lose", "Lose", "Lose", "Lose", "Draw"]);

  return table[player_1][player_2];
};
