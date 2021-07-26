const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db/database.db");
const selectDB = "users";

exports.find = async (req, res) => {
  try {
    let query;
    let limit = req.query.limit ? req.query.limit : 100;
    let order = req.query.order ? req.query.order.toUpperCase() : "DISABLE";

    if (
      typeof limit != "number" &&
      !(order == "ASC" || order == "DESC" || order == "DISABLE")
    )
      return res.status(400).json(`Body invalid`);

    if (order == "DISABLE") query = `SELECT id, coin FROM users LIMIT ${limit}`;
    else
      query = `SELECT id, coin FROM users ORDER BY coin ${order} LIMIT ${limit}`;

    await db.all(query, (error, rows) => {
      if (error) return res.status(502).json(`Falha na requisição`);
      return res.status(200).json(rows);
    });
  } catch (error) {
    return res.status(500).json(`Erro interno.`);
  }
};

exports.balance = async (req, res) => {
  try {
    await db.all(
      `SELECT id, coin FROM users WHERE id = (?)`,
      req.query.id,
      (error, rows) => {
        if (error) return res.status(502).json(`Falha na requisição`);
        if (rows.length == 0)
          return res.status(406).json(`Usuário não encontrado`);

        return res.status(200).json(rows[0]);
      }
    );
  } catch (error) {
    return res.status(500).json(`Erro Interno.`);
  }
};

exports.pay = async (req, res) => {
  try {
    if (!req.body.id || !req.body.pay || typeof req.body.pay != "number")
      return res.status(400).json(`Body invalid`);

    await db.all(
      `SELECT id, coin FROM users WHERE id = (?)`,
      req.body.id,
      (error, rows) => {
        if (error) return res.status(502).json(`Falha na requisição`);
        if (rows.length == 0)
          return res.status(406).json(`Usuário não localizado`);
        if (rows[0].coin - req.body.pay < 0)
          return res.status(406).json(`Saldo insuficiente`);

        let pay = db.prepare(
          `UPDATE users SET coin = coin - (?) WHERE id = (?)`,
          req.body.pay,
          req.body.id
        );
        pay.run();
        pay.finalize();
        res.status(201).json(`Pagamento efetuado com sucesso.`);
      }
    );
  } catch (error) {
    return res.status(500).json(`Erro interno.`);
  }
};

exports.receive = async (req, res) => {
  try {
    if (
      !req.body.id ||
      !req.body.receive ||
      typeof req.body.receive != "number"
    )
      return res.status(400).json(`Body inválido`);

    await db.all(
      `SELECT id, coin FROM users WHERE id = (?)`,
      req.body.id,
      (error, rows) => {
        if (error) return res.status(502).json(`Falha na requisição`);
        if (rows.length == 0)
          return res.status(406).json(`Usuário não localizado`);

        let receive = db.prepare(
          `UPDATE users SET coin = coin + (?) WHERE id = (?)`,
          req.body.receive,
          req.body.id
        );
        receive.run();
        receive.finalize();
        res.status(201).json(`Recebimento de valor efetuado com sucesso.`);
      }
    );
  } catch (error) {
    return res.status(500).json(`Erro interno.`);
  }
};

exports.transfer = async (req, res) => {
  try {
    if (
      !req.body.id_payer ||
      !req.body.id_receive ||
      !req.body.value ||
      typeof req.body.value != "number"
    )
      return res.status(400).json("Body inválido");

    await db.all(
      `SELECT id, coin FROM users WHERE id = (?) OR id = (?)`,
      req.body.id_payer,
      req.body.id_receive,
      (error, rows) => {
        if (!rows[0] || !rows[1])
          return res.status(400).json(`Usuário não localizado`);

        if (rows[0].id == req.body.id_payer) {
          if (rows[0].coin - req.body.value < 0)
            return res.status(406).json(`Falha na requisição`);
        } else if (rows[1].id == req.body.id_payer) {
          if (rows[1].coin - req.body.value < 0)
            return res.status(406).json(`Falha na requisição`);
        } else res.status(400).json(`Usuário não localizado`);

        let pay = db.prepare(
          `UPDATE users SET coin = coin - (?) WHERE id = (?)`,
          req.body.value,
          req.body.id_payer
        );
        pay.run();
        pay.finalize();

        let receive = db.prepare(
          `UPDATE users SET coin = coin + (?) WHERE id = (?)`,
          req.body.value,
          req.body.id_receive
        );
        receive.run();
        receive.finalize();

        res.status(201).json(`Procedimento realizado com sucesso.`);
      }
    );
  } catch (error) {
    return res.status(500).json(`Erro interno.`);
  }
};

exports.daily = async (req, res) => {
  try {
    if (!req.params.id) return res.status(400).json("Body inválido");

    await db.all(
      `SELECT name_award, prize_award FROM awards WHERE name_award = 'daily'`,
      async (error, rows) => {
        if (error) return res.status(502).json(`Falha na requisição`);
        if (!rows[0]) return res.status(400).json(`Daily não localizado`);

        await db.all(
          `SELECT id, daily, coin, date(daily, '+1 days') available_date FROM ${selectDB} WHERE id = (?) AND daily <= date('now', 'localtime')`,
          req.params.id,
          async (anotherError, anotherRows) => {
            if (anotherError)
              return res.status(502).json(`Falha na requisição`);
            if (anotherRows[0]) {
              let update = db.prepare(
                `UPDATE ${selectDB} SET coin = coin + (?), daily = date('now', 'localtime', '+1 days') WHERE id = (?);`,
                rows[0].prize_award,
                req.params.id
              );
              update.run();
              update.finalize();
              anotherRows[0][`prize_award`] = rows[0].prize_award;
              anotherRows[0][`coin`] += rows[0].prize_award;
              return res.status(201).json(anotherRows[0]);
            } else {
              await db.all(
                `SELECT id, daily, coin FROM ${selectDB} WHERE id = (?)`,
                req.params.id,
                (_error, _rows) => {
                  if (_error)
                    return res.status(502).json(`Falha na requisição`);
                  _rows[0][`prize_award`] = rows[0].prize_award;
                  _rows[0][`coin`] += rows[0].prize_award;
                  return res.status(202).json(_rows[0]);
                }
              );
            }
          }
        );
      }
    );
  } catch (error) {
    return res.status(500).json(`Erro interno.`);
  }
};

exports.fortune = async (req, res) => {
  try {
    if (
      !req.body.id ||
      !req.body.fortune ||
      typeof req.body.fortune != "number"
    )
      return res.status(400).json("Body inválido");

    await db.all(
      `SELECT id, fortune, coin, datetime(fortune, '+1 hours') available_time FROM ${selectDB} WHERE id = (?) AND datetime(fortune, '+1 hours') >= datetime('now', 'localtime')`,
      req.body.id,
      async (error, rows) => {
        if (error) return res.status(502).json(`Falha na requisição`);
        if (rows[0]) return res.status(202).json(rows[0]);
        else {
          await db.all(
            `SELECT id, fortune, coin FROM ${selectDB} WHERE id = (?)`,
            req.body.id,
            (anotherError, anotherRows) => {
              if (anotherError)
                return res.status(502).json(`Falha na requisição`);
              if (anotherRows[0]) {
                let update = db.prepare(
                  `UPDATE ${selectDB} SET coin = coin + (?), fortune = datetime('now', 'localtime') WHERE id = (?);`,
                  req.body.fortune,
                  req.body.id
                );
                update.run();
                update.finalize();

                anotherRows[0].coin = anotherRows[0].coin + req.body.fortune;
                return res.status(201).json(anotherRows[0]);
              }
            }
          );
        }
      }
    );
  } catch (error) {
    return res.status(500).json(`Erro interno.`);
  }
};
