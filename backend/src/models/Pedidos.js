const Sequelize = require('sequelize');
const sequilize = require('../database/database.js');
const ItemPedido = require('./ItemPedido');
const EstadoPedido = require('./EstadoPedido');

const Pedidos = sequilize.define('pedidos',{
    idPedido:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },
    fechaPedido:{
        type:Sequelize.DATE
    },
    montoTotal:{
        type:Sequelize.REAL
    },
    montoPagaCliente:{
        type:Sequelize.REAL
    },
    cuit:{
        type:Sequelize.INTEGER
    },
    idDomicilio:{
        type:Sequelize.INTEGER
    },
    idCliente:{
        type:Sequelize.INTEGER
    },
    idSucursal:{
        type:Sequelize.INTEGER
    },
    descripcion:{
        type:Sequelize.TEXT
    }

},{
    timestamps: false
});
/*--- Composition with ItemPedido ---*/
Pedidos.hasMany(ItemPedido,{foreingKey:'idPedido',sourceKey:'idPedido'});
ItemPedido.beLongsTo(Pedidos,{foreingKey:'idPedido',sourceKey:'idPedido'});
/*--- Composition with EstadoPedido ---*/
Pedidos.hasMany(EstadoPedido,{foreingKey:'idPedido',sourceKey:'idPedido'});
EstadoPedido.beLongsTo(Pedidos,{foreingKey:'idPedido',sourceKey:'idPedido'});
export default Pedidos;