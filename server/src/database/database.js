const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'iceCreamItalia',//Data Base
    'postgres',//user
    'investigacion',//password
    {
        host:'localhost',
        port:5433,
        dialect:'postgres',
        pool:{
            max:5,
            mix:0,
            require:30000,
            idle:1000
        },
        logging: false
    }
)

module.exports = {sequelize};