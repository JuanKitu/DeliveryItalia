const Sequelize = require('sequelize');
const sequilize = require('../database/database.js');
const Gustos = require('./Gustos');
const GustosEnPotes = require('./GustosEnPotes');
const ItemPedido = require('./ItemPedido');

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
/*--- cardinaly with Gustos ---*/
Potes.beLongsToMany(Gustos,{through:'GustosEnPotes',foreingKey:'idPote',as:'Gustos'});
/*--- cardinaly with ItemPedido ---*/
Potes.hasMany(ItemPedido,{foreingKey:'idPote',sourceKey:'idPote'});
ItemPedido.beLongsTo(Potes,{foreingKey:'idPote',sourceKey:'idPote'});
export default Potes;