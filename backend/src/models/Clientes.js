const Sequelize = require('sequelize');
const sequilize = require('../database/database.js');

const Clientes = sequilize.define('clientes',{
    idCliente:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },
    dni:{
        type:Sequelize.INTEGER
    }
},{
    timestamps: false
});
export default Clientes;