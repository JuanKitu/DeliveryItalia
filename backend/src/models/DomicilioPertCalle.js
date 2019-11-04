const Sequelize = require('sequelize');
const {sequelize} = require('../database/database.js');

const DomicilioPertCalle = sequelize.define('domicilioPertCalle',{
    idCalle:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },
    idDomicilio:{
        type:Sequelize.INTEGER,
        primaryKey:true
    }
},{
    timestamps: false
});
module.exports = DomicilioPertCalle;