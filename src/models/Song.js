const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const Project = require('./Project');
const Member = require('./Member');

const Song = sequelize.define('song', {
    id_song : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement: true,
        allowNull: false,
    },
    song_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    song_path: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    }, {
        timestamps: false,
        freezeTableName: true,
    }
    
    );

Member.hasMany(Song, {
    foreignKey: "id_member",
});


Project.hasMany(Song, {
    foreignKey: "id_project",
});


module.exports = Song;