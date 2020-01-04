const Sequelize = require('sequelize');
const { sequelize } = require('../database/database.js');
const Pedidos = require('./Pedidos');

const Domicilios = sequelize.define('domicilios', {
    idDomicilio: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idCliente: {
        type: Sequelize.INTEGER
    },
    idCalle: {
        type: Sequelize.INTEGER
    },
    numero: {
        type: Sequelize.INTEGER
    },
    piso: {
        type: Sequelize.STRING(50)
    },
    nroDepto: {
        type: Sequelize.STRING(10)
    },
    referencias: {
        type: Sequelize.TEXT
    },
    entreCalles: {
        type: Sequelize.TEXT
    },
    nombrePilaDestinatario:{
        type: Sequelize.STRING(150)   
    },
    dniDestinatario:{
        type:Sequelize.INTEGER
    }
}, {
    timestamps: false,
    freezeTableName: true //this is so that sequelize does not pluralize the table
});

/*--- cardinality with Pedidos ---*/
Domicilios.hasMany(Pedidos, { foreignKey: 'idDomicilio', sourceKey: 'idDomicilio' });
Pedidos.belongsTo(Domicilios, { foreignKey: 'idDomicilio', sourceKey: 'idDomicilio' });
module.exports = Domicilios;