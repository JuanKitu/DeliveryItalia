const Sequelize = require('sequelize');
const sequilize = require('../database/database.js');

const Apodos = sequilize.define('apodos',{
    idNombreCalle:{
        type: Sequelize.INTEGER,
        primaryKey:true,
    },
    nombreCalle:{
        type:Sequelize.STRING(100)
    }
},{
    timestamps: false
});

export default Apodos;

