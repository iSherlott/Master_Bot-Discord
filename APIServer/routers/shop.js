const express = require("express");
const router = express.Router();
const { auth } = require("../helpers/auth");

const shop_controller = require("../controllers/shop_controller");

router.get("/", auth, shop_controller.find);
router.post("/", auth, shop_controller.insert);
router.put("/:id", auth, shop_controller.update);
router.delete("/:id", auth, shop_controller.delete);

module.exports = router;
