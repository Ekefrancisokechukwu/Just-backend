const express = require("express");
const {
  createTip,
  getAllTip,
  getTipByLanguage,
} = require("../controllers/tip");

const router = express.Router();

router.route("/").post(createTip).get(getAllTip);

router.route("/language/:language").get(getTipByLanguage);

module.exports = router;
