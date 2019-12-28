const Sequelize = require('sequelize');
const {sequelize} = require('../database/database.js');

const Apodos = sequelize.define('apodos',{
    idNombreCalle:{
        type: Sequelize.INTEGER,
        primaryKey:true,
    },
    idCalle:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },
    nombreCalle:{
        type:Sequelize.STRING(100)
    }
},{
    timestamps: false,
    freezeTableName: true, //this is so that sequelize does not pluralize the table
});

module.exports = Apodos;

