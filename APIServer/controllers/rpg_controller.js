const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db/database.db");
const selectDB = "rpg";
const id = "rpg_id";

exports.findAll = async (req, res) => {
  try {
    await db.all(`SELECT * FROM ${selectDB}`, (error, rows) => {
      if (error) return res.status(502).json(`Erro na requisição`);
      res.status(200).json(rows);
    });
  } catch (error) {
    res.status(500).json(`Erro interno`);
  }
};

exports.findOne = async (req, res) => {
  try {
    if (!req.params.id && !(typeof req.params.id == "number"))
      return res.status(400).json(`Body da requisição inválido`);

    await db.all(
      `SELECT * FROM ${selectDB} INNER JOIN users ON rpg.rpg_id = users.id WHERE ${id} = ${req.params.id}`,
      (error, rows) => {
        if (error) return res.status(502).json(`Erro na requisição`);
        res.status(200).json(rows[0]);
      }
    );
  } catch (error) {
    res.status(500).json(`Erro interno`);
  }
};

exports.insert = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json(`Erro interno`);
  }
};

exports.update = async (req, res) => {
  try {
    if (!req.query.id) return res.status(400).json(`Favor informa o ${id}`);
    if (
      !(
        req.body.str ||
        req.body.agi ||
        req.body.vit ||
        req.body.int ||
        req.body.dex ||
        req.body.luk ||
        req.body.stamina ||
        req.body.points
      )
    )
      return res.status(400).json(`Body da requisição inválido`);

    await db.all(
      `SELECT * FROM ${selectDB} WHERE ${id} = (?)`,
      req.query.id,
      (error, rows) => {
        if (error) return res.status(502).json(`Erro na requisição`);
        if (rows.length == 0)
          return res.status(406).json(`usuário não localizado`);

        if (Object.keys(req.body).includes(id))
          return res.status(403).json(`Campo ${id} Não pode ser alterado`);

        for (let key of Object.keys(req.body)) {
          let update = db.prepare(
            `UPDATE ${selectDB} SET ${key} = (?) WHERE ${id} = (?);`,
            req.body[key],
            rows[0][id]
          );
          update.run();
          update.finalize();
        }
        return res.status(201).json(`Atualizado com sucesso!`);
      }
    );
  } catch (error) {
    res.status(500).json(`Erro interno`);
  }
};

exports.stamina = async (req, res) => {
  try {
    await db.all(
      `UPDATE ${selectDB} SET stamina = stamina_max WHERE 1 = 1`,
      (error, rows) => {
        if (error) return res.status(502).json(`Erro na requisição`);
        res.status(201).json(`Update efetuado com sucesso`);
      }
    );
  } catch (error) {
    res.status(500).json(`Erro interno`);
  }
};

exports.stamina = async (req, res) => {
  try {
    await db.all(
      `UPDATE ${selectDB} SET stamina = stamina_max WHERE 1 = 1`,
      (error, rows) => {
        if (error) return res.status(502).json(`Erro na requisição`);
        res.status(201).json(`Update efetuado com sucesso`);
      }
    );
  } catch (error) {
    res.status(500).json(`Erro interno`);
  }
};

exports.staminaOne = async (req, res) => {
  try {
    await db.all(
      `UPDATE ${selectDB} SET stamina = stamina_max WHERE ${id} = (?)`,
      req.params.id,
      (error, rows) => {
        if (error) return res.status(502).json(`Erro na requisição`);
        res.status(201).json(`Update efetuado com sucesso`);
      }
    );
  } catch (error) {
    res.status(500).json(`Erro interno`);
  }
};

exports.delete = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json(`Erro interno`);
  }
};
