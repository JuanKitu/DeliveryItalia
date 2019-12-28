const Domicilios = require('../models/Domicilios.js');
const Pedidos = require('../models/Pedidos');
const Calles = require('../models/Calles.js');
const controller = {};

/*--- Create a domicilio ---*/
controller.new = async (req, res) => {
    const {numero,piso,nroDepto,referencias,entreCalles,idCalle} = req.body;
    try {
        const domicilio = await Domicilios.create({
            numero,
            piso,
            nroDepto,
            referencias,
            entreCalles,
            idCalle
        });
        if(domicilio){
            return res.json({
                message:'The domicilio has been created',
                data:domicilio
            });
        };
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    }
};
/*--- Query a domicilio ---*/
controller.getAll = async (req, res) => {
    try {
    const domicilios = await Domicilios.findAll();
    return res.json({
        data:domicilios
    });    
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    }
};
/*--- Edit a domicilio ---*/
controller.change = async (req, res) => {
    const {idDomicilio} = req.params;
    const {numero,piso,nroDepto,referencias,entreCalles,idCalle} = req.body;
    try {
        await Domicilios.update({
            numero,
            piso,
            nroDepto,
            referencias,
            entreCalles,
            idCalle     
        },
        {
            where:{
                idDomicilio
            }
        });
        const domicilio = await Domicilios.findOne({
            where:{
                idDomicilio
            }
        });
        return res.json({
            message:'The domicilio has been changed',
            data:domicilio
        });    
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    }
};
/*--- Delete a domicilio ---*/
controller.delete = async (req, res) => {
    try {
        const { idDomicilio } = req.params;
        const deleteRowCount = await Domicilios.destroy({
            where: {
                idDomicilio
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
/*--- Find a domicilio ---*/
controller.getById = async (req, res) => {
    const {idDomicilio}=req.params;
    try {
        const domicilio = await Domicilios.findOne({
            where:{
                idDomicilio
            }
        });
        return res.json({
            data:domicilio
        })
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    }
};
/*--- Find a calle by domicilio ---*/
controller.getCalle = async (req, res) => {
    const {idDomicilio}=req.params;
    try {
        const domicilio = await Domicilios.findOne({
            where:{
                idDomicilio
            }
        });
        if(domicilio){
            const idCalle = domicilio.idCalle;
            const calle = await Calles.findOne({
                where:{
                    idCalle
                }
            });
            return res.json({
                data:calle
            })
        }
        return res.json({
            data:domicilio
        })
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    }
};
/*--- Query all pedidos ---*/
controller.getPedidos = async (req, res) => {
    const { idDomicilio } = req.params;
    try {
        pedidos = await Pedidos.findAll({
            where: {
                idDomicilio
            }
        });
        res.json({
            data: pedidos
        })
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error',
            data: {}
        });
    }
}; //probar esta funcion mas adelante
module.exports = controller;