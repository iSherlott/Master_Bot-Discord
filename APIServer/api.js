const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const users = require("./routers/users");
const wallet = require("./routers/wallet");
const shop = require("./routers/shop");
const award = require("./routers/award");
const settings = require("./routers/settings");
const rpg = require("./routers/rpg");
const rank = require("./routers/rank");
const path = require("path");
const { PORT } = require("../config.json")

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

app.use("/users", users);
app.use("/wallet", wallet);
app.use("/shop", shop);
app.use("/award", award);
app.use("/rpg", rpg);
app.use("/rank", rank);
app.use("/settings", settings);

app.use("/:id", (req, res) => {
  res.status(404).json(`Router ${req.params.id} não localizada`);
});

app.listen(PORT, () => console.log(`Server running in port ${PORT}`));
