const Clientes = require('../models/Clientes.js');
const Cuentas = require('../models/Cuentas.js');
const Domicilios = require('../models/Domicilios.js');
const Pedidos = require('../models/Pedidos.js');
const controller = {};

/*--- Create of cliente ---*/ //ARREGLAR
controller.new = async (req, res) => {
    const idCuenta = req.payload.sub;
    const { dni, nombre, apellido } = req.body;
    try {
        const newCliente = await Clientes.create({
            dni,
            apellido,
            nombre,
            idCuenta
        });
        if (newCliente) {
            return res.json({
                message: 'The Cliente has been created',
                data: newCliente
            });
        };
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    };
};
/*--- Edit of cliente ---*/
controller.change = async (req, res) => {
    const idCuenta = req.payload.sub //idCuenta el cual esta logueado
    const { idCliente } = req.params;
    const { dni, nombre, apellido } = req.body;
    try {
        /*##################################### Control Permissions Cliente #####################################*/
        //find cuenta
        const cuenta = await Cuentas.findOne({
            where: {
                idCuenta
            }
        });
        const controlCliente = await Clientes.findOne({
            where: {
                idCliente
            }
        });
        if (!(cuenta.userType == 2) && !(cuenta.idCuenta === controlCliente.idCuenta)) {
            return res.json({
                error: 'Doesnt has permissions'
            })
        };
        /*#######################################################################################################*/
        await Clientes.update({
            dni,
            nombre,
            apellido
        },
            {
                where: {
                    idCliente
                }
            });
        const cliente = await Clientes.findOne({
            where: {
                idCliente
            }
        });
        return res.json({
            message: 'The Cliente has been updated',
            data: cliente
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    };
};
/*--- Delete of cliente ---*/ //ARREGLAR
controller.delete = async (req, res) => {
    const idCuenta = req.payload.sub;
    const { idCliente } = req.params;
    try {
        /*##################################### Control Permissions Cliente #####################################*/
        //find cuenta
        const cuenta = await Cuentas.findOne({
            where: {
                idCuenta
            }
        });
        const controlCliente = await Clientes.findOne({
            where: {
                idCliente
            }
        });
        if (!(cuenta.userType == 2) && !(cuenta.idCuenta === controlCliente.idCuenta)) {
            return res.json({
                error: 'Doesnt has permissions'
            });
        };
        /*#######################################################################################################*/
        const deleteRowCountDireccion = await ClienteEnDomicilios.destroy({
            where: {
                idCliente
            }
        });
        const deleteRowCountClientes = await Clientes.destroy({
            where: {
                idCliente
            }
        });
        return res.json({
            message: 'The Cliente has been deleted',
            countClientes: deleteRowCountClientes,
            countDireccion: deleteRowCountClientes
        });

    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    };
};
/*--- Query of cliente ---*/
controller.getAll = async (req, res) => {
    const idCuenta = req.payload.sub;
    try {
        const clientes = await Clientes.findAll({
            where: {
                idCuenta
            }
        });
        return res.json({
            data: clientes
        })

    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    };
};
/*--- Find of cliente ---*/
controller.getById = async (req, res) => {
    const idCuenta = req.payload.sub;
    const { idCliente } = req.params;
    try {
        /*##################################### Control Permissions Cliente #####################################*/
        //find cuenta
        const cuenta = await Cuentas.findOne({
            where: {
                idCuenta
            }
        });
        const controlCliente = await Clientes.findOne({
            where: {
                idCliente
            }
        });
        if (!(cuenta.userType == 2) && !(cuenta.idCuenta === controlCliente.idCuenta)) {
            return res.json({
                error: 'Doesnt has permissions'
            })
        };
        /*#######################################################################################################*/
        const cliente = await Clientes.findOne({
            where: {
                idCliente
            }
        });
        return res.json({
            data: cliente
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    };
};
/*--- Find a cuenta by cliente ---*/
controller.getCuenta = async (req, res) => {
    const idCuenta = req.payload.sub;
    try {
        const cuenta = await Cuentas.findOne({
            where: {
                idCuenta
            }
        });
        return res.json({
            data: cuenta
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    }
};
/* Find all Pedido by Cliente */
controller.getAllPedido = async (req, res) => {
    const idCuenta = req.payload.sub;
    const { idCliente } = req.params;
    try {
        /*##################################### Control Permissions Cliente #####################################*/
        //find cuenta
        const cuenta = await Cuentas.findOne({
            where: {
                idCuenta
            }
        });
        const controlCliente = await Clientes.findOne({
            where: {
                idCliente
            }
        });
        if (!(cuenta.userType == 2) && !(cuenta.idCuenta === controlCliente.idCuenta)) {
            return res.json({
                error: 'Doesnt has permissions'
            })
        };
        /*#######################################################################################################*/
        const pedidos = await Pedidos.findAll({
            where: {
                idCliente
            }
        });
        return res.json({
            data: pedidos
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    }
};
/*##################################### ClienteEnDomicilios API REST ####################################*/
/*--- Find domicilios by cliente ---*/
controller.getDomicilios = async (req, res) => {
    const idCuenta = req.payload.sub;
    const { idCliente } = req.params;
    try {
        /*##################################### Control Permissions Cliente #####################################*/
        //find cuenta
        const cuenta = await Cuentas.findOne({
            where: {
                idCuenta
            }
        });
        const controlCliente = await Clientes.findOne({
            where: {
                idCliente
            }
        });
        if (!(cuenta.userType == 2) && !(cuenta.idCuenta === controlCliente.idCuenta)) {
            return res.json({
                error: 'Doesnt has permissions'
            })
        };
        /*#######################################################################################################*/
        const domicilios = Domicilios.findAll({
            where:{
                idCliente
            }
        });
        return res.json({
            data:domicilios
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error',
            data: {}
        });
    }
};
/*--- Find ClienteEnDomicilio ---*/
controller.getDomicilioById = async (req, res) => {
    const idCuenta = req.payload.sub;
    const { idCliente, idDomicilio } = req.params;
    try {
        /*##################################### Control Permissions Cliente #####################################*/
        //find cuenta
        const cuenta = await Cuentas.findOne({
            where: {
                idCuenta
            }
        });
        const controlCliente = await Clientes.findOne({
            where: {
                idCliente
            }
        });
        if (!(cuenta.userType == 2) && !(cuenta.idCuenta === controlCliente.idCuenta)) {
            return res.json({
                error: 'Doesnt has permissions'
            })
        };
        /*#######################################################################################################*/
        const domicilio = await Domicilios.findOne({
            where: {
                idCliente,
                idDomicilio
            }
        });
        return res.json({
            data: domicilio
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error',
            data: {}
        })
    }
};
/*#######################################################################################################*/

/*▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ Admin Cliente API REST ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒*/
/*--- Create of cliente ---*/ //ARREGLAR
controller.adminNew = async (req, res) => {
    const { dni, nombre, apellido, idCuenta } = req.body;
    try {
        const newCliente = await Clientes.create({
            dni,
            apellido,
            nombre,
            idCuenta
        });
        if (newCliente) {
            return res.json({
                message: 'The Cliente has been created',
                data: newCliente
            });
        };
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    };
};
/*--- Edit of cliente ---*/
controller.adminChange = async (req, res) => {
    const { idCliente } = req.params;
    const { dni, nombre, apellido, idCuenta } = req.body;
    try {
        await Clientes.update({
            dni,
            nombre,
            apellido,
            idCuenta
        },
            {
                where: {
                    idCliente
                }
            });
        const cliente = await Clientes.findOne({
            where: {
                idCliente
            }
        });
        return res.json({
            message: 'The Cliente has been updated',
            data: cliente
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    };
};
/*--- Delete of cliente ---*/
controller.adminDelete = async (req, res) => {
    try {
        const { idCliente } = req.params;
        const deleteRowCountDireccion = await ClienteEnDomicilios.destroy({
            where: {
                idCliente
            }
        });
        const deleteRowCountClientes = await Clientes.destroy({
            where: {
                idCliente
            }
        });
        return res.json({
            message: 'The Cliente has been deleted',
            countClientes: deleteRowCountClientes,
            countDireccion: deleteRowCountClientes
        });

    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    };
};
/*--- Find of cliente ---*/
controller.adminGetById = async (req, res) => {
    const { idCliente } = req.params;
    try {
        const cliente = await Clientes.findOne({
            where: {
                idCliente
            }
        });
        return res.json({
            data: cliente
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    };
};
/*--- Query of cliente ---*/
controller.adminGetAll = async (req, res) => {
    try {
        const clientes = await Clientes.findAll();
        return res.json({
            data: clientes
        })

    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    };
};
/*--- Find a cuenta by cliente ---*/
controller.adminGetCuenta = async (req, res) => {
    const { idCliente } = req.params;
    try {
        const cliente = await Clientes.findOne({
            where: {
                idCliente
            }
        });
        if (cliente) {
            const idCuenta = cliente.idCuenta;
            const cuenta = await Cuentas.findOne({
                where: {
                    idCuenta
                }
            });
            return res.json({
                data: cuenta
            })
        };
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    }
};
/* Find all Pedido by Cliente */
controller.adminGetAllPedido = async (req, res) => {
    const { idCliente } = req.params;
    try {
        const pedidos = await Pedidos.findAll({
            where: {
                idCliente
            }
        });
        return res.json({
            data: pedidos
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    }
};
/*##################################### ClienteEnDomicilios API REST ####################################*/
/*--- Find domicilios by cliente ---*/
controller.adminGetDomicilios = async (req, res) => {
    const { idCliente } = req.params;
    try {
        const domicilios = Domicilios.findAll({
            where:{
                idCliente
            }
        });
        return res.json({
            data:domicilios
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error',
            data: {}
        });
    }
};
/*--- Find ClienteEnDomicilio ---*/
controller.adminGetDomicilioById = async (req, res) => {
    const { idCliente, idDomicilio } = req.params;
    try {
        const domicilio = await Domicilios.findOne({
            where: {
                idCliente,
                idDomicilio
            }
        });
        return res.json({
            data: domicilio
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error',
            data: {}
        })
    }
};
/*#######################################################################################################*/

/*▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒*/
module.exports = controller;