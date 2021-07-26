const axios = require("axios");
const { urlDataBase, api_token, PORT } = require("../../config.json");

module.exports = async (id, update) => {
  return new Promise(async (res, rej) => {
    try {
      const result = await axios({
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: api_token,
        },
        data: update,
        url: `${urlDataBase}${PORT}/rpg?id=${id}`,
      });

      if (result.status == 201)
        res({ status: result.status, data: result.data });
    } catch (error) {
      res({ status: 500, data: `Erro interno` });
    }
  });
};
