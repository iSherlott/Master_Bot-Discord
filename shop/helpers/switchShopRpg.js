const updateStamina = require("../helpers/updateStamina");
const updateRPG = require("../helpers/updateRPG");

module.exports = async (opc, userId, myStatus) => {
  switch (opc) {
    case "stamina":
      await updateStamina();
      break;
    case "points":
      await updateRPG(userId, { points: myStatus.data.points + 1 });
      break;
    case "restore":
      let total = -6;
      total += myStatus.data.str;
      total += myStatus.data.agi;
      total += myStatus.data.vit;
      total += myStatus.data.int;
      total += myStatus.data.dex;
      total += myStatus.data.luk;
      total += myStatus.data.points;
      await updateRPG(userId, {
        str: 1,
        agi: 1,
        vit: 1,
        int: 1,
        dex: 1,
        luk: 1,
        points: total,
      });
      break;
  }
};
