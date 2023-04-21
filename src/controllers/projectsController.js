const Project = require('../models/Project');
const Type = require('../models/Type');
const Member = require('../models/Member');


exports.getAllProject = async (req, res) =>{
    const projects = await Project.findAll();
    res.json(projects);
};

//===== GET SPECIFIC PROJECT =====//
exports.getProjectById = async (req, res) =>{
    
    const { id } = req.params;
    console.log(id);
    try{
        const project = await Project.findByPk(id, {
            include: {
                model: Genre
            }
        });
        res.json(song);
    }catch (error){
        res.status(400).json({message : 'Error song not found', error});
    } 
};