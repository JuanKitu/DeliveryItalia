const controller = {};
Producto = require('../models/Producto.js');
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