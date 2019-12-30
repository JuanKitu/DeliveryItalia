const EstadoPedidos = require('../models/EstadoPedidos.js');
const Pedidos = require('../models/Pedidos.js');
const controller = {};

/*--- Query of EstadoPedido ---*/
controller.getAll = async (req, res) => {
    try {
        const estadoPedidos = await EstadoPedidos.findAll();
        return res.json({
            data: estadoPedidos
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    };
};
/*--- Edit of EstadoPedido ---*/
controller.change = async (req, res) => {
    const {idEstado} = req.params;
    const {nombre,descripcion, idPedido}=req.body;
    try {
        const fechaIncioEstado = Date.now();
        await EstadoPedidos.update({
            nombre,
            fechaIncioEstado,
            descripcion
        },
        {
            where:{
                idEstado,
                idPedido
            }
        });
        const estadoPedido = await EstadoPedidos.findOne({
            where:{
                idEstado,
                idPedido
            }
        });
        return res.json({
            message:'The EstadoPedido has been changed',
            data:estadoPedido
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    };
};
/*--- Delete of EstadoPedido ---*/
controller.delete = async (req, res) => {
    try {
        const { idEstado } = req.params;
        const deleteRowCount = await EstadoPedidos.destroy({
            where: {
                idEstado
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
/*--- Find of EstadoPedido ---*/
controller.getByid = async (req, res) => {
    const {idEstado} = req.params;
    try {
        const estadoPedido = await EstadoPedidos.findOne({
            where:{
                idEstado
            }
        });
        res.json({
            data:estadoPedido
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    };
};

module.exports=controller;