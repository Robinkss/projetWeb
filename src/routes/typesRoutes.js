
const express = require('express');
const controller = require("../controllers/typeController");
const router = express.Router();

//===== GET REQUESTS =====//
router.get("/", controller.getAllType);
router.get("/:id", controller.getTypeById);
router.get("/name/:name", controller.getTypeByName);



//===== POST REQUESTS =====//
router.post("/", controller.createType);

//===== DELETE REQUESTS =====//
router.delete("/delete", controller.deleteTypeById);

//===== UPDATE REQUESTS =====//
router.put("/updateName", controller.updateTypeNameById);

module.exports = router;