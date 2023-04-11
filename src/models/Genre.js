const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const Genre = sequelize.define('genre', {
    id_genre : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement: true,
        allowNull: false,
    },
    genre_name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
      
    }, {
        timestamps: false,
        freezeTableName: true,
    }
    
    );

module.exports = Genre;