const Sequelize = require('sequelize');
const {sequelize} = require('../database/database.js');
const ItemPedido = require('./ItemPedido');
const EstadoPedidos = require('./EstadoPedidos');

const Pedidos = sequelize.define('pedidos',{
    idPedido:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    fechaPedido:{
        type:Sequelize.DATE
    },
    montoTotal:{
        type:Sequelize.REAL
    },
    montoPagaCliente:{
        type:Sequelize.REAL
    },
    cuit:{
        type:Sequelize.BIGINT
    },
    idDomicilio:{
        type:Sequelize.INTEGER
    },
    idCliente:{
        type:Sequelize.INTEGER
    },
    idSucursal:{
        type:Sequelize.INTEGER
    },
    idMedioPago:{
        type:Sequelize.INTEGER
    },
    descripcion:{
        type:Sequelize.TEXT
    }

},{
    timestamps: false,
    freezeTableName: true //this is so that sequelize does not pluralize the table
});
/*--- Composition with ItemPedido ---*/
Pedidos.hasMany(ItemPedido,{foreignKey:'idPedido',sourceKey:'idPedido'});
ItemPedido.belongsTo(Pedidos,{foreignKey:'idPedido',sourceKey:'idPedido'});
/*--- Composition with EstadoPedido ---*/
Pedidos.hasMany(EstadoPedidos,{foreignKey:'idPedido',sourceKey:'idPedido'});
EstadoPedidos.belongsTo(Pedidos,{foreignKey:'idPedido',sourceKey:'idPedido'});
module.exports = Pedidos;