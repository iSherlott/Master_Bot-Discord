const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db/database.db");
const selectDB = "users";
const id = "id";

exports.find = async (req, res) => {
  try {
    if (!req.query.id) return res.status(400).json(`Favor informa o ${id}`);

    db.all(
      `SELECT * FROM ${selectDB} WHERE ${id} = (?)`,
      req.query.id,
      (error, rows) => {
        if (error) return res.status(502).json(`Erro na requisição`);
        if (rows.length == 0)
          return res.status(406).json(`usuário não localizado`);

        res.status(200).json(rows[0]);
      }
    );
  } catch (error) {
    res.status(500).json(`Erro interno`);
  }
};

exports.insert = async (req, res) => {
  try {
    if (!req.body.id) return res.status(400).json(`Favor informa o ${id}`);

    db.all(
      `SELECT * FROM ${selectDB} WHERE ${id} = (?)`,
      req.body.id,
      (error, rows) => {
        if (error) return res.status(502).json(`Erro na requisição`);
        if (rows.length == 1)
          return res.status(406).json(`Esse usuário já existente`);

        let insert = db.prepare(
          `INSERT INTO ${selectDB} (${id}) VALUES (?);`,
          req.body.id
        );
        insert.run();
        insert.finalize();

        res.status(201).json(`Usuario cadastrado com sucesso!`);
      }
    );
  } catch (error) {
    res.status(500).json(`Erro interno`);
  }
};

exports.update = async (req, res) => {
  try {
    if (!req.query.id) return res.status(400).json(`Favor informa o ${id}`);
    if (
      !(
        req.body.daily ||
        req.body.fortune ||
        req.body.coin ||
        req.body.exp ||
        req.body.level ||
        req.body.spouse
      )
    )
      return res.status(400).json(`Body da requisição inválido`);

    db.all(
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

exports.delete = async (req, res) => {
  try {
    if (!req.params.id) return res.status(400).json(`Favor informa o ${id}`);

    db.all(
      `SELECT id FROM ${selectDB} WHERE ${id} = ${req.params.id}`,
      (error, rows) => {
        if (error) return res.status(502).json(`Erro na requisição`);
        if (rows.length == 0)
          return res.status(406).json(`usuário não localizado`);

        let del = db.prepare(
          `DELETE FROM ${selectDB} WHERE ${id} = ${req.params.id}`
        );
        del.run();
        del.finalize();
        res.status(201).json(`Usuario deletado com sucesso!`);
      }
    );
  } catch (error) {
    res.status(500).json(`Erro interno`);
  }
};
