const express = require("express");
const router = express.Router();
const { auth } = require("../helpers/auth");

const rpg_controller = require("../controllers/rpg_controller");

router.get("/", auth, rpg_controller.findAll);
router.get("/:id", auth, rpg_controller.findOne);
router.post("/", auth, rpg_controller.insert);
router.put("/", auth, rpg_controller.update);
router.put("/stamina", auth, rpg_controller.stamina);
router.put("/stamina/:id", auth, rpg_controller.staminaOne);
router.delete("/:id", auth, rpg_controller.delete);

module.exports = router;
