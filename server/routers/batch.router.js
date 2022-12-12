const express = require("express");
const {
  addUpdate,
  addToUserUpdate
} = require("../controllers/userUpdates.controller");

const router = express.Router();

router.post("/update", addUpdate);
router.post("/userupdate",addToUserUpdate)

module.exports = router;
