const Sequelize = require('sequelize');
const sequilize = require('../database/database.js');
const Calles = require('./Calles');

const Domicilios = sequilize.define('domicilios',{
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
    timestamps: false
});
/*--- cardinality with Calle ---*/
Domicilios.belongsToMany(Domicilios,{through: 'DomicilioPertCalle', foreignKey: 'idDomicilio', as: 'Calles'})
export default Domicilios;