const Sequelize = require('sequelize');
const sequilize = require('../database/database.js');
const Pedidos = require('./Pedidos');

const Sucursales = sequilize.define('sucursales',{
    idSucursal:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },
    numeroTelefono:{
        type:Sequelize.INTEGER
    },
    direccion:{
        type:Sequelize.STRING(100)
    }
},{
    timestamps: false
});
/*--- cardinaly with Pedidos ---*/
Sucursales.hasMany(Pedidos,{foreingKey:'idSucursal',sourceKey:'idSucursal'});
Pedidos.beLongsTo(Sucursales,{foreingKey:'idSucursal',sourceKey:'idSucursal'});
export default Sucursales;