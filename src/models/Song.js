const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const Project = require('./Project');
const Member = require('./Member');
const Genre = require('./Genre');

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
    }, {
        timestamps: false,
        freezeTableName: true,
    }
    
    );

Member.hasMany(Song, {
    foreignKey: "id_member",
});
Song.belongsTo(Member, {
    foreignKey: "id_member",
});


Project.hasMany(Song, {
    foreignKey: "id_project",
});

Genre.hasMany(Song, {
    foreignKey: "id_genre",
});


module.exports = Song;