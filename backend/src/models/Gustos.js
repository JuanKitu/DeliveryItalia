const Sequelize = require('sequelize');
const {sequelize} = require('../database/database.js');
const Potes = require('./Potes');
const GustosEnPotes = require('./GustosEnPotes');

const Gustos = sequelize.define('gustos',{
    idGusto:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true
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
    timestamps: false,
    freezeTableName: true //this is so that sequelize does not pluralize the table
});
/*--- cardinaly with Pote ---*/
Gustos.associate = (models) =>{
    Gustos.belongsToMany(models.Potes,{through:'GustosEnPotes',foreignKey:'idGusto', as:'Potes'});
};


module.exports = Gustos;