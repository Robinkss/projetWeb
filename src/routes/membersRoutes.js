
const express = require('express');
const controller = require("../controllers/membersController");
const router = express.Router();
const auth = require("../middleware/auth");

//===== GET REQUESTS =====//
router.get("/", controller.getAllMembers);
router.get("/:id", controller.getMemberById);
router.get("/:name", controller.getMemberByName);
router.get("/follows/:id", auth, controller.getFollowsById);
router.get("/songs/:id", controller.getAllMemberSongsById);
router.get("/isFollow/:userId/:isFollowed", auth, controller.isFollow);
router.get("/image/:id_user", controller.getImageById);

//===== POST REQUESTS =====//
router.post("/signup", controller.signUp);
router.post("/login", controller.login);
router.post("/follow", auth, controller.followMember);


//===== DELETE REQUESTS =====//
router.delete("/delete/:id", auth, controller.deleteMemberById);
router.delete("/unfollow", auth, controller.unfollowMember);

//===== UPDATE REQUESTS =====//
router.put("/updateName", auth, controller.updateNameById);
router.put("/updatePassword", auth, controller.updatePasswordById);
router.put("/updateMail", auth, controller.updateMailById);
router.put("/updateDescription", auth, controller.updateDescriptionById);

module.exports = router;