const Sequelize = require('sequelize');
const sequilize = require('../database/database.js');
const Potes = require('./Potes');
const GustosEnPotes = require('./GustosEnPotes');

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
/*--- cardinaly with Pote ---*/
Gustos.beLongsToMany(Potes,{through:'GustosEnPotes',foreingKey:'idGusto', as:'Potes'});

export default Gustos;