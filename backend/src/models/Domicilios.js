const Sequelize = require('sequelize');
const {sequelize} = require('../database/database.js');
const Calles = require('./Calles');
const Clientes = require('./Clientes');
const ClienteEnDomicilios = require('./ClienteEnDomicilios');
const Pedidos = require('./Pedidos');

const Domicilios = sequelize.define('domicilios',{
    idDomicilio:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },
    numero:{
        type:Sequelize.INTEGER
    },
    piso:{
        type:Sequelize.STRING(50)
    },
    referencias:{
        type:Sequelize.TEXT
    },
    entrecalles:{
        type:Sequelize.TEXT
    }
},{
    timestamps: false,
    freezeTableName: true //this is so that sequelize does not pluralize the table
});
/*--- cardinality with Calle ---*/
Domicilios.belongsToMany(Calles,{through: 'DomicilioPertCalle', foreignKey: 'idDomicilio', as: 'Calles'});

/*--- cardinality with Clientes ---*/
Domicilios.belongsToMany(Clientes,{through: 'ClienteEnDomicilios', foreignKey: 'idDomicilio', as: 'Clientes'});
/*--- cardinality with Clientes ---*/
Domicilios.HasMany(Pedidos,{foreignKey:idDomicilio,sourceKey:idDomicilio});
Pedidos.belongsTo(Domicilios,{foreignKey:idDomicilio,sourceKey:idDomicilio});
module.exports = Domicilios;