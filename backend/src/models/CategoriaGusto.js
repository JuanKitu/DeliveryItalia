const Sequelize = require('sequelize');
const sequilize = require('../database/database.js');

const CategoriaGusto = sequilize.define('categoriaGusto',{
    idCategoria:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },
    nombre:{
        type:Sequelize.STRING(50)
    },
},{
    timestamps: false
});
export default CategoriaGusto;