const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const Member = require('./Member');
const Song = require('./Song');


const MemberCollaborateSong = sequelize.define('memberCollaborateSong', {
    id_member: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: Member,
            key: 'id_member'
        }
    },
    id_song: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: Song,
            key: 'id_song'
        }
    }
    }, 
    {
        timestamps: false,
        freezeTableName: true,
    } 
    );


module.exports = MemberCollaborateSong;