const Sequelize = require('sequelize');
const sequilize = require('../database/database.js');

const Sucursales = sequilize.define('sucursales',{
    idSucursal:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },
    numeroTelefono:{
        type:Sequelize.INTEGER
    },
    direccion:{
        type:Sequelize.STRING(100)
    }
},{
    timestamps: false
});
export default Sucursales;