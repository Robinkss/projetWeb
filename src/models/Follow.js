const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const Member = require('./Member')

const Follow = sequelize.define('follow', {
    id_member: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: Member,
            key: 'id_member'
        }
    },
    id_member2: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: Member,
            key: 'id_member'
        }
    }
    }, 
    {
        timestamps: false,
        freezeTableName: true,
    } 
    );


module.exports = Follow;