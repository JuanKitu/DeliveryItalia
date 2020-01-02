const Sequelize = require('sequelize');
const {sequelize} = require('../database/database.js');
const Gustos = require('./Gustos');
const GustosEnPotes = require('./GustosEnPotes');
const ItemPedido = require('./ItemPedido');

const Potes = sequelize.define('potes',{
    idPote:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    tamanio:{
        type:Sequelize.REAL,
    },
    cantidad:{
        type:Sequelize.INTEGER,
    }
},{
    timestamps: false,
    freezeTableName: true //this is so that sequelize does not pluralize the table
});
/*--- cardinaly with Gustos ---*/

Potes.associate = (models) => {
    Potes.belongsToMany(models.Gustos,{through:'GustosEnPotes',as:'Gustos',foreignKey:'idPote'});
  };
//Gustos.belongsToMany(Potes,{through:GustosEnPotes,foreingKey:'idGusto', as:'Potes'});
/*--- cardinaly with ItemPedido ---*/
Potes.hasMany(ItemPedido,{foreignKey:'idPote',sourceKey:'idPote'});

ItemPedido.belongsTo(Potes,{foreignKey:'idPote',sourceKey:'idPote'});
module.exports = Potes;