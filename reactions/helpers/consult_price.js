const axios = require("axios");
const { urlDataBase, api_token, PORT } = require("../../config.json");

module.exports = async (product) => {
  return new Promise(async (res, rej) => {
    try {
      let item = Object.keys(product);
      const result = await axios({
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: api_token,
        },
        url: `${urlDataBase}${PORT}/shop?${item}=${product[item]}`,
      });

      if (result.status == 200)
        res({ status: result.status, data: result.data });
    } catch (error) {
      res({ status: 500, data: `Erro interno` });
    }
  });
};
