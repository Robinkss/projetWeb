const Genre = require('../models/Genre');




exports.getAllGenre = async (req, res) =>{
    const genres = await Genre.findAll();
    res.json(genres);
};

//===== GET SPECIFIC GENRE =====//
exports.getGenreById = async (req, res) =>{
    
    const { id } = req.params;
    console.log(id);
    try{
        const genre = await Genre.findByPk(id);
        res.json(genre);
    }catch (error){
        res.status(400).json({message : 'Error genre not found', error});
    } 
};

exports.getGenreByName = async (req, res) =>{
    const { name } = req.params;
    console.log(name);
    try{
        const genre = await Genre.findAll({
            where: {
                genre_name: name
            }
        });
        res.json(genre);
    }catch (error){
        res.status(400).json({message : 'Error genre not found', error});
    } 
};
//==============================//

//=== CREATE A GENRE ===//
exports.createGenre = async (req, res) =>{
    const { name } = req.body;

    try{
        const newGenre = await Genre.create({ name});
        res.status(201).json(newGenre);
    } catch (error){
        res.status(400).json({ message : 'Error creating genre', error});
    }
};


//=== DELETE A GENRE ===//
exports.deleteGenreById = async (req, res) =>{
    const {id} = req.body;
    
    try{
        await Genre.destroy({
            where: {
                id_genre: id
            }
        })
        res.status(201).json({message : 'Genre deleted'});
    }catch (error){
        res.status(400).json({ message : 'Error deleting genre', error});
    }
};


//=== UPDATE A GENRE ===//
exports.updateGenreNameById = async (req, res) =>{
    const {id, name} = req.body;
    try{
        await Genre.update({genre_name: name},{
            where: {
                id_genre: id
            }
        })
        res.status(201).json({message : 'Genre name updated !'});
    }catch(error){
        res.status(400).json({ message : 'Error updating genre', error});
    }
};




