const express = require("express");
const router = express.Router();
const { auth } = require("../helpers/auth");

const award_controller = require("../controllers/award_controller");

router.get("/", auth, award_controller.findOne);
router.post("/", auth, award_controller.insert);
router.put("/:id", auth, award_controller.update);
router.delete("/:id", auth, award_controller.delete);

module.exports = router;
