const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db/database.db");
const selectDB = "ranks";
const id = "rank_id";

exports.findOne = async (req, res) => {};

exports.findAll = async (req, res) => {};

exports.ukufa = async (req, res) => {
  try {
    if (!req.query.id) return res.status(400).json(`Favor informa o ${id}`);

    db.all(
      `SELECT rank_id, ukufa FROM ${selectDB} WHERE ${id} = (?) AND NOT ukufa = date('now', 'localtime')`,
      req.query.id,
      (error, rows) => {
        if (error) return res.status(502).json(`Erro na requisição`);
        if (rows.length == 0)
          return res.status(201).json(`Nenhum rank se enquadra ao requisição!`);

        res.status(200).json(rows[0]);
      }
    );
  } catch (error) {
    res.status(500).json(`Erro interno`);
  }
};

exports.insert = async (req, res) => {};

exports.roulette = async (req, res) => {
  try {
    let updateRoulette = db.prepare(
      `UPDATE ranks SET kill_roulette = kill_roulette + 1 WHERE ${id} = (?)`,
      req.body.id
    );
    updateRoulette.run();
    updateRoulette.finalize();

    res.status(201).json(`Update efetuada com sucesso`);
  } catch (error) {
    res.status(500).json(`Erro interno`);
  }
};

exports.updateUkufa = async (req, res) => {
  try {
    if (!req.query.id) return res.status(400).json(`Favor informa o ${id}`);

    await db.all(
      `SELECT id FROM users WHERE id = (?)`,
      req.query.id,
      (error, rows) => {
        if (error) return res.status(502).json(`Erro na requisição`);

        if (rows.length == 0)
          return res.status(406).json(`Rank não localizado`);

        let update = db.prepare(
          `UPDATE ${selectDB} SET ukufa = date('now', 'localtime') WHERE rank_id = (?)`,
          req.query.id
        );
        update.run();
        update.finalize();

        res.status(201).json(`Data atualizado com sucesso!`);
      }
    );
  } catch (error) {
    res.status(500).json(`Erro interno`);
  }
};

exports.update = async (req, res) => {
  try {
    if (!req.params.id) return res.status(400).json(`Favor informa o ${id}`);
    if (!(req.body.ukufa || req.body.kill || req.body.kill_roulette))
      return res.status(400).json(`Body da requisição inválido`);

    await db.all(
      `SELECT * FROM ${selectDB} WHERE ${id} = (?)`,
      req.params.id,
      (error, rows) => {
        if (error) return res.status(502).json(`Erro na requisição`);
        if (rows.length == 0)
          return res.status(406).json(`Rank não localizado`);

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

exports.delete = async (req, res) => {};
