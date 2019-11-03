const Sequelize = require('sequelize');
const sequilize = require('../database/database.js');

const GustosEnPotes = sequilize.define('gustosEnPotes',{
    idPote:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },
    idGusto:{
        type:Sequelize.INTEGER,
        primaryKey:true
    }
},{
    timestamps: false
});
export default GustosEnPotes;