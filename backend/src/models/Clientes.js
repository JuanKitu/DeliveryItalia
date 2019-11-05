const Sequelize = require('sequelize');
const {sequelize} = require('../database/database.js');
const ClienteEnDomicilios = require('./ClienteEnDomicilios');
const Domicilios = require('./Domicilios');
const Pedidos = require('./Pedidos');

const Clientes = sequelize.define('clientes',{
    idCliente:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },
    dni:{
        type:Sequelize.INTEGER
    }
},{
    timestamps: false,
    freezeTableName: true //this is so that sequelize does not pluralize the table
});

/*--- cardinality with Domicilios ---*/
Clientes.belongsToMany(Domicilios,{through: 'ClienteEnDomicilios', foreignKey: 'idCliente', as: 'Domicilios'});
/*--- cardinality with Domicilios ---*/
Clientes.hasMany(Pedidos,{foreingKey:idCliente,sourceKey:idCliente});
Pedidos.belongsTo(Clientes,{foreingKey:idCliente,sourceKey:idCliente});

module.exports = Clientes;