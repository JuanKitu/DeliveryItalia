const Pedidos = require('../models/Pedidos.js');
const ItemPedido = require('../models/ItemPedido.js');
const EstadoPedidos = require('../models/EstadoPedidos.js');
const Sucursales = require('../models/Sucursales.js');
const Clientes = require('../models/Clientes.js');
const Potes = require('../models/Potes.js');
const Producto = require('../models/Producto.js');
const Constante_pote = require('../models/Constante_pote.js');
const controller = {};
const process = require('process');
process.env.TZ = 'UTC-3';
/*--- Create of pedido ---*/
controller.new = async (req, res) => {
    const { fechaPedido, cuit, idDomicilio, idCliente, idSucursal, idMedioPago, descripcion } = req.body;
    try {
        const [day, month, year] = fechaPedido.split("-");//I destruct the string to accommodate the format of the date at ease :)
        const newFechaPedido = new Date(year, month - 1, day);//No se porque pero siempre te hace un mes adelantado
        const newPedido = await Pedidos.create({
            fechaPedido: newFechaPedido,
            cuit,
            idDomicilio,
            idCliente,
            idSucursal,
            idMedioPago,
            descripcion
        });
        if (newPedido) {
            return res.json({
                message: 'The Pedido has been created',
                data: newPedido
            });
        };
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    };
};
/*--- Query of pedido ---*/
controller.getAll = async (req, res) => {
    try {
        const pedidos = await Pedidos.findAll();
        return res.json({
            data: pedidos
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    };
};
/*--- Edit of pedido ---*/
controller.change = async (req, res) => {
    const { idPedido } = req.params;
    const { fechaPedido, montoTotal, cuit, idDomicilio, idCliente, idSucursal, idMedioPago, descripcion } = req.body;
    const [day, month, year] = fechaPedido.split("-");//I destruct the string to accommodate the format of the date at ease :)
    console.log(year);
    const newFechaPedido = new Date(year, month - 1, day, 0, 0, 0);
    console.log(newFechaPedido);
    try {
        await Pedidos.update({
            fechaPedido: newFechaPedido,
            montoTotal,
            cuit,
            idDomicilio,
            idCliente,
            idSucursal,
            idMedioPago,
            descripcion
        },
            {
                where: {
                    idPedido
                }
            });
        const pedido = await Pedidos.findOne({
            where: {
                idPedido
            }
        });
        return res.json({
            message: 'The pedido has been changed',
            data: pedido
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    };
};
/*--- Delete of pedido ---*/
controller.delete = async (req, res) => {
    try {
        const { idPedido } = req.params;

        const deleteRowCountPedido = await Pedidos.destroy({
            where: {
                idPedido
            }
        });
        const deleteRowCountEstadoPedido = await EstadoPedido.destroy({
            where: {
                idPedido
            }
        });
        const deleteRowCountItemPedido = await ItemPedido.destroy({
            where: {
                idPedido
            }
        });
        return res.json({
            message: 'The Pedido has been deleted',
            countPedido: deleteRowCountPedido,
            countEstadoPedido: deleteRowCountEstadoPedido,
            countItemPedido: deleteRowCountItemPedido

        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    };
};
/*--- Find of pedido ---*/
controller.getById = async (req, res) => {
    const { idPedido } = req.params
    try {
        const pedido = await Pedidos.findOne({
            where: {
                idPedido
            }
        });
        return res.json({
            data: pedido
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    };
};
/*--- Find Sucursal by pedido ---*/
controller.getSucursal = async (req, res) => {
    const { idPedido } = req.params;
    try {
        const pedido = await Pedidos.findOne({
            where: {
                idPedido
            }
        });
        const idSucursal = pedido.idSucursal;
        console.log(pedido);
        const sucursal = await Sucursales.findOne({
            where: {
                idSucursal
            }
        });
        res.json({
            data: sucursal
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    }
};
/*--- Find Cliente by pedido ---*/
controller.getCliente = async (req, res) => {
    const { idPedido } = req.params;
    try {
        const pedido = await Pedidos.findOne({
            where: {
                idPedido
            }
        });
        const idCliente = pedido.idCliente;
        const cliente = await Clientes.findOne({
            where: {
                idCliente
            }
        });
        res.json({
            data: cliente
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    }
};
/*--- Calculate Total Amuont of pedido  ---*/
controller.calculateTotalAmount = async (req,res)=>{
    const {idPedido} = req.params;
    try{
        itemsPedidos = await ItemPedido.findAll({
            where:{
                idPedido
            }
        });
        for(let inc = 0;inc<itemsPedidos.length;inc++){
            const auxPrecioTotal = itemsPedidos[inc].precioTotal;
            //verificamos que el precio total tenga un valor valido
            if(!auxPrecioTotal){
                if(auxPrecioTotal <= 0){
                    res.json({
                        error:'missing items of the car',
                        data:[]
                    });
                };
            };
        };
        let montoTotal = 0;
        for(let inc = 0;inc<itemsPedidos.length;inc++){
            const auxPrecioTotal = itemsPedidos[inc].precioTotal;
            montoTotal = montoTotal + auxPrecioTotal;
        };
        
        await Pedidos.update({
            montoTotal
        },
        {
            where:{
                idPedido
            }
        });
        const pedido = await Pedidos.findOne({
            where:{
                idPedido
            }
        });
        res.json({
            message:'The monto total has been updated',
            data:pedido
        });
    }catch(error){
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    }
};
/*######################################## EstadoPèdido API REST ########################################*/
/*--- Create of EstadoPedido ---*/
controller.newEstadoPedido = async (req, res) => {
    const { idPedido } = req.params;
    const { nombre, descripcion } = req.body;
    try {
        const today= Date.now();
        const fechaInicioEstado = new Date (today);
        const newEstadoPedido = await EstadoPedidos.create({
            idPedido,
            nombre,
            fechaInicioEstado,
            descripcion
        });
        if (newEstadoPedido) {
            return res.json({
                message: 'The estado has been created',
                data: newEstadoPedido
            });
        };
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    };
};
/*--- Find All EstadoPedidos ---*/
controller.getAllEstadosPedidos = async (req, res) => {
    const { idPedido } = req.params;
    try {
        const estadoPedidos = await EstadoPedidos.findAll({
            where: {
                idPedido
            }
        });
        return res.json({
            data: estadoPedidos
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    }
};
/*--- Edit of EstadoPedido ---*/
controller.changeEstadoPedidos = async (req, res) => {
    const { idPedido, idEstado } = req.params;
    const { nombre, descripcion } = req.body;
    try {
        const fechaIncioEstado = Date.now();
        await EstadoPedidos.update({
            nombre,
            fechaIncioEstado,
            descripcion
        },
            {
                where: {
                    idEstado,
                    idPedido
                }
            });
        const estadoPedido = await EstadoPedidos.findOne({
            where: {
                idEstado,
                idPedido
            }
        });
        return res.json({
            message: 'The EstadoPedido has been changed',
            data: estadoPedido
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    };
};
/*--- Delete of EstadoPedido ---*/
controller.deleteEstadoPedidos = async (req, res) => {
    try {
        const { idEstado, idPedido } = req.params;
        const deleteRowCount = await EstadoPedidos.destroy({
            where: {
                idEstado,
                idPedido
            }
        });
        return res.json({
            message: 'The EstadoPedido has been deleted',
            count: deleteRowCount,
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    };
};
/*--- Find One EstadoPedido ---*/
controller.getEstadoById = async (req, res) => {
    const { idPedido, idEstado } = req.params;
    try {
        const estadoPedido = await EstadoPedidos.findOne({
            where: {
                idPedido,
                idEstado
            }
        });
        return res.json({
            data: estadoPedido
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    }
};
/*--- Finsh/notFiinish EstadoPedido ---*/
controller.getFinishEstado = async (req, res) => {
    const { idPedido, idEstado } = req.params;
    try {
        const oldEstadoPedido = await EstadoPedidos.findOne({
            where: {
                idPedido,
                idEstado
            }
        });
        if (!oldEstadoPedido.fechaFinEstado) {
            const today= Date.now();
            const fechaFinEstado = new Date (today);
            await EstadoPedidos.update({
                fechaFinEstado
            },
                {
                    where: {
                        idPedido,
                        idEstado
                    }
                });
            const estadoPedido = await EstadoPedidos.findOne({
                where: {
                    idPedido,
                    idEstado
                }
            });
            return res.json({
                message: 'The estado has been finished',
                data: estadoPedido
            });
        };
        //The estado already finished
        const fechaFinEstado = null;
        await EstadoPedidos.update({
            fechaFinEstado
        },
            {
                where: {
                    idEstado,
                    idPedido
                }
            });
        //change value fechafinestado to null
        const estadoPedido = await EstadoPedidos.findOne({
            where: {
                idPedido,
                idEstado
            }
        });
        return res.json({
            message: 'The estado has not been finished',
            data: estadoPedido
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    }
};

/*######################################### ItemPedido API REST #########################################*/
/*--- Create of ItemPedido by Pedido ---*/
controller.newItemPedidos = async (req, res) => {
    const { idPedido } = req.params;
    try {
        const newItemPedido = await ItemPedido.create({
            idPedido
        });
        if (newItemPedido) {
            return res.json({
                message: 'The ItemPedido has been created',
                data: newItemPedido
            });
        };
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    }
};
/*--- Delete of ItemPedido by Pedido ---*/
controller.deleteItemPedidos = async (req, res) => {
    try {
        const { idItemPedido, idPedido } = req.params;
        const itemPedido = await ItemPedido.findOne({
            where: {
                idItemPedido,
                idPedido
            }
        });
        const idPote = itemPedido.idPote;
        const deleteRowCountItemPedido = await ItemPedido.destroy({
            where: {
                idItemPedido,
                idPedido
            }
        });
        if (idPote) {
            const deleteRowCountPotes = await Potes.destroy({
                where: {
                    idPote
                }
            });
            return res.json({
                message: 'The ItemPedido has been deleted',
                countItemPedido: deleteRowCountItemPedido,
                countPotes: deleteRowCountPotes,
            });
        }
        return res.json({
            message: 'The ItemPedido has been deleted',
            countItemPedido: deleteRowCountItemPedido,
            countPotes: null
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    };
};
/*--- Find All ItemPedidos ---*/
controller.getAllItemPedidos = async (req, res) => {
    const { idPedido } = req.params;
    try {
        const itemPedido = await ItemPedido.findAll({
            where: {
                idPedido
            }
        });
        res.json({
            data: itemPedido
        })
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    }
};
/*--- Find One ItemPedido ---*/
controller.getItemById = async (req, res) => {
    const { idPedido, idItemPedido } = req.params;
    try {
        const itemPedido = await ItemPedido.findOne({
            where: {
                idPedido,
                idItemPedido
            }
        });
        return res.json({
            data: itemPedido
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    }
};
/*--- Add pote by ItemPedido  ---*/
controller.addPote = async (req, res) => {
    const {idPedido, idItemPedido}=req.params;
    const { idPote, descripcion } = req.body;
    try {
        const pote = await Potes.findOne({
            where:{
                idPote
            }
        });
        if(pote){
            const cantidad = 1;
            await ItemPedido.update({
                idPote,
                cantidad,
                descripcion
            },
            {
                where:{
                    idPedido,
                    idItemPedido
                }
            });
            const itemPedido = await ItemPedido.findOne({
                where:{
                    idPedido,
                    idItemPedido
                }
            });
            res.json({
                message:'The Pote has been added to ItemPedido',
                data:itemPedido
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    }
};
/*--- Add producto by ItemPedido  ---*/
controller.addProducto = async (req, res) => {
    const {idPedido, idItemPedido}=req.params;
    const { idProducto, descripcion} = req.body;
    try {
        const producto = await Producto.findOne({
            where:{
                idProducto
            }
        });
        if(producto){
            const cantidad = 1;
            await ItemPedido.update({
                idProducto,
                cantidad,
                descripcion
            },
            {
                where:{
                    idPedido,
                    idItemPedido
                }
            });
            const itemPedido = await ItemPedido.findOne({
                where:{
                    idPedido,
                    idItemPedido
                }
            });
            res.json({
                message:'The Producto has been added to ItemPedido',
                data:itemPedido
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    }
};
/*--- Calculate Total Price by pedido  ---*/
controller.calculatepriceItem = async (req,res)=>{
    const {idPedido, idItemPedido} = req.params;
    try{
        const itemPedido = await ItemPedido.findOne({
            where:{
                idPedido,
                idItemPedido
            }
        });
        const cantidad = itemPedido.cantidad;
        //si el item es sobre un producto
        if(itemPedido.idProducto){
            const idProducto = itemPedido.idProducto;
            const producto = await Producto.findOne({
                where:{
                    idProducto
                }
            });
            const precio = producto.precio;
            const precioTotal = precio*cantidad;
            await ItemPedido.update({
                precioTotal
            },
            {
                where:{
                    idPedido,
                    idItemPedido
                }
            });
            const updateItemPedido = await ItemPedido.findOne({
                where:{
                    idPedido,
                    idItemPedido
                }
            });
            res.json({
                message:'The ItemPedido has been updated',
                data:updateItemPedido
            });
        };
        //Si el item es sobre un pote de helado
        if(itemPedido.idPote){
            const idPote = itemPedido.idPote;
            const pote = await Potes.findOne({
                where:{
                    idPote
                }
            });
            const weight = pote.tamanio;
            const constante_pote = await Constante_pote.findOne({
                where:{
                    weight
                }
            });
            const cantidad = itemPedido.cantidad;
            const precio = constante_pote.price;
            const precioTotal = precio*cantidad;
            await ItemPedido.update({
                precioTotal
            },
            {
                where:{
                    idPedido,
                    idItemPedido
                }
            });
            const updateItemPedido = await ItemPedido.findOne({
                where:{
                    idPedido,
                    idItemPedido
                }
            });
            res.json({
                message:'The ItemPedido has been updated',
                data:updateItemPedido
            });
        };
        if(!ItemPedido.idPote && ItemPedido.idProducto){
            return res.json({
                error:'The itemPedido has not been linked producto or pote'
            });
        }
    }catch(error){
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    }
};
/*--- Change cantidad item Pedido by Pedido ---*/
controller.changeQuantity = async (req,res)=>{
    const {idPedido, idItemPedido}=req.params;
    const { cantidad } = req.body;
    try{
        if(cantidad <= 0){
            res.json({
                error:'The cantidad isnt can zero or negative'
            })
        };
        await ItemPedido.update({
            cantidad
        },
        {
            where:{
                idPedido,
                idItemPedido
            }
        });
        const itemPedido = await ItemPedido.findOne({
            where:{
                idPedido,
                idItemPedido
            }
        });
        return res.json({
            message:'The cantidad has been updated',
            data:itemPedido
        });
    }catch(error){
        console.log(error);
        return res.json({
            error: 'The server has been error'
        }); 
    }
};
controller.getItemContent = async (req,res)=>{
    const {idPedido, idItemPedido} = req.params;
    try{
        const itemPedido = await ItemPedido.findOne({
            where:{
                idPedido,
                idItemPedido
            }
        });
        if(itemPedido.idPote){
            const pote = await Potes.findOne({
                where:{
                    idPote:itemPedido.idPote
                }
            });
            return res.send({
                data:pote
            });          
        };
        if(itemPedido.idProducto){
            const producto = await Producto.findOne({
                where:{
                    idProducto:itemPedido.idProducto
                }
            });
            return res.send({
                data:producto
            });          
        };
        return res.json({
            error:'The item has no content'
        });
    }catch(error){
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });   
    }
};
/*#######################################################################################################*/
module.exports = controller;