const Apodos = require('../models/Apodos.js');
const controller = {};
/*--- Create a apodo ---*/
controller.new = async (req, res) => {
    const { nombreCalle, idCalle } = req.body;
    try {
        const newApodo = await Apodos.create({
            nombreCalle,
            idCalle
        },
        {
            fields: ['nombreCalle','idCalle']
        });
        if(newApodo){
            return res.json({
                message:'The Apodo has been created',
                data:newApodo
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
        apodos = await Apodos.findAll({
            attributes: ['idNombreCalle','nombreCalle','idCalle']
        });
        return res.json({
            data:apodos
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
    const {idNombreCalle} = req.params;
    const { nombreCalle, idCalle } = req.body;
    try {
        await Apodos.update({
            nombreCalle,
            idCalle
        },
        {
            where:{
                idNombreCalle
            },
        },
        {
            fields: ['idNombreCalle','nombreCalle','idCalle']
        });
        const apodo = await Apodos.findOne({
            where:{
                idNombreCalle
            }
        });
        return res.json({
            message: 'The apodo has been changed',
            data:apodo
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
        const { idNombreCalle } = req.params;
        const deleteRowCount = await Apodos.destroy({
            where: {
                idNombreCalle
            }
        });
        return res.json({
            message: 'The apodo has been deleted',
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
    const { idNombreCalle } = req.params;
    console.log(idNombreCalle);
    try {
        apodo = await Apodos.findOne({
            where:{
                idNombreCalle:idNombreCalle
            }
        });
        return res.json({
            data:apodo
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    }
};

module.exports = controller;