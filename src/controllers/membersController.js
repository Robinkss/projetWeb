const Member = require('../models/Member');
const MemberFollowMember = require('../models/MemberFollowMember');
const {Sequelize} = require('sequelize');
const db = require('../config/db');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const isemail = require("isemail");
const auth = require("../middleware/auth");




exports.getAllMembers = async (req, res) =>{
    const members = await Member.findAll();
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
//==============================//

//=== CREATE A MEMBER ===//
exports.signUp = async (req, res) =>{
   if(!isemail.validate(req.body.mail)){
        return res.status(400).json({message : 'Veuillez saisir un mail valide !'});
   }
   //TODO : check if email arleady exist in database
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newMember = await Member.create({ 
            member_mail: req.body.mail,
            member_name: req.body.name,
            member_password: hashedPassword,
            member_description: req.body.description,
            member_photo: req.body.photo,
            admin: false
        });
        res.status(201).json(newMember);
    } catch (error){
        res.status(400).json({ message : 'Error creating member', error});
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
    const {id} = req.body;
    
    try{
        await Member.destroy({
            where: {
                id_member: id
            }
        })
        res.status(201).json({message : 'Member deleted'});
    }catch (error){
        res.status(400).json({ message : 'Error deleting member', error});
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
    try{
        await Member.update({member_password: password},{
            where: {
                id_member: id
            }
        })
        res.status(201).json({message : 'Member password updated !'});
    }catch(error){
        res.status(400).json({ message : 'Error updating member', error});
    }
};

//======================//


//===== REQUESTS WITH FOLLOW TABLE
exports.getFollowsById = async (req, res) => {
    const {id} = req.params;
    console.log(id);
    
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
    const userId = req.token.id_member
    const {idFollowed} = req.body;
    if(userId == idFollowed){
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
    const {id, id2} = req.body;
    try{
        await MemberFollowMember.destroy({
            where: {
            id_member: id,
            id_member2: id2,
            }
        })
        res.status(201).json({message : 'Unfollow has successfuly down!'});
    }catch(error){
        res.status(400).json({ message : 'Error trying to delete a row of MemberFollowMember table', error});
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

