
const express = require('express');
const controller = require("../controllers/membersController");
const router = express.Router();

//===== GET REQUESTS =====//
router.get("/", controller.getAllMembers);
router.get("/:id", controller.getMemberById);
router.get("/:name", controller.getMemberByName);
router.get("/follows/:id", controller.getFollowsById);

//===== POST REQUESTS =====//
router.post("/signup", controller.signUp);
router.post("/login", controller.login);
router.post("/follow/:id", controller.followMember);


//===== DELETE REQUESTS =====//
router.delete("/delete", controller.deleteMemberById);
router.delete("/unfollow/:id", controller.unfollowMember);

//===== UPDATE REQUESTS =====//
router.put("/updateName", controller.updateNameById);

module.exports = router;