const axios = require("axios");
const { urlDataBase, api_token, PORT } = require("../../config.json");

module.exports = async (userId, value) => {
  return new Promise(async (res, rej) => {
    try {
      const result = await axios({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: api_token,
        },
        data: { id: userId, receive: value },
        url: `${urlDataBase}${PORT}/wallet/receive`,
      });
      if (result.status == 201)
        res({ status: result.status, data: result.data });
    } catch (error) {
      res({ status: 500, data: `Erro interno` });
    }
  });
};
