const Sequelize = require('sequelize');
const {sequelize} = require('../database/database.js');

const GustosEnPotes = sequelize.define('gustosEnPotes',{
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
module.exports = GustosEnPotes;