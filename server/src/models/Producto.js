const Sequelize = require('sequelize');
const {sequelize} = require('../database/database.js');
const ItemPedido = require('./ItemPedido');
const Producto = sequelize.define('producto',{
    idProducto:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    nombre:{
        type: Sequelize.STRING(100)
    },
    descripcion:{
        type:Sequelize.TEXT
    },
    precio:{
        type:Sequelize.REAL
    }
},{
    timestamps: false,
    freezeTableName: true //this is so that sequelize does not pluralize the table
});

/*--- cardinaly ItemPedido ---*/
Producto.hasMany(ItemPedido,{foreignKey:'idProducto',sourceKey:'idProducto'});
ItemPedido.belongsTo(Producto,{foreignKey:'idProducto',sourceKey:'idProducto'});
module.exports = Producto;