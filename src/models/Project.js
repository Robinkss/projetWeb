const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const Member = require('./Member');
const Type = require('./Type');

const Project = sequelize.define('project', {
    id_project : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement: true,
        allowNull: false,
    },
    project_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    release_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    cover_path: {
        type: DataTypes.STRING,
        allowNull: false,
    },     
    }, {
        timestamps: false,
        freezeTableName: true,
    }
    
    );

Member.hasMany(Project, {
    foreignKey: "id_member",
});


Type.hasMany(Project, {
    foreignKey: "id_type",
});


module.exports = Project;