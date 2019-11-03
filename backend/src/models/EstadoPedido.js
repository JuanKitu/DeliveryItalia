const Sequelize = require('sequelize');
const sequilize = require('../database/database.js');

const EstadoPedido = sequilize.define('estadoPedido',{
    idEstado:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },
    idPedido:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },
    nombre:{
        type:Sequelize.STRING(50)
    },
    fechaInicioEstado:{
        type:Sequelize.DATE
    },
    fechaFinEstado:{
        type:Sequelize.DATE
    },
    descripcion:{
        type:Sequelize.TEXT
    },
},{
    timestamps: false
});
export default EstadoPedido;