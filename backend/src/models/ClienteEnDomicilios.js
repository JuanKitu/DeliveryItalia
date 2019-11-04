const Sequelize = require('sequelize');
const {sequelize} = require('../database/database.js');

const ClienteEnDomicilio = sequelize.define('clienteEnDomicilio',{
    idCliente:{
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
module.exports = ClienteEnDomicilio;