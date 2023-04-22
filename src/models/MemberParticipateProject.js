const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const Member = require('./Member');
const Project = require('./Project');


const MemberParticipateProject = sequelize.define('memberParticipateProject', {
    id_member: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: Member,
            key: 'id_member'
        }
    },
    id_project: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: Project,
            key: 'id_project'
        }
    }
    }, 
    {
        timestamps: false,
        freezeTableName: true,
    } 
    );


module.exports = MemberParticipateProject;