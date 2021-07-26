const axios = require("axios");
const { urlDataBase, api_token, PORT } = require("../../config.json");

module.exports = async (body) => {
  return new Promise(async (res, rej) => {
    try {
      const result = await axios({
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: api_token,
        },
        data: body,
        url: `${urlDataBase}${PORT}/award`,
      });

      if (result.status == 200)
        res({ status: result.status, data: result.data });
    } catch (error) {
      res({ status: 500, data: `Erro interno` });
    }
  });
};
