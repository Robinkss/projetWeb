require('dotenv').config();

const app = require('./app');
const sequelize = require("./config/db");
const port = 3001;


(async () => {
    try{
        await sequelize.authenticate();
        await sequelize.sync({alter:true});
        console.log("Database connection successful !");
        app.listen(port,function(){
            console.log(`Live at Port ${port}`);
          });
    } catch (error){
        console.error("Unable to connect to database", error);
    }
})();








