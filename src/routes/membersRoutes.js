
const express = require('express');
const controller = require("../controllers/membersController");
const router = express.Router();
const auth = require("../middleware/auth");

//===== GET REQUESTS =====//
router.get("/", controller.getAllMembers);
router.get("/:id", controller.getMemberById);
router.get("/:name", controller.getMemberByName);
router.get("/follows/:id", controller.getFollowsById);

//===== POST REQUESTS =====//
router.post("/signup", controller.signUp);
router.post("/login", controller.login);
router.post("/follow/:id", auth, controller.followMember);


//===== DELETE REQUESTS =====//
router.delete("/delete/:id", auth, controller.deleteMemberById);
router.delete("/unfollow/:id", auth, controller.unfollowMember);

//===== UPDATE REQUESTS =====//
router.put("/updateName", auth, controller.updateNameById);

module.exports = router;