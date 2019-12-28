const Sequelize = require('sequelize');
const {sequelize} = require('../database/database.js');
const ClienteEnDomicilios = require('./ClienteEnDomicilios');
const Domicilios = require('./Domicilios');
const Pedidos = require('./Pedidos');

const Clientes = sequelize.define('clientes',{
    idCliente:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    dni:{
        type:Sequelize.INTEGER
    },
    nombre:{
        type:Sequelize.STRING(50)
    },
    apellido:{
        type:Sequelize.STRING(50)
    },
    idCuenta:{
        type:Sequelize.INTEGER
    }
},{
    timestamps: false,
    freezeTableName: true //this is so that sequelize does not pluralize the table
});

/*--- cardinality with Domicilios ---*/
Clientes.associate = (models)=>{
    Clientes.belongsToMany(models.Domicilios,{through: 'ClienteEnDomicilios', foreignKey: 'idCliente', as: 'Domicilios'});
}

/*--- cardinality with Domicilios ---*/
Clientes.hasMany(Pedidos,{foreignKey:'idCliente',sourceKey:'idCliente'});
Pedidos.belongsTo(Clientes,{foreignKey:'idCliente',sourceKey:'idCliente'});

module.exports = Clientes;