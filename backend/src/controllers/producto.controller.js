const controller = {};
Producto = require('../models/Producto.js');


/*--- Create a product ---*/
controller.new = async (req,res)=>{
    const {nombre,descripcion,precios} = req.body;
    try{
        const newProducto = await Producto.create({
            nombre,
            descripcion,
            precios
        },{
            fields:['nombre','descripcion','precios']
        });
        if(newProducto){
            return res.json({
                message:'The Productos has been created',
                data:newProducto
            })
        }
    }catch(error){
        console.log(error);
        return res.json({
            error:'The server has been problems',
            data:{}
        })

    };
};

/*--- Query of products ---*/
controller.getAll = async (req,res)=>{
    try{
        const productos = await Producto.findAll();
        return res.json({
            data: productos
        });
    }catch(error){
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    };    
}





module.exports = controller;