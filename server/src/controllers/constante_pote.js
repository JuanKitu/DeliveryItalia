const Constante_pote = require('../models/Constante_pote.js');
const controller = {};
/*--- Create a apodo ---*/
controller.new = async (req, res) => {
    const { weight, price, maxQuantity} = req.body;
    try {
        const newConstante_pote = await Constante_pote.create({
            weight,
            price,
            maxQuantity
        });
        if(newConstante_pote){
            return res.json({
                message:'The Constante pote has been created',
                data:newConstante_pote
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
        constante_potes = await Constante_pote.findAll();
        return res.json({
            data:constante_potes
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
    const {idConstantePote} = req.params;
    const { weight, price, maxQuantity} = req.body;
    try {
        await Constante_pote.update({
            weight,
            price,
            maxQuantity
        },
        {
            where:{
                idConstantePote
            },
        });
        const constante_potes = await Constante_pote.findOne({
            where:{
                idConstantePote
            }
        });
        return res.json({
            message: 'The constante pote has been changed',
            data:constante_potes
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
        const { idConstantePote } = req.params;
        const deleteRowCount = await Constante_pote.destroy({
            where: {
                idConstantePote
            }
        });
        return res.json({
            message: 'The constante pote has been deleted',
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
    const { idConstantePote } = req.params;
    try {
        constante_potes = await Constante_pote.findOne({
            where:{
                idConstantePote
            }
        });
        return res.json({
            data:constante_potes
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    }
};

module.exports = controller;