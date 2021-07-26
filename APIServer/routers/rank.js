const express = require("express");
const router = express.Router();
const { auth } = require("../helpers/auth");

const rank_controller = require("../controllers/rank_controller");

router.get("/ukufa", auth, rank_controller.ukufa);
router.get("/", auth, rank_controller.findAll);
router.get("/:id", auth, rank_controller.findOne);
router.post("/", auth, rank_controller.insert);
router.put("/", auth, rank_controller.update);
router.put("/roulette", auth, rank_controller.roulette);
router.put("/ukufa", auth, rank_controller.updateUkufa);
router.delete("/:id", auth, rank_controller.delete);

module.exports = router;
