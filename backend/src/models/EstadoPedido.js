const Sequelize = require('sequelize');
const {sequelize} = require('../database/database.js');

const EstadoPedido = sequelize.define('estadoPedido',{
    idEstado:{
        type:Sequelize.INTEGER,
        primaryKey:true
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
    timestamps: false
});
module.exports = EstadoPedido;