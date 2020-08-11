const Calles = require('../models/Calles.js');
const Apodos = require('../models/Apodos.js');
const Domicilios = require('../models/Domicilios.js');
const controller = {};
/*--- Create a Calle ---*/
controller.new = async (req, res) => {
    const { nombreFormal } = req.body;
    try {
        const newCalle = await Calles.create({
            nombreFormal
        },
            {
                fields: ['nombreFormal']
            })
        if (newCalle) {
            return res.json({
                message: 'The Calle has been created',
                data: newCalle
            });
        };
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error',
            data: {}
        });
    }
};
/*--- Query a Calle ---*/
controller.getAll = async (req, res) => {
    try {
        const calles = await Calles.findAll();
        return res.json({
            data: calles
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    }
};
/*--- Edit a calle ---*/
controller.change = async (req, res) => {
    const { idCalle } = req.params;
    const { nombreFormal } = req.body;
    try {
        await Calles.update({
            nombreFormal
        },
            {
                where: {
                    idCalle
                }
            });
        const calle = await Calles.findOne({
            where: {
                idCalle
            }
        });
        return res.json({
            message: 'The Calle has been changed',
            data: calle
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    }

};
/*--- Delete a calle ---*/
controller.delete = async (req, res) => {
    try {
        const { idCalle } = req.params;
        const deleteRowCount = await Calles.destroy({
            where: {
                idCalle
            }
        });
        return res.json({
            message: 'The calle has been deleted',
            count: deleteRowCount
        });

    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error',
            data: {}
        });
    };
};
/*--- find a calle ---*/
controller.getById = async (req, res) => {
    const { idCalle } = req.params;
    try {
        calle = await Calles.findOne({
            where: {
                idCalle
            }
        });
        res.json({
            data: calle
        })
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error',
            data: {}
        });
    }
};
/*--- Query all apodos ---*/
controller.getApodos = async (req, res) => {
    const { idCalle } = req.params;
    try {
        apodos = await Apodos.findAll({
            where: {
                idCalle
            }
        });
        res.json({
            data: apodos
        })
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error',
            data: {}
        });
    }
}; 
/*--- Query all domicilios ---*/
controller.getDomicilios = async (req, res) => {
    const { idCalle } = req.params;
    try {
        domicilios = await Domicilios.findAll({
            where: {
                idCalle
            }
        });
        res.json({
            data: domicilios
        })
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error',
            data: {}
        });
    }
}; 
module.exports = controller;