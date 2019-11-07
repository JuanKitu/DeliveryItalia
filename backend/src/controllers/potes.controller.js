const controller = {};
const Potes = require('../models/Potes.js');
const GustosEnPotes = require('../models/GustosEnPotes');
const Gustos = require('../models/Gustos.js');


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
            attributes:['idPote','tamanio','cantidad','cantidadMaxima']
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
        const {tamanio,cantidad,cantidadMaxima} = req.body;
        const newPote = await Potes.update({
            tamanio,
            cantidad,
            cantidadMaxima
        },
        {
            where: {
                idPote
            }
        });
        const pote = await Potes.findOne({
            attributes:['idPote','tamanio','cantidad','cantidadMaxima'],
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
            attributes: ['idPote', 'tamanio','cantidad','cantidadMaxima']
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
controller.getGustos = async (req,res)=>{
    try{
        const {idPote} = req.params
        const gustos = await GustosEnPotes.findAll({
            where:{
                idPote
            }
        });
        return res.json({
            data:gustos
        });
    }catch(error){
        console.log(error);
        return res.json({
            error:'The server has been error',
            data:{}
        });
    };
};


/*--- FALTA VERIFICAR QUE SI SELECCIONA EL MISMO GUSTO, SE DEBE INCREMENTAR EL CONTADOR DE "VECESUSADO" ---*/
controller.addGusto = async (req,res)=>{
    try{
        const {idPote} = req.params;
    const {idGusto} = req.body;
    const pote = await Potes.findOne({
        where:{
            idPote
        },
        attributes:['idPote','cantidad','cantidadMaxima']
    });

    if(pote.cantidad<pote.cantidadMaxima){
        const gustoSeleccionado = await Gustos.findOne({
            where:{
                idGusto
            },
            attributes:['idGusto']
        });
        //HACER UN IF CON GUSTO Y POTE
        console.log(gustoSeleccionado);
        const newGustoEnPote = await GustosEnPotes.create({
            idGusto,
            idPote
        })
        const addCantidad = pote.cantidad+1;
        await Potes.update({
                cantidad:addCantidad,
            },
            {
            where:{
                idPote
            }
        })
        return res.json({
            message:'The gusto has been asignate by pote',
            data: newGustoEnPote
        })
    }
    }catch(error){
        console.log(error);
        return res.json({
            error:'The server has been error',
            data:{}
        })
    }


}
module.exports = controller;