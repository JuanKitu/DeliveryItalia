const Sequelize = require('sequelize');
const sequilize = require('../database/database.js');

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
export default Personas;