
const express = require('express');
const controller = require("../controllers/membersController");
const router = express.Router();

router.get("/", controller.getAllMembers);
router.post("/", controller.createMember);

module.exports = router;