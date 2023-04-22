const Song = require('../models/Song');
const Genre = require('../models/Genre');
const SongBelongGenre = require('../models/SongBelongGenre');
const MemberCollaborateSong = require('../models/MemberCollaborateSong');

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


//=== Link Song to a Genre ===//
exports.addGenreToSong = async (req, res) =>{
    const { id_genre, id_song} = req.body;
    try{
        const songBelongGenre = await SongBelongGenre.create({ 
            id_genre: id_genre,
            id_song: id_song
        });
        res.status(201).json(songBelongGenre);
    } catch (error){       
        res.status(400).json({ message : 'Error adding genre to a song', error});
    }
};

//=== Delete a genre to a Song===//
exports.deleteGenreToSong = async (req, res) =>{
    const { id_genre, id_song} = req.body;
    try{
        const songBelongGenre = await SongBelongGenre.destroy({ 
            where: {
                id_genre: id_genre,
                id_song: id_song
            }
        });
        res.status(201).json(songBelongGenre);
    } catch (error){       
        res.status(400).json({ message : 'Error deleting genre to a song', error});
    }
};


//=== Add a member collaboration to a Song===//
exports.addMemberToSong = async (req, res) =>{
    const { id_member, id_song} = req.body;
    try{
        const memberCollaborateSong = await MemberCollaborateSong.create({ 
            id_member: id_member,
            id_song: id_song
        });
        res.status(201).json(memberCollaborateSong);
    } catch (error){       
        res.status(400).json({ message : 'Error adding member collaboratio to a song', error});
    }
};

//=== Delete a member collaboration to a Song===//
exports.deleteMemberToSong = async (req, res) =>{
    const { id_member, id_song} = req.body;
    try{
        const memberCollaborateSong = await MemberCollaborateSong.destroy({ 
            where: {
                id_member: id_member,
                id_song: id_song
            }
        });
        res.status(201).json(memberCollaborateSong);
    } catch (error){       
        res.status(400).json({ message : 'Error deleting member collaboration to a song', error});
    }
};






















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

exports.getSongProjectById = async (req, res) =>{
    
    const { id } = req.params;
    console.log(id);
    try{
        const song = await Song.findByPk(id);
        console.log(song);
        res.json(song);
    }catch (error){
        res.status(400).json({message : 'Error song not found', error});
    } 
};


