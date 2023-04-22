const Project = require('../models/Project');
const Type = require('../models/Type');
const Member = require('../models/Member');
const MemberParticipateProject = require('../models/MemberParticipateProject');


exports.getAllProject = async (req, res) =>{
    const projects = await Project.findAll();
    res.json(projects);
};

//===== GET SPECIFIC PROJECT =====//
exports.getProjectById = async (req, res) =>{
    
    const { id } = req.params;
    
    try{
        const project = await Project.findByPk(id);
        res.json(project);
    }catch (error){
        res.status(400).json({message : 'Error project not found', error});
    } 
};

exports.getProjectByName = async (req, res) =>{
    
    const { name } = req.params;
    
    try{
        const project = await Project.findAll({
            where: {
                project_name: name
            }
        });
        res.json(project);
    }catch (error){
        res.status(400).json({message : 'Error project not found', error});
    } 
};


//=== CREATE A PROJECT ===//
exports.createProject = async (req, res) =>{
    const { name, date, cover, id_member, id_type } = req.body;

    try{
        const newProject = await Project.create({ 
            project_name: name,
            release_date: date,
            cover_path: cover,
            id_member: id_member,
            id_type: id_type
        });
        res.status(201).json(newProject);
    } catch (error){
        res.status(400).json({ message : 'Error creating project', error});
    }
};
//======================//

//=== DELETE A MEMBER ===//
exports.deleteProjectById = async (req, res) =>{
    const {id} = req.body;
    
    try{
        await Project.destroy({
            where: {
                id_project: id
            }
        })
        res.status(201).json({message : 'Project deleted'});
    }catch (error){
        res.status(400).json({ message : 'Error deleting project', error});
    }
};

//=== RELATIONAL REQUESTS ===//


//=== Add a member participation to a Project===//
exports.addMemberToProject = async (req, res) =>{
    const { id_member, id_project} = req.body;
    try{
        const memberParticipateProject = await MemberParticipateProject.create({ 
            id_member: id_member,
            id_project: id_project
        });
        res.status(201).json(memberParticipateProject);
    } catch (error){       
        res.status(400).json({ message : 'Error adding member participation to a project', error});
    }
};

//=== Delete a member participation to a Project===//
exports.deleteMemberToProject = async (req, res) =>{
    const { id_member, id_project} = req.body;
    try{
        const memberParticipateProject = await MemberParticipateProject.destroy({ 
            where: {
                id_member: id_member,
                id_project: id_project
            }
        });
        res.status(201).json(memberParticipateProject);
    } catch (error){       
        res.status(400).json({ message : 'Error deleting member participation to a project', error});
    }
};