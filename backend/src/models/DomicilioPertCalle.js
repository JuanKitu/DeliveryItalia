const Sequelize = require('sequelize');
const sequilize = require('../database/database.js');

const DomicilioPertCalle = sequilize.define('domicilioPertCalle',{
    idCalle:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },
    idDomicilio:{
        type:Sequelize.INTEGER,
        primaryKey:true
    }
},{
    timestamps: false
});
export default DomicilioPertCalle;