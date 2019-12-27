const controller = {};
const multer = require('multer')
const fs = require('fs');
Producto = require('../models/Producto.js');
/*--- Inicializando el Multer ---*/

let fileName = '';
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/public/images/product/');
    },
    filename: function (req, file, cb) {
        cb(null, fileName + '.png');
    }
});
let upload = multer({ storage: storage }).single('image');

/*--- Create a product ---*/
controller.new = async (req, res) => {
    console.log(req.params);
    const { nombre, descripcion, precio } = req.body;
    try {
        const newProducto = await Producto.create({
            nombre,
            descripcion,
            precio
        }, {
            fields: ['nombre', 'descripcion', 'precio']
        });

        //Este bloque seria para subir una imagen de producto, todavia es una beta
        fileName = newProducto.idProducto;
        upload(req, res, async function (err) {
            res.json({
                success: true,
                menssage: 'image upload!'
            });
        });
        //termina el bloque

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

module.exports = controller;