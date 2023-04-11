require('dotenv').config();

const app = require('./app');
const sequelize = require("./config/db");
const port = 3000;

const membersRoutes = require('./routes/routes'); 
require('./models/Member');

(async () => {
    try{
        await sequelize.authenticate();
        await sequelize.sync();
        console.log("Database connection successful !");
        app.listen(port,function(){
            console.log(`Live at Port ${port}`);
          });
    } catch (error){
        console.error("Unable to connect to database", error);
    }
})();








