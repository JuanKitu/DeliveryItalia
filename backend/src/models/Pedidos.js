const Sequelize = require('sequelize');
const sequilize = require('../database/database.js');

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
export default Pedidos;