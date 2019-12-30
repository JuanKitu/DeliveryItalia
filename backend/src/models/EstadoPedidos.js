const Sequelize = require('sequelize');
const {sequelize} = require('../database/database.js');

const EstadoPedidos = sequelize.define('estadoPedido',{
    idEstado:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    idPedido:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },
    nombre:{
        type:Sequelize.STRING(50)
    },
    fechaInicioEstado:{
        type:Sequelize.DATE
    },
    fechaFinEstado:{
        type:Sequelize.DATE
    },
    descripcion:{
        type:Sequelize.TEXT
    },
},{
    timestamps: false,
    freezeTableName: true //this is so that sequelize does not pluralize the table
});
module.exports = EstadoPedidos;