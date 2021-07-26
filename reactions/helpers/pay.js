const axios = require("axios");
const { urlDataBase, api_token } = require("../config/config.json");
const consult_price = require("./consult_price");

module.exports = async (product, authorId) => {
  return new Promise(async (res, rej) => {
    await consult_price(product).then(async (item) => {
      try {
        const result = await axios({
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: api_token,
          },
          data: { id: authorId, pay: item.data.price },
          url: `${urlDataBase}/wallet/pay`,
        });

        if (result.status == 201)
          res({ status: result.status, data: result.data });
      } catch (error) {
        res({ status: 500, data: `Erro interno` });
      }
    });
  });
};
