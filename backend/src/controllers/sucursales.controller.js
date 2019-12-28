const controller = {};
Sucursales = require('../models/Sucursales.js');
/*--- Create a Sucursal ---*/
controller.new = async (req, res) => {
    const { numeroTelefono, direccion, nombre } = req.body;
    try {
        const newSucursal = await Sucursales.create({
            numeroTelefono,
            direccion,
            nombre
        },
            {
                fields: ['nombre','numeroTelefono', 'direccion']
            });
        if (newSucursal) {
            return res.json({
                message: 'The sucursal has been created',
                data: newSucursal
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been problems',
            data: {}
        });
    }
};
/*--- Query a Sucursal ---*/
controller.getAll = async (req, res) => {
    try {
        const sucursales = await Sucursales.findAll();
        return res.json({
            data: sucursales
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been problems',
            data: {}
        });
    }
};
/*--- Edit a Sucursal ---*/
controller.change = async (req, res) => {
    const { idSucursal } = req.params;
    const { numeroTelefono, direccion, nombre } = req.body;
    try {
        await Sucursales.update({
            numeroTelefono,
            direccion,
            nombre
        },
            {
                where: {
                    idSucursal
                }
            });
        const sucursal = await Sucursales.findOne({
            where: {
                idSucursal
            }
        });
        return res.json({
            message: 'The sucursal has been changed',
            data: sucursal
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been problems',
            data: {}
        });
    }
};
/*--- Delete a Sucursal ---*/
controller.delete = async (req, res) => {
    const { idSucursal } = req.params;
    try {
        const deleteRowCount = await Sucursales.destroy({
            where: {
                idSucursal
            }
        });
        return res.json({
            message: 'The Sucursal has been deleted',
            count: deleteRowCount
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been problems',
            data: {}
        });
    }
};
/*--- Find a Sucursal ---*/
controller.getById = async (req,res)=>{
    const {idSucursal} = req.params;
    try{
        sucursal = await Sucursales.findOne({
            where:{
                idSucursal
            },
            attributes:['idSucursal','nombre','numeroTelefono','direccion']
        });
        res.json({
            data: sucursal
        });
    }catch(error){
        console.log(error);
        return res.json({
            error: 'The server has been problems',
            data: {}
        });
    }
};

module.exports = controller;