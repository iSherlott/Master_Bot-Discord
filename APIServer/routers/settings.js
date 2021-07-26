const express = require("express");
const router = express.Router();
const { auth } = require("../helpers/auth");

const settings_controller = require("../controllers/settings_controller");

router.get("/", auth, settings_controller.find);
router.post("/", auth, settings_controller.insert);
router.put("/:id", auth, settings_controller.update);
router.delete("/:id", auth, settings_controller.delete);

module.exports = router;
