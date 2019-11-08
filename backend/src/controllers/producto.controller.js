const controller = {};
const multer = require('multer')
const fs = require('fs');
Producto = require('../models/Producto.js');
/*--- Inicializando el Multer ---*/
const storage =   multer.diskStorage({
    destination: function (req, file, callback) {
      fs.mkdir('./uploads', function(err) {
          if(err) {
              console.log(err.stack)
          } else {
              callback(null, './uploads');
          }
      })
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname + '-' + Date.now());
    }
  });

/*--- Create a product ---*/
controller.new = async (req, res) => {
    const { nombre, descripcion, precio } = req.body;
    try {
        const newProducto = await Producto.create({
            nombre,
            descripcion,
            precio
        }, {
            fields: ['nombre', 'descripcion', 'precio']
        });
        if (newProducto) {
            return res.json({
                message: 'The Productos has been created',
                data: newProducto
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
/*--- Query of products ---*/
controller.getAll = async (req, res) => {
    try {
        const productos = await Producto.findAll();
        return res.json({
            data: productos
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    };
};
/*--- Edit a product ---*/
controller.change = async (req, res) => {
    try {
        const { idProducto } = req.params;
        const { nombre, descripcion, precio } = req.body;
        const newProducto = await Producto.update({
            nombre,
            descripcion,
            precio
        },
            {
                where: {
                    idProducto
                }
            });
        const producto = await Producto.findOne({
            attributes: ['idProducto', 'nombre', 'descripcion', 'precio'],
            where: {
                idProducto
            }

        });
        return res.json({
            message: 'The Producto has been updated',
            data: producto
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error',
            data: {}
        });
    };

};
/*--- Delete a product ---*/
controller.delete = async (req, res) => {
    try {
        const { idProducto } = req.params;
        const deleteRowCount = await Producto.destroy({
            where: {
                idProducto
            }
        });
        return res.json({
            message: 'The Producto has been deleted',
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
/*--- Find a product ---*/
controller.getById = async (req, res) => {
    try {
        const { idProducto } = req.params;
        const aProducto = await Producto.findOne({
            where: {
                idProducto
            },
            attributes: ['idProducto', 'nombre', 'descripcion', 'precio']
        });
        return res.json({
            data: aProducto
        })
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error',
            data: {}
        });

    };


};

controller.uploadImage = async (req,res)=>{
    const idProducto = req.params;
    const foto = multer({ storage : storage}).single('imagen');
    foto(req,res, async function(err) {
        if(err) {
            return res.json({
                message:'Error uploading file.'
            });
        }
        await Producto.update({
            imagen
        },{
            where:{
                idProducto
            }
        })
        res.end("File is uploaded");
    });
};

controller.getImage = async                                                                                                                                (req,res)=>{
    const idProducto = req.params;
    const producto = await Producto.findOne({
        where:{
            idProducto
        },
        attributes:['idProducto','foto']
    })
    const dir = producto.foto;
    res.sendFile(__dirname + dir);
};


module.exports = controller;