const Sequelize = require('sequelize');
const {sequelize} = require('../database/database.js');
const Clientes = require('./Clientes');

const Cuentas = sequelize.define('cuentas',{
    idCuenta:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    email:{
        type:Sequelize.STRING(50)
    },
    password:{
        type:Sequelize.STRING
    },
    salt: {
        type:Sequelize.STRING
    },
    userType: {
        type:Sequelize.INTEGER
    }
},{
    timestamps: false,
    freezeTableName: true //this is so that sequelize does not pluralize the table
});
/*--- cardinality with Clientes ---*/
Cuentas.hasMany(Clientes,{foreignKey:'idCuenta', sourceKey:'idCuenta'});
Clientes.belongsTo(Cuentas,{foreignKey:'idCuenta', sourceKey:'idCuenta'});
module.exports = Cuentas;