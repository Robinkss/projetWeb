const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const Type = sequelize.define('type', {
    id_type : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement: true,
        allowNull: false,
    },
    type_name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
      
    }, {
        timestamps: false,
        freezeTableName: true,
    }
    
    );

module.exports = Type;