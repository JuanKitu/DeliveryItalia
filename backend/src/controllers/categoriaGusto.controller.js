const controller = {};
const CategoriaGusto = require('../models/CategoriaGusto.js');

/*--- Create a categoriaGusto ---*/
controller.new = async (req, res) => {
    const { nombre } = req.body;
    try {
        const newCategoriaGusto = await CategoriaGusto.create({
            nombre
        }, {
            fields: ['nombre']
        });
        if (newCategoriaGusto) {
            return res.json({
                message: 'The Cateogria Gusto has been created',
                data: newCategoriaGusto
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
/*--- Query of categoriaGusto ---*/
controller.getAll = async (req, res) => {
    try {
        const categoriaGusto = await CategoriaGusto.findAll();
        return res.json({
            data: categoriaGusto
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    };
};
/*--- Edit a categoriaGusto ---*/
controller.change = async (req, res) => {
    try{
        const {idCategoria} = req.params;
        const {nombre} = req.body;
        const newCategoriaGusto = await CategoriaGusto.update({
            nombre
        },
        {
            where: {
                idCategoria
            }
        });
        const categoriaGusto = await CategoriaGusto.findOne({
            attributes:['idCategoria','nombre'],
            where:{
                idCategoria
            }
           
        });
        return res.json({
            message:'The Producto has been updated',
            data:categoriaGusto
        });
    }catch(error){
        console.log(error);
        return res.json({
            error:'The server has been error',
            data:{}
        });
    };

};
/*--- Delete a categoriaGusto ---*/
controller.delete = async (req, res) => {
    try{
        const {idCategoria} = req.params;
        const deleteRowCount = await CategoriaGusto.destroy({
            where:{
                idCategoria
            }
        });
        return res.json({
            message:'The Producto has been deleted',
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
/*--- Find a categoriaGusto ---*/
controller.getById = async (req, res) => {
    try {
        const { idCategoria } = req.params;
        const categoriaGusto = await CategoriaGusto.findOne({
            where: {
                idCategoria
            },
            attributes: ['idCategoria', 'nombre']
        });
        return res.json({
            data:categoriaGusto
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