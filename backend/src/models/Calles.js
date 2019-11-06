const Sequelize = require('sequelize');
const {sequelize} = require('../database/database.js');
const Apodos = require('./Apodos');
const Domicilios = require('./Domicilios');
const DomicilioPertCalle = require('./DomicilioPertCalle');

const Calles = sequelize.define('calles',{
    idCalle:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },
    nombreFormal:{
        type:Sequelize.STRING(100)
    },
    idNombreCalle:{
        type:Sequelize.INTEGER
    }
},{
    timestamps: false,
    freezeTableName: true //this is so that sequelize does not pluralize the table
});
/*--- cardinality with Apodos ---*/
Calles.hasMany(Apodos,{foreingKey:idNombreCalle, sourceKey: idNombreCalle});
Apodos.belongsTo(Calles,{foreingKey:idNombreCalle, sourceKey: idNombreCalle});

/*--- cardinality with Domicilio ---*/
Calles.associate = (models)=>{
    Calles.belongsToMany(models.Domicilios,{through: 'DomicilioPertCalle', foreignKey: 'idCalle', as: 'Domicilios'});
};
module.exports = Calles;