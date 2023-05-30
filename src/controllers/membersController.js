const Member = require('../models/Member');
const MemberFollowMember = require('../models/MemberFollowMember');
const MemberCollaborateSong = require('../models/MemberCollaborateSong');
const MemberParticipateProject = require('../models/MemberParticipateProject');
const Song = require('../models/Song');
const songsController = require('./songsController');
const Project = require('../models/Project');
const {Sequelize, Op, where} = require('sequelize');
const db = require('../config/db');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const isemail = require("isemail");
const auth = require("../middleware/auth");
const path = require('path');
const fs = require('fs');




exports.getAllMembers = async (req, res) =>{
    const members = await Member.findAll({
        where : {
            admin: false
        }
    });
    res.json(members);
};

//===== GET SPECIFIC MEMBER =====//
exports.getMemberById = async (req, res) =>{
    
    const { id } = req.params;
    console.log(id);
    try{
        const member = await Member.findByPk(id);
        res.json(member);
    }catch (error){
        res.status(400).json({message : 'Error member not found', error});
    } 
};

exports.getMemberByName = async (req, res) =>{
    const { name } = req.params;
    console.log(name);
    try{
        const member = await Member.findAll({
            where: {
                member_name: name
            }
        });
        res.json(member);
    }catch (error){
        res.status(400).json({message : 'Error member not found', error});
    } 
};

exports.getImageById = (req, res) => {
    const { id_user } = req.params;
    
    // Construction du chemin d'accès à l'image en utilisant l'identifiant
    const imagePath = path.join(__dirname, '../images/members', `${id_user}.png`);
    
    // Vérification de l'existence de l'image
    if (fs.existsSync(imagePath)) {
      // Lecture du fichier image
      const image = fs.readFileSync(imagePath);
      
      // Renvoi de la réponse avec le type de contenu "image/jpeg" et l'image elle-même
      res.contentType('image/png');
      res.send(image);
    } else {
      // Si l'image n'existe pas, renvoie d'une réponse d'erreur ou d'une image par défaut
      res.status(404).send('Image not found');
    }
  };
//==============================//

//=== CREATE A MEMBER ===//
exports.signUp = async (req, res) =>{
   if(!isemail.validate(req.body.mail)){
        return res.status(400).json({message : 'Veuillez saisir un mail valide !', severity: "error"});
   }
   // Regarde si l'email saisi par l'utilisateur existe déjà
    const member = await Member.findOne({ where : {member_mail: req.body.mail}})
    if (member) {

        return res.status(400).json({ message: "Ce mail est déjà utilisé, veuillez en utiliser un autre !", severity: "error" })

    }        
   
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newMember = await Member.create({ 
            member_mail: req.body.mail,
            member_name: req.body.name,
            member_password: hashedPassword,
            member_description: req.body.description,
            member_photo: req.body.photo,
            admin: req.body.admin || false
        });
        const photo = req.body.photoInput;
        console.log('Photo : ');
        console.log(photo);
        res.status(201).json({newMember, message: 'Inscription terminée !', severity: "success"});
    } catch (error){
        res.status(400).json({ message : 'Error creating member', severity: "error"});
    } 
};


exports.updloadImage = async (req, res) => {
    const { id } = req.params; 
    const userImageFile = req.files["userImage"][0];
    console.log("userImageFile : ");
    console.log(userImageFile);
    try {
      // Déplacez l'image vers le dossier de destination avec le nom correspondant à l'ID de la musique
      const userImagePath = path.join(__dirname, "../ressources/images/members", `${id}.jpg`);
      fs.renameSync(userImageFile.path, userImagePath);
  
      // Répondre avec succès
      res.status(200).json({ message: "Fichiers téléchargés avec succès." });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Une erreur s'est produite lors du déplacement des fichiers." });
    }

    };

//=== LOGIN ===//
exports.login = async (req, res) =>{
   
    
    try{
        const member = await Member.findOne({ where : {member_mail: req.body.mail}}).then(
            (member)=>{
                if(!member){
                    return res.status(401).json({error: "Utilisateur non trouvé"})
                }
                bcrypt.compare(req.body.password, member.member_password).then(
                    (validation)=>{
                        if(!validation){
                            return res.status(401).json({error: "Mot de passe incorrect !"})
                        }
                        console.log("Membre "+member.member_mail+" connecté !");
                        const token = jwt.sign({id_member:member.id_member}, process.env.JWT_TOKEN, {expiresIn: "1h"});
                        res.status(200).json({token});
                    }
                )
            }
        )
        
    } catch (error){
        res.status(500).json({ message : 'Internal server error', error});
    } 
};


//======================//


//=== DELETE A MEMBER ===//
exports.deleteMemberById = async (req, res) =>{
    const {id} = req.params;
    console.log(id);
    try{
        console.log('1');
        MemberParticipateProject.destroy({
            where: {
                id_member: id
            }
        })
        console.log('2');
        MemberCollaborateSong.destroy({
            where: { 
                id_member: id 
            }   
        })
        console.log('3');
        MemberFollowMember.destroy({
            where:{
            [Op.or] : [
                {id_member: id},
                {id_member2: id}
            ] 
            }   
        })
        console.log('4');
        await deleteAllMemberSongs(id);
        await Member.destroy({
            where: {
                id_member: id
            }
        })
        res.status(201).json({message : 'Member deleted'});
    }catch (error){
        console.log('ON est la ??');
        res.status(400).json({ message : 'Error deleting member', error});
    }
};

exports.getAllMemberSongsById = async (req, res) =>{
    const {id} = req.params;
    console.log('getAllMemberSongsById -> id : ' + id);
    try{
        const songs = await Song.findAll({
            where: {
                id_member: id
            }
        });
        res.json(songs);
    }catch(error){
        res.status(400).json({message : 'Error getting all member songs', error});
    }
};

getAllMemberProjects = async (id) =>{
    try{
        const projects = await Project.findAll({
            where: {
                id_member: id
            }
        });
        return projects;
    }catch(error){
        console.log("Erreur getAllMemberProjects");
    }
};

deleteAllMemberProjects = async (id) =>{
    const projectsId = await getAllMemberProjects(id);
    try{
        projectsId.forEach(async (project) => {
            await Project.destroy({
                where: {
                    id_project: project.id_project
                }
            })
        });
    }catch(error){
        console.log("Erreur deleteAllMemberProjects");
    }
};

deleteAllMemberSongs = async (id) =>{
    
    try{
        const songs = await Song.findAll({
            where: {
                id_member: id
            }
        });
        try{
            songs.forEach(async (song) => {
                const isDeleted = await songsController.deleteSong(song.id_song);
                if(isDeleted){
                    const audioPath = path.join(__dirname, '../ressources/songs', `${song.id_song}.mp3`);
                    if (fs.existsSync(audioPath)) {
                        fs.unlinkSync(audioPath);
                    }
                    // Supprimer le fichier image (son.png)
                    const imagePath = path.join(__dirname, '../ressources/images/songs', `${song.id_song}.jpg`);
                    if (fs.existsSync(imagePath)) {
                        fs.unlinkSync(imagePath);
                    }              
                }
            });
        }catch(error){
            console.log("Erreur deleteAllMemberSongs");
        }      
    }catch(error){
        res.status(400).json({message : 'Error getting all member songs', error});
    }
};



//======================//

//=== UPDATE A MEMBER ===//
exports.updateNameById = async (req, res) =>{
    const {id, name} = req.body;
    try{
        await Member.update({member_name: name},{
            where: {
                id_member: id
            }
        })
        res.status(201).json({message : 'Member name updated !'});
    }catch(error){
        res.status(400).json({ message : 'Error updating member', error});
    }
};

exports.updateMailById = async (req, res) =>{
    const {id, mail} = req.body;
    try{
        await Member.update({member_mail: mail},{
            where: {
                id_member: id
            }
        })
        res.status(201).json({message : 'Member mail updated !'});
    }catch(error){
        res.status(400).json({ message : 'Error updating member', error});
    }
};

exports.updatePasswordById = async (req, res) =>{
    const {id, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try{
        await Member.update({member_password: hashedPassword},{
            where: {
                id_member: id
            }
        })
        res.status(201).json({message : 'Member password updated !'});
    }catch(error){
        res.status(400).json({ message : 'Error updating member', error});
    }
};

exports.updateDescriptionById = async (req, res) =>{
    const {id, description} = req.body;
    try{
        await Member.update({member_description: description},{
            where: {
                id_member: id
            }
        })
        res.status(201).json({message : 'Member description updated !'});
    }catch(error){
        res.status(400).json({ message : 'Error updating member', error});
    }
};

//======================//


//===== REQUESTS WITH FOLLOW TABLE
exports.getFollowsById = async (req, res) => {
    const {id} = req.params;
    console.log("sqks,skv,lk");
    
    try{
        const follows = await db.query('select m.member_name, m2.member_name as suit'
        +' from member m natural join public."memberFollowMember" f'
        +' inner join member m2 on f.id_member2=m2.id_member'
        +' where m.id_member= CAST($1 AS int);', 
        {
            bind: [id],
            type: db.QueryTypes.SELECT,
        },
        );
        res.json(follows);
    }catch (error){
        console.log("Erreur getFollowsById");
    }
};

// Permet à un membre de suivre un autre membre
exports.followMember = async (req, res) =>{
    const {userId, idFollowed} = req.body;
    console.log('userId : '+userId);
    console.log('idFollowed : '+idFollowed);
    if(userId === idFollowed){
        return res.status(400).json({message: 'Impossible de se suivre soi-même !'});
    }
    try{
        await MemberFollowMember.create({id_member: userId, id_member2 : idFollowed})
        res.status(201).json({message : 'Follow successfuly added ! With the user : '+ userId});
    }catch(error){
        res.status(400).json({ message : 'Error updating MemberFollowMember table', error});
    }
};

// Permet à un membre d'unfollow un autre membre
exports.unfollowMember = async (req, res) =>{
    const {userId, idUnfollowed} = req.body;
    try{
        await MemberFollowMember.destroy({
            where: {
            id_member: userId,
            id_member2: idUnfollowed,
            }
        })
        res.status(201).json({message : 'Unfollow has successfuly down!'});
    }catch(error){
        res.status(400).json({ message : 'Error trying to delete a row of MemberFollowMember table', error});
    }
};

exports.isFollow = async (req, res) => {
    const { userId, isFollowed } = req.params;
    

    try {
        const isFollow = await MemberFollowMember.findOne({
            where: {
                id_member: userId,
                id_member2: isFollowed,
            },
        });

        res.status(200).json(!!isFollow);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

    




// const getMembers = function(req, res){
    
//     pool.query("SELECT * FROM member", function(error, results){
//         if (error) throw error;
//         res.status(200).json(results.rows);
//     });
// };

// module.exports = {
//     getMembers,
// };

