
const express = require('express');
const controller = require("../controllers/songsController");
const router = express.Router();

//===== GET REQUESTS =====//
router.get("/", controller.getAllSong);
router.get("/:id", controller.getSongById);
router.get("/:name", controller.getSongByName);


//===== POST REQUESTS =====//
router.post("/", controller.createSong);

//===== DELETE REQUESTS =====//
router.delete("/delete", controller.deleteSongById);

//===== UPDATE REQUESTS =====//
router.put("/updateName", controller.updateSongNameById);

module.exports = router;