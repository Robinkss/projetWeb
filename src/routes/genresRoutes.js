
const express = require('express');
const controller = require("../controllers/genreController");
const router = express.Router();

//===== GET REQUESTS =====//
router.get("/", controller.getAllGenre);
router.get("/:id", controller.getGenreById);
router.get("/name/:name", controller.getGenreByName);
router.get("/:id/project", controller.getSongsOfGenre);


//===== POST REQUESTS =====//
router.post("/", controller.createGenre);

//===== DELETE REQUESTS =====//
router.delete("/delete", controller.deleteGenreById);

//===== UPDATE REQUESTS =====//
router.put("/updateName", controller.updateGenreNameById);

module.exports = router;