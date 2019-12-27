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
    },
    vecesUsado:{
        type:Sequelize.INTEGER
    }
},{
    timestamps: false,
    freezeTableName: true //this is so that sequelize does not pluralize the table
});
module.exports = GustosEnPotes;