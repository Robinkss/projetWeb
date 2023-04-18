
const express = require('express');
const controller = require("../controllers/membersController");
const router = express.Router();

//===== GET REQUESTS =====//
router.get("/", controller.getAllMembers);
router.get("/:id", controller.getMemberById);
router.get("/:name", controller.getMemberByName);
router.get("/follows/:id", controller.getFollowsById);

//===== POST REQUESTS =====//
router.post("/", controller.createMember);
router.post("/follow/:id", controller.followMember);
router.post("/unfollow/:id", controller.unfollowMember);

//===== DELETE REQUESTS =====//
router.delete("/delete", controller.deleteMemberById);

//===== UPDATE REQUESTS =====//
router.put("/updateName", controller.updateNameById);

module.exports = router;