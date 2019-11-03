const Sequelize = require('sequelize');
const sequilize = require('../database/database.js');

const ItemPedido = sequilize.define('itemPedido',{
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
    timestamps: false
});
export default ItemPedido;