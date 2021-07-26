const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db/database.db");
const selectDB = "settings";
const id = "server_id";

exports.find = async (req, res) => {
  if (!req.query.id) return res.status(400).json(`Favor informa o ${id}`);

  res.json(req.query.id);
};

exports.insert = async (req, res) => {
  if (
    !req.body.server_id ||
    !req.body.type_definition ||
    !req.body.definition_info
  )
    return res.status(400).json(`Body inválid`);

  res.json(req.body);
};

exports.update = async (req, res) => {};

exports.delete = async (req, res) => {};
