const controller = {};
const Gustos = require('../models/Gustos.js');

/*--- Create a gustos ---*/
controller.new = async (req, res) => {
    const { nombre, descripcion, disponible, idCategoria } = req.body;
    try {
        const newGusto = await Potes.create({
            nombre,
            descripcion,
            disponible,
            idCategoria
        }, {
            fields: ['nombre','descripcion','disponible','idCategoria']
        });
        if (newGusto) {
            return res.json({
                message: 'The Gusto has been created',
                data: newGusto
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
/*--- Query of gusto ---*/
controller.getAll = async (req, res) => {
    try {
        const gusto = await Gustos.findAll({
            attributes:['idGusto','nombre','descripcion','disponible','idCategoria']
        });
        return res.json({
            data: gusto
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    };
};
/*--- Edit a gusto ---*/
controller.change = async (req, res) => {
    try{
        const {idGusto} = req.params;
        const {nombre, descripcion,disponible,idCategoria} = req.body;
        const newGusto = await Gustos.update({
            nombre,
            descripcion,
            disponible,
            idCategoria
        },
        {
            where: {
                idGusto
            }
        });
        const gusto = await Gustos.findOne({
            attributes:['idCategoria','nombre'],
            where:{
                idCategoria
            }
           
        });
        return res.json({
            message:'The gusto has been updated',
            data:gusto
        });
    }catch(error){
        console.log(error);
        return res.json({
            error:'The server has been error',
            data:{}
        });
    };

};
/*--- Delete a gusto ---*/
controller.delete = async (req, res) => {
    try{
        const {idGusto} = req.params;
        const deleteRowCount = await Gustos.destroy({
            where:{
                idGusto
            }
        });
        return res.json({
            message:'The gusto has been deleted',
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
/*--- Find a gusto ---*/
controller.getById = async (req, res) => {
    try {
        const { idGusto } = req.params;
        const gusto = await Gustos.findOne({
            where: {
                idGusto
            },
            attributes: ['idGusto', 'nombre','descripcion','disponible','idCategoria']
        });
        return res.json({
            data:gusto
        })
    }catch(error){
        console.log(error);
        return res.json({
            error:'The server has been error',
            data:{}
        });

    };
    

};
/*--- Select of Gusto since CategoriaGusto ---*/
controller.getByIdCategoriaGusto = async (req,res) =>{
    try{
      const {idCategoria} = req.params;
      const gustos = await Gustos.findAll({
          where:{
              idCategoria
          },
          attributes:['idGusto','nombre','descripcion','disponible','idCategoria']
          });
          return res.json({
              data:gustos
          });
      }catch(error){
        console.log(error)
        return res.json({
            error:'The server has been error'
        });
    }
}
module.exports = controller;