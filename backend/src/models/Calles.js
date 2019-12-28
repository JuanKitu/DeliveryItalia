const Sequelize = require('sequelize');
const { sequelize } = require('../database/database.js');
const Apodos = require('./Apodos');
const Domicilios = require('./Domicilios');
const DomicilioPertCalle = require('./DomicilioPertCalle');


const Calles = sequelize.define('calles', {
    idCalle: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    nombreFormal: {
        type: Sequelize.STRING(100)
    },
}, {
    timestamps: false,
    freezeTableName: true //this is so that sequelize does not pluralize the table
});
/*--- Composition with Apodos ---*/
Calles.hasMany(Apodos, { foreignKey: 'idCalle', sourceKey: 'idCalle' });
Apodos.belongsTo(Calles, { foreignKey: 'idCalle', sourceKey: 'idCalle' });

/*--- cardinaly Domicilio ---*/
Calles.hasMany(Domicilios,{foreignKey:'idCalle',sourceKey:'idCalle'});
Domicilios.belongsTo(Calles,{foreignKey:'idCalle',sourceKey:'idCalle'});

module.exports = Calles;