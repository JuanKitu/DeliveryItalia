const Sequelize = require('sequelize');
const sequilize = require('../database/database.js');

const Potes = sequilize.define('potes',{
    idPote:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },
    cantidad:{
        type:Sequelize.REAL,
    }
},{
    timestamps: false
});
export default Potes;