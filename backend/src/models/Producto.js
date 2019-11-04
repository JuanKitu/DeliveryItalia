const Sequelize = require('sequelize');
const sequilize = require('../database/database.js');
const ItemPedido = require('./ItemPedido');

const Producto = sequilize.define('producto',{
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
        tipe:Sequelize.REAL
    }
},{
    timestamps: false
});
/*--- cardinaly ItemPedido ---*/
Producto.hasMany(ItemPedido,{foreingKey:'idProducto',sourceKey:'idProducto'});
ItemPedido.beLongsTo(Producto,{foreingKey:'idProducto',sourceKey:'idProducto'});
export default Producto;