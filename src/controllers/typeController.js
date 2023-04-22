const Type = require('../models/Type');


exports.getAllType = async (req, res) =>{
    const types = await Type.findAll();
    res.json(types);
};

//===== GET SPECIFIC TYPE =====//
exports.getTypeById = async (req, res) =>{
    
    const { id } = req.params;
    console.log(id);
    try{
        const type = await Type.findByPk(id);
        res.json(type);
    }catch (error){
        res.status(400).json({message : 'Error type not found', error});
    } 
};

exports.getTypeByName = async (req, res) =>{
    const { name } = req.params;
    console.log(name);
    try{
        const type = await Type.findAll({
            where: {
                type_name: name
            }
        });
        res.json(type);
    }catch (error){
        res.status(400).json({message : 'Error type not found', error});
    } 
};
//==============================//
//=== CREATE A TYPE ===//
exports.createType = async (req, res) =>{
    const { type_name } = req.body;

    try{
        const newType = await Type.create({ 
            type_name:type_name
        });
        res.status(201).json(newType);
    } catch (error){
        res.status(400).json({ message : 'Error creating type', error});
    }
};


//=== DELETE A TYPE ===//
exports.deleteTypeById = async (req, res) =>{
    const {id} = req.body;
    
    try{
        await Type.destroy({
            where: {
                id_type: id
            }
        })
        res.status(201).json({message : 'Type deleted'});
    }catch (error){
        res.status(400).json({ message : 'Error deleting type', error});
    }
};


//=== UPDATE A TYPE ===//
exports.updateTypeNameById = async (req, res) =>{
    const {id, name} = req.body;
    try{
        await Type.update({type_name: name},{
            where: {
                id_type: id
            }
        })
        res.status(201).json({message : 'Type name updated !'});
    }catch(error){
        res.status(400).json({ message : 'Error updating type', error});
    }
};

