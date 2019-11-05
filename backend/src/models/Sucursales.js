const Sequelize = require('sequelize');
const {sequelize} = require('../database/database.js');
const Pedidos = require('./Pedidos');

const Sucursales = sequelize.define('sucursales',{
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
    timestamps: false,
    freezeTableName: true //this is so that sequelize does not pluralize the table
});
/*--- cardinaly with Pedidos ---*/
Sucursales.hasMany(Pedidos,{foreingKey:'idSucursal',sourceKey:'idSucursal'});
Pedidos.belongsTo(Sucursales,{foreingKey:'idSucursal',sourceKey:'idSucursal'});
module.exports = Sucursales;