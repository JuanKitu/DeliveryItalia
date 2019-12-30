const MedioPago = require('../models/MedioPago.js');
const controller = {};
/*--- Create a apodo ---*/
controller.new = async (req, res) => {
    const { descripcion } = req.body;
    try {
        const newMedioPago = await MedioPago.create({
            descripcion
        });
        if(newMedioPago){
            return res.json({
                message:'The Medio de Pago has been created',
                data:newMedioPago
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
        medioPago = await MedioPago.findAll();
        return res.json({
            data:medioPago
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
    const {idMedioPago} = req.params;
    const { descripcion} = req.body;
    try {
        await MedioPago.update({
            descripcion
        },
        {
            where:{
                idMedioPago
            },
        });
        const medioPago = await MedioPago.findOne({
            where:{
                idMedioPago
            }
        });
        return res.json({
            message: 'The Medio de Pago has been changed',
            data:medioPago
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
        const { idMedioPago } = req.params;
        const deleteRowCount = await MedioPago.destroy({
            where: {
                idMedioPago
            }
        });
        return res.json({
            message: 'The Medio de Pago has been deleted',
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
    const { idMedioPago } = req.params;
    try {
        medioPago = await MedioPago.findOne({
            where:{
                idMedioPago
            }
        });
        return res.json({
            data:medioPago
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    }
};

module.exports = controller;