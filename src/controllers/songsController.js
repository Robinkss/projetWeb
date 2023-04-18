const Song = require('../models/Song');
const Genre = require('../models/Genre');


exports.getAllSong = async (req, res) =>{
    const songs = await Song.findAll();
    res.json(songs);
};

//===== GET SPECIFIC TYPE =====//
exports.getSongById = async (req, res) =>{
    
    const { id } = req.params;
    console.log(id);
    try{
        const song = await Song.findByPk(id, {
            include: {
                model: Genre
            }
        });
        res.json(song);
    }catch (error){
        res.status(400).json({message : 'Error song not found', error});
    } 
};

exports.getSongByName = async (req, res) =>{
    const { name } = req.params;
    console.log(name);
    try{
        const song = await Song.findAll({
            where: {
                song_name: name
            }
        });
        res.json(song);
    }catch (error){
        res.status(400).json({message : 'Error song not found', error});
    } 
};

//==============================//
//=== CREATE A TYPE ===//
exports.createSong = async (req, res) =>{
    const { name, path, id_member, id_project} = req.body;
    console.log(name);
    console.log(path);
    console.log(id_member);
    try{
        const newSong = await Song.create({ 
            song_name: name, 
            song_path: path, 
            id_member: id_member,
            id_project: id_project
        });
        res.status(201).json(newSong);
    } catch (error){
        
        res.status(400).json({ message : 'Error creating song', error});
    }
};


//=== DELETE A TYPE ===//
exports.deleteSongById = async (req, res) =>{
    const {id} = req.body;
    
    try{
        await Song.destroy({
            where: {
                id_song: id
            }
        })
        res.status(201).json({message : 'Song deleted'});
    }catch (error){

        res.status(400).json({ message : 'Error deleting song', error});
    }
};


//=== UPDATE A TYPE ===//
exports.updateSongNameById = async (req, res) =>{
    const {id, name} = req.body;
    try{
        await Song.update({song_name: name},{
            where: {
                id_song: id
            }
        })
        res.status(201).json({message : 'Song name updated !'});
    }catch(error){
        res.status(400).json({ message : 'Error updating song', error});
    }
};


//=== RELATIONAL REQUESTS ===//
exports.getGenreBySongId = async (req, res) =>{
    
    const { id } = req.params;
    console.log(id);
    try{
        const song = await Song.findByPk(id);
        res.json(song);
    }catch (error){
        res.status(400).json({message : 'Error song not found', error});
    } 
};
