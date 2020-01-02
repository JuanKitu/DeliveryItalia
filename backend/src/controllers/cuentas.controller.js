const Cuentas = require('../models/Cuentas.js');
const controller = {};
/*--- Create a apodo ---*/
controller.new = async (req, res) => {
    const { email, password } = req.body;
    try {
        const newCuenta = await Cuentas.create({
            email,
            password
        });
        if(newCuenta){
            return res.json({
                message:'The Cuenta has been created',
                data:newCuenta
            });
        } ;
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    }
};
/*--- Query a apodo ---*/
controller.getAll = async (req, res) => {
    try {
        cuentas = await Cuentas.findAll();
        return res.json({
            data:cuentas
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    }
};
/*--- Edit a apodo ---*/
controller.change = async (req, res) => {
    const {idCuenta} = req.params;
    const { email, password} = req.body;
    try {
        await Cuentas.update({
            email,
            password
        },
        {
            where:{
                idCuenta
            },
        });
        const cuentas = await Cuentas.findOne({
            where:{
                idCuenta
            }
        });
        return res.json({
            message: 'The Cuenta has been changed',
            data:cuentas
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    }
};
/*--- Delete a apodo ---*/
controller.delete = async (req, res) => {
    try {
        const { idCuenta } = req.params;
        const deleteRowCount = await Cuentas.destroy({
            where: {
                idCuenta
            }
        });
        return res.json({
            message: 'The Cuenta has been deleted',
            count: deleteRowCount
        });

    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    }
};
/*--- Find a apodo ---*/
controller.getById = async (req, res) => {
    const { idCuenta } = req.params;
    try {
        cuenta = await Cuentas.findOne({
            where:{
                idCuenta
            }
        });
        return res.json({
            data:cuenta
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    }
};

module.exports = controller;