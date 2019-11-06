const Sequelize = require('sequelize');
const {sequelize} = require('../database/database.js');
const Gustos = require('./Gustos');


const CategoriaGusto = sequelize.define('categoriaGusto',{
    idCategoria:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },
    nombre:{
        type:Sequelize.STRING(50)
    },
},{
    timestamps: false,
    freezeTableName: true //this is so that sequelize does not pluralize the table
});
/*--- cardinaly with Gustos ---*/
CategoriaGusto.hasMany(Gustos,{foreingKey:'idCategoria',sourceKey:'idCategoria'});
Gustos.belongsTo(CategoriaGusto,{foreingKey:'idCategoria',sourceKey:'idCategoria'});



module.exports = CategoriaGusto;