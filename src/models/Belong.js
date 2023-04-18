const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const Genre = require('./Genre');
const Song = require('./Song');

const SongBelongGenre = sequelize.define('songBelongGenre', {
    id_genre: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: Genre,
            key: 'id_genre'
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


module.exports = SongBelongGenre;