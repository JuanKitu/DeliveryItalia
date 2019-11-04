const Sequelize = require('sequelize');
const {sequelize} = require('../database/database.js');
const ItemPedido = require('./ItemPedido');

const Producto = sequelize.define('producto',{
    idProducto:{
        type: Sequelize.INTEGER,
        primaryKey:true
    },
    nombre:{
        type: Sequelize.STRING(100)
    },
    descripcion:{
        type:Sequelize.TEXT
    },
    precios:{
        type:Sequelize.REAL
    }
},{
    timestamps: false
});
/*--- cardinaly ItemPedido ---*/
Producto.hasMany(ItemPedido,{foreingKey:'idProducto',sourceKey:'idProducto'});
ItemPedido.beLongsTo(Producto,{foreingKey:'idProducto',sourceKey:'idProducto'});
module.exports = Producto;