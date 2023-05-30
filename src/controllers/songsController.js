const Song = require('../models/Song');
const Genre = require('../models/Genre');
const Member = require('../models/Member');
const SongBelongGenre = require('../models/SongBelongGenre');
const MemberCollaborateSong = require('../models/MemberCollaborateSong');
const path = require('path');
const fs = require('fs');


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

exports.getSongsByGenreId = async (req, res) => {
    const { id } = req.params;
    console.log("id genre: " + id);
    try {
        const songs = await Song.findAll({
            where: {
                id_genre: id
            },
            include: [
                {
                    model: Member,
                    attributes: ['member_name']
                }
            ]
        });
        
        songs.forEach(song => {
            console.log(song.member.member_name);
        });
        res.json(songs);
    } catch (error) {
        console.log("Error occurred:", error);
        res.status(400).json({ message: 'Error songs not found', error });
    }
};


//==============================//

//=== CREATE A TYPE ===//
exports.createSong = async (req, res) =>{
    const { songName, id_member, genre} = req.body;
    console.log("Request body :");
    console.log(req.body);
    
    try{
        const newSong = await Song.create({ 
            song_name: songName,
            id_member: id_member,
            id_genre: genre
        });

        res.status(201).json(newSong);
    } catch (error){
        console.log("Dans le catch");
        res.status(400).json({ message : 'Error creating song', error});
    }
};

exports.uploadSongFiles = async (req, res) => {
    const { id } = req.params;
    console.log("id :"+id);
    console.log("Req.files :");
    console.log(req.files);
    
    const songImageFile = req.files["songImage"][0];
    const songFile = req.files["song"][0];
  
    try {
      // Déplacez l'image vers le dossier de destination avec le nom correspondant à l'ID de la musique
      const songImagePath = path.join(__dirname, "../ressources/images/songs", `${id}.jpg`);
      fs.renameSync(songImageFile.path, songImagePath);
  
      // Déplacez l'audio vers le dossier de destination avec le nom correspondant à l'ID de la musique
      const songFilePath = path.join(__dirname, "../ressources/songs", `${id}.mp3`);
      fs.renameSync(songFile.path, songFilePath);
  
      // Répondre avec succès
      res.status(200).json({ message: "Fichiers téléchargés avec succès." });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Une erreur s'est produite lors du déplacement des fichiers." });
    }
  };
  
  


//=== DELETE A SONG ===//
exports.deleteSongById = async (req, res) =>{
    const {id_song} = req.params;
    console.log("Dans le deleteSongById");
    console.log(id_song);
    const song = await Song.findByPk(id_song);
    if(!song){
        res.status(400).json({ message : 'Song not found'});
    }
    isDeleted = await deleteSong(id_song);
    // Supprimer le fichier audio (son.mp3)
    const audioPath = path.join(__dirname, '../ressources/songs', `${song.id_song}.mp3`);
    if (fs.existsSync(audioPath)) {
        fs.unlinkSync(audioPath);
    }

    // Supprimer le fichier image (son.png)
    const imagePath = path.join(__dirname, '../ressources/images/songs', `${song.id_song}.jpg`);
    if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
    }

    if(isDeleted){
        res.status(201).json({message : 'Song deleted'});
    }else{
        res.status(400).json({ message : 'Error deleting song'});
    }
};

const deleteSong = async (songId) => {
    try{
        MemberCollaborateSong.destroy({
            where: {
                id_song: songId
            }
        })
        await Song.destroy({
            where: {
                id_song: songId
            }
        })
        return true;
    }catch (error){
        return false;
    }    
};

exports.deleteSong = async (songId) => {
    try{
        MemberCollaborateSong.destroy({
            where: {
                id_song: songId
            }
        })
        await Song.destroy({
            where: {
                id_song: songId
            }
        })
        return true;
    }catch (error){
        return false;
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


// //=== Link Song to a Genre ===//
// exports.addGenreToSong = async (req, res) =>{
//     const { id_genre, id_song} = req.body;
//     try{
//         const songBelongGenre = await SongBelongGenre.create({ 
//             id_genre: id_genre,
//             id_song: id_song
//         });
//         res.status(201).json(songBelongGenre);
//     } catch (error){       
//         res.status(400).json({ message : 'Error adding genre to a song', error});
//     }
// };

/* //=== Delete a genre to a Song===//
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
}; */


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


