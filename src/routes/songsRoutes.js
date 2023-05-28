
const express = require('express');
const controller = require("../controllers/songsController");
const auth = require("../middleware/auth");
const multer = require("multer");
const router = express.Router();
const upload = multer({ dest: "uploads/" });

//===== GET REQUESTS =====//
router.get("/", controller.getAllSong);
router.get("/:id", controller.getSongById);
router.get("/name/:name", controller.getSongByName);
router.get("/:id/project", controller.getSongProjectById)


//===== POST REQUESTS =====//
router.post("/create", auth, controller.createSong);
router.post("/upload/:id", auth, upload.fields([{name: "songImage", maxCount: 1 }, { name: "song", maxCount: 1 }]), controller.uploadSongFiles )

//router.post("/addGenre", controller.addGenreToSong);
//router.post("/addMember", controller.addMemberToSong);

//===== DELETE REQUESTS =====//
router.delete("/delete", controller.deleteSongById);
//router.delete("/deleteGenre", controller.deleteGenreToSong);
router.delete("/deleteMember", controller.deleteMemberToSong);

//===== UPDATE REQUESTS =====//
router.put("/updateName", controller.updateSongNameById);

module.exports = router;