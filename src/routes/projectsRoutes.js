
const express = require('express');
const controller = require("../controllers/projectsController");
const router = express.Router();

//===== GET REQUESTS =====//
router.get("/", controller.getAllProject);
router.get("/:id", controller.getProjectById);
router.get("/name/:name", controller.getProjectByName);



//===== POST REQUESTS =====//
router.post("/", controller.createProject);
router.post("/addMember", controller.addMemberToProject);
//===== DELETE REQUESTS =====//
router.delete("/delete", controller.deleteProjectById);
router.delete("/deleteMember", controller.deleteMemberToProject);

//===== UPDATE REQUESTS =====//


module.exports = router;