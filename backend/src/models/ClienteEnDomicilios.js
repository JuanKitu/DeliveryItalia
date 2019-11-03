const Sequelize = require('sequelize');
const sequilize = require('../database/database.js');

const ClienteEnDomicilio = sequilize.define('clienteEnDomicilio',{
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
export default ClienteEnDomicilio;