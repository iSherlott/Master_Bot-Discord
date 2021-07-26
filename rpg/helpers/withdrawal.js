const axios = require("axios");
const { urlDataBase, api_token, PORT } = require("../../config.json");

module.exports = async (authorId, value) => {
  return new Promise(async (res, rej) => {
    try {
      const result = await axios({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: api_token,
        },
        data: { id: authorId, pay: value },
        url: `${urlDataBase}${PORT}/wallet/pay`,
      });

      if (result.status == 201) return res(true);
      else return false;
    } catch (error) {
      if (error) return res(false);
      res({ status: 500, data: `Erro interno` });
    }
  });
};
