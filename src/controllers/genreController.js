const Genre = require('../models/Genre');




exports.getAllGenre = async (req, res) =>{
    const genres = await Genre.findAll();
    res.json(genres);
};

exports.createMember = async (req, res) =>{
    const { name } = req.body;

    try{
        const newGenre = await Genre.create({ name});
        res.status(201).json(newGenre);
    } catch (error){
        res.status(400).json({ message : 'Error creating genre', error});
    }
};


