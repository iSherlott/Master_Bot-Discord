const axios = require("axios");
const { urlDataBase, api_token } = require("../config/config.json");

module.exports = async (member) => {
  await axios({
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      token: api_token,
    },
    url: urlDataBase + "/" + member.user.id,
  });
};
