const Sequelize = require('sequelize');
const {sequelize} = require('../database/database.js');

const Constante_pote = sequelize.define('constante_pote',{
    idConstantePote:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    weight:{
        type:Sequelize.REAL,
        primaryKey:true
    },
    price:{
        type:Sequelize.REAL
    },
    maxQuantity:{
        type:Sequelize.INTEGER
    }
},{
    timestamps: false,
    freezeTableName: true, //this is so that sequelize does not pluralize the table
});

module.exports = Constante_pote;

