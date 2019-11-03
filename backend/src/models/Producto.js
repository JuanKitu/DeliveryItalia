const Sequelize = require('sequelize');
const sequilize = require('../database/database.js');

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
export default Producto;