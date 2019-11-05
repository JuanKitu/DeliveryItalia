const Sequelize = require('sequelize');
const {sequelize} = require('../database/database.js');
const Clientes = require('./Clientes');

const Personas = sequelize.define('personas',{
    dni:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },
    nombre:{
        type:Sequelize.STRING(50)
    },
    apellido:{
        type:Sequelize.STRING(50)
    }
},{
    timestamps: false,
    freezeTableName: true //this is so that sequelize does not pluralize the table
});
/*--- cardinality with Clientes ---*/
Personas.hasMany(Clientes,{foreingKey:dni, sourceKey:dni});
Clientes.belongsTo(Personas,{foreingKey:dni, sourceKey:dni});
module.exports = Personas;