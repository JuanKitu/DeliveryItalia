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
    timestamps: false,
    freezeTableName: true //this is so that sequelize does not pluralize the table
});
module.exports = DomicilioPertCalle;