const Sequelize = require('sequelize');
const {sequelize} = require('../database/database.js');
const Pedidos = require('./Pedidos.js');

const MedioPago = sequelize.define('medioPago',{
    idMedioPago:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    descripcion:{
        type:Sequelize.TEXT
    }
},{
    timestamps: false,
    freezeTableName: true //this is so that sequelize does not pluralize the table
});

MedioPago.hasMany(Pedidos,{foreignKey:'idMedioPago',sourceKey:'idMedioPago'});
Pedidos.belongsTo(MedioPago,{foreignKey:'idMedioPago',sourceKey:'idMedioPago'});

module.exports = MedioPago;