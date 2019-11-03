const Sequelize = require('sequelize');
const sequilize = require('../database/database.js');

const Gustos = sequilize.define('gustos',{
    idGusto:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },
    nombre:{
        type:Sequelize.STRING(100)
    },
    descripcion:{
        type:Sequelize.TEXT
    },
    disponible:{
        type:Sequelize.BOOLEAN
    },
    idCategoria:{
        type:Sequelize.INTEGER
    }
},{
    timestamps: false
});
export default Gustos;