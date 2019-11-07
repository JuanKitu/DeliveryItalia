const controller = {};
const Potes = require('../models/Potes.js');


/*--- Create a pote ---*/
controller.new = async (req, res) => {
    const { cantidad, tamanio } = req.body;
    try {
        const newPote = await Potes.create({
            cantidad,
            tamanio,
        }, {
            fields: ['cantidad','tamanio']
        });
        if (newPote) {
            return res.json({
                message: 'The pote has been created',
                data: newPote
            })
        }
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been problems',
            data: {}
        })

    };
};
/*--- Query of pote ---*/
controller.getAll = async (req, res) => {
    try {
        const pote = await Potes.findAll({
            attributes:['idPote','tamanio','cantidad']
        });
        return res.json({
            data: pote
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    };
};
/*--- Edit a pote ---*/
controller.change = async (req, res) => {
    try{
        const {idPote} = req.params;
        const {tamanio,cantidad} = req.body;
        const newPote = await Potes.update({
            tamanio,
            cantidad
        },
        {
            where: {
                idPote
            }
        });
        const pote = await Potes.findOne({
            attributes:['idPote','tamanio','cantidad'],
            where:{
                idPote
            }
           
        });
        return res.json({
            message:'The pote has been updated',
            data:pote
        });
    }catch(error){
        console.log(error);
        return res.json({
            error:'The server has been error',
            data:{}
        });
    };

};
/*--- Delete a pote ---*/
controller.delete = async (req, res) => {
    try{
        const {idPote} = req.params;
        const deleteRowCount = await Potes.destroy({
            where:{
                idPote
            }
        });
        return res.json({
            message:'The pote has been deleted',
            count:deleteRowCount
        });

    }catch(error){
        console.log(error);
        return res.json({
            error:'The server has been error',
            data:{}
        });
    };

};
/*--- Find a pote ---*/
controller.getById = async (req, res) => {
    try {
        const { idPote } = req.params;
        const pote = await Potes.findOne({
            where: {
                idPote
            },
            attributes: ['idPote', 'tamanio','cantidad']
        });
        return res.json({
            data:pote
        })
    }catch(error){
        console.log(error);
        return res.json({
            error:'The server has been error',
            data:{}
        });

    };
    

};

module.exports = controller;