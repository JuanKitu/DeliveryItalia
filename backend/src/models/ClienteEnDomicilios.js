const Sequelize = require('sequelize');
const {sequelize} = require('../database/database.js');

const ClienteEnDomicilio = sequelize.define('clienteEnDomicilio',{
    idCliente:{
        type:Sequelize.INTEGER,
        primaryKey:true,
    },
    idDomicilio:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },
    nombrePilaDestinatario:{
        type:Sequelize.STRING(150)
    },
    dniDestinatario:{
        type:Sequelize.INTEGER
    }
},{
    timestamps: false,
    freezeTableName: true //this is so that sequelize does not pluralize the table
});
module.exports = ClienteEnDomicilio;