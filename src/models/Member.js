const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const Member = sequelize.define('member', {
    id_member : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement: true,
        allowNull: false,
    },
    member_mail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    member_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    member_password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    member_description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    member_photo: {
        type: DataTypes.STRING,
        allowNull: false,
    }, 
    admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
      
    }, {
        timestamps: false,
        freezeTableName: true,
    }
    
    );

module.exports = Member;