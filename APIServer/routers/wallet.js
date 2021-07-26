const express = require("express");
const router = express.Router();
const { auth } = require("../helpers/auth");

const wallet_controller = require("../controllers/wallet_controller");

router.get("/", auth, wallet_controller.find);
router.get("/balance", auth, wallet_controller.balance);
router.post("/pay", auth, wallet_controller.pay);
router.post("/receive", auth, wallet_controller.receive);
router.post("/transfer", auth, wallet_controller.transfer);
router.put("/daily/:id", auth, wallet_controller.daily);
router.put("/fortune", auth, wallet_controller.fortune);

module.exports = router;
