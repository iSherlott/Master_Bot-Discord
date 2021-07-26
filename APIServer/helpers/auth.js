const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  const token = req.headers["token"];

  if (!token)
    return res.status(401).json({ auth: false, msg: `token obrigatório` });

  jwt.verify(token, "AnotherBotLib", (error, decode) => {
    if (error)
      return res.status(401).json({ auth: false, msg: `token obrigatório` });
    next();
  });
};
