const {Sequelize} = require('sequelize');

const config = {
    development: {
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PW,
        database: process.env.DATABASE_NAME,
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        dialect: 'postgres'
    },
    test: {
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PW,
        database: process.env.DATABASE_NAME,
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        dialect: 'postgres'
    },
    production: {
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PW,
        database: process.env.DATABASE_NAME,
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        dialect: 'postgres'
    },
};


const sequelize = new Sequelize(
    process.env.PG_NAME,
    process.env.PG_USERNAME,
    process.env.PG_PASSWORD,
    {
        host: process.env.PG_HOST,
        dialect: "postgres",
        port: process.env.PG_PORT,
        logging: false
    }
    
);

// const sequelize = new Sequelize(
//     process.env.PG_NAME,
//     process.env.PG_USERNAME,
//     process.env.PG_PASSWORD,
//     {
//         host: process.env.PG_HOST,
//         dialect: "postgres",
//         dialectOptions: {
//             ssl: {
//                 require: true,
//                 rejectUnauthorized: false
//             }
//         },
//         port: process.env.PG_PORT,
//         logging: false
//     }
    
// );


module.exports = sequelize;







//connection.end();
