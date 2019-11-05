const Sequelize = require('sequelize');
const {sequelize} = require('../database/database.js');

const ItemPedido = sequelize.define('itemPedido',{
    idItemPedido:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },
    idPedido:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },
    precioTotal:{
        type:Sequelize.REAL
    },
    cantidad:{
        type:Sequelize.INTEGER
    },
    idPote:{
        type:Sequelize.INTEGER
    },
    idProducto:{
        type:Sequelize.INTEGER
    },
    descripcion:{
        type:Sequelize.TEXT
    }
},{
    timestamps: false,
    freezeTableName: true //this is so that sequelize does not pluralize the table
});
module.exports = ItemPedido;