const axios = require("axios");
const { urlDataBase, api_token } = require("../config/config.json");

module.exports = async (member) => {
  await axios({
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: api_token,
    },
    data: { id: member.user.id },
    url: urlDataBase,
  });
};
