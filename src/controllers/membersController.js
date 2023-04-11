const Member = require('../models/Member');




exports.getAllMembers = async (req, res) =>{
    const members = await Member.findAll();
    res.json(members);
};

exports.getMemberById = async (req, res) =>{
    const { id } = req.body;
    try{
        const member = await Member.findByPk(id);
    }catch (error){
        res.status(400).json({message : 'Error member not found', error});
    }
    
}

exports.createMember = async (req, res) =>{
    const { mail, pseudo, admin, password } = req.body;

    try{
        const newMember = await Member.create({ mail, pseudo, admin, password});
        res.status(201).json(newMember);
    } catch (error){
        res.status(400).json({ message : 'Error creating member', error});
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

