const Sequelize = require('sequelize');
const {sequelize} = require('../database/database.js');

const Apodos = sequelize.define('apodos',{
    idNombreCalle:{
        type: Sequelize.INTEGER,
        primaryKey:true,
    },
    nombreCalle:{
        type:Sequelize.STRING(100)
    }
},{
    timestamps: false
});

module.exports = Apodos;

