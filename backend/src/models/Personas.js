const Sequelize = require('sequelize');
const sequilize = require('../database/database.js');
const Clientes = require('./Clientes');

const Personas = sequilize.define('personas',{
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
    timestamps: false
});
/*--- cardinality with Clientes ---*/
Personas.hasMany(Clientes,{foreingKey:dni, sourceKey:dni});
Clientes.beLongsTo(Personas,,{foreingKey:dni, sourceKey:dni});
export default Personas;