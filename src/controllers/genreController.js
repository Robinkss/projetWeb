const Genre = require('../models/Genre');
const path = require('path');
const fs = require('fs');




exports.getAllGenre = async (req, res) =>{
    const genres = await Genre.findAll();
    res.json(genres);
};

//===== GET SPECIFIC GENRE =====//
exports.getGenreById = async (req, res) =>{
    
    const { id } = req.params;
    
    try{
        const genre = await Genre.findByPk(id);
        res.json(genre);
    }catch (error){
        res.status(400).json({message : 'Error genre not found', error});
    } 
};



exports.getImageByName = (req, res) => {
  const { genre_name } = req.params;
  
  // Construction du chemin d'accès à l'image en utilisant l'identifiant
  const imagePath = path.join(__dirname, '../ressources/images/genres', `${genre_name}.jpg`);
  
  // Vérification de l'existence de l'image
  if (fs.existsSync(imagePath)) {
    // Lecture du fichier image
    const image = fs.readFileSync(imagePath);
    
    // Renvoi de la réponse avec le type de contenu "image/jpeg" et l'image elle-même
    res.contentType('image/jpeg');
    res.send(image);
  } else {
    // Si l'image n'existe pas, renvoie d'une réponse d'erreur ou d'une image par défaut
    res.status(404).send('Image not found');
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
    const { genre_name , genre_description} = req.body;
    try{
        const newGenre = await Genre.create({ 
            genre_name: genre_name,
            genre_description: genre_description
        });
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


//===== REQUESTS WITH SongBelongGenre TABLE =====//

exports.getSongsOfGenre = async (req, res) =>{
    
    const { id } = req.params;
    try{
        const follows = await db.query('select m.member_name, m2.member_name as suit from member m natural join follow f'
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



