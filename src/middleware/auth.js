const jwt = require("jsonwebtoken");

module.exports = (req, res, next) =>{
    try{
        // console.log(req.body);
        // const token = req.token;
        const token = req.headers.authorization?.replace('Bearer ', '');
        console.log('Le TOKEN : ');
        console.log(token);
        if(!token){
            res.status(401).json({message: "Token d'authentification manquant !"})
        }
        req.token = jwt.verify(token, process.env.JWT_TOKEN);
        next();
    }catch(error){
        console.log('Dans erreur');
        res.status(401).json({message: "Token d'authentification invalide !", error})
    }
}