const Domicilios = require('../models/Domicilios.js');
const Pedidos = require('../models/Pedidos');
const Calles = require('../models/Calles.js');
const Cuentas = require('../models/Cuentas.js');
const Clientes = require('../models/Clientes.js');
const ClienteEnDomicilios = require('../models/ClienteEnDomicilios.js');
const controller = {};

/*--- Create a domicilio ---*/
controller.new = async (req, res) => {
    const idCuenta = req.payload.sub;
    const { numero, piso, nroDepto, referencias, entreCalles, idCalle, nombrePilaDestinatario, dniDestinatario } = req.body;
    try {
        const cliente = Clientes.findOne({
            where: {
                idCuenta
            }
        });
        const idCliente = cliente.idCliente;
        const domicilio = await Domicilios.create({
            numero,
            piso,
            nroDepto,
            referencias,
            entreCalles,
            idCalle,
            nombrePilaDestinatario,
            dniDestinatario,
            idCliente
        });
        if (domicilio) {
            return res.json({
                message: 'The domicilio has been created',
                data: domicilio
            });
        };
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    }
};
/*--- Query a domicilio ---*/
controller.getAll = async (req, res) => {
    const idCuenta = req.payload.sub;
    try {
        const cliente = await Clientes.findOne({
            where:{
                idCuenta
            }
        });
        const idCliente = cliente.idCliente;
        const domicilios = await Domicilios.findAll({
            where:{
                idCliente
            }
        });
        return res.json({
            data: domicilios
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    }
};
/*--- Edit a domicilio ---*/
controller.change = async (req, res) => {
    const idCuenta = req.payload.sub;
    const { idDomicilio } = req.params;
    const { numero, piso, nroDepto, referencias, entreCalles, idCalle } = req.body;
    try {
        /*#################################### Control Permissions Domicilio ####################################*/
        const controlDomicilio = await Domicilios.findOne({
            where: {
                idDomicilio
            }
        });
        if (!controlDomicilio) {
            return res.json({
                error: 'The domicilio dont exist'
            });
        };
        const controlClientebyCuenta = await Clientes.findOne({
            where: {
                idCuenta
            }
        });
        const cuentas = await Cuentas.findOne({
            where: {
                idCuenta
            }
        });
        if (!(cuentas.userTipe === 2) && !(controlClientebyCuenta.idCliente === controlDomicilio.idCliente)) {
            return res.json({
                error: 'Doesnt has permissions'
            });
        }
        /*#######################################################################################################*/
        await Domicilios.update({
            numero,
            piso,
            nroDepto,
            referencias,
            entreCalles,
            idCalle
        },
            {
                where: {
                    idDomicilio
                }
            });
        const domicilio = await Domicilios.findOne({
            where: {
                idDomicilio
            }
        });
        return res.json({
            message: 'The domicilio has been changed',
            data: domicilio
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    }
};
/*--- Delete a domicilio ---*/
controller.delete = async (req, res) => {
    const idCuenta = req.payload.sub;
    const { idDomicilio } = req.params;
    try {
        /*#################################### Control Permissions Domicilio ####################################*/
        const controlDomicilio = await Domicilios.findOne({
            where: {
                idDomicilio
            }
        });
        if (!controlDomicilio) {
            return res.json({
                error: 'The domicilio dont exist'
            });
        };
        const controlClientebyCuenta = await Clientes.findOne({
            where: {
                idCuenta
            }
        });
        const cuentas = await Cuentas.findOne({
            where: {
                idCuenta
            }
        });
        if (!(cuentas.userTipe === 2) && !(controlClientebyCuenta.idCliente === controlDomicilio.idCliente)) {
            return res.json({
                error: 'Doesnt has permissions'
            });
        }
        /*#######################################################################################################*/
        const deleteRowCount = await Domicilios.destroy({
            where: {
                idDomicilio
            }
        });
        return res.json({
            message: 'The apodo has been deleted',
            count: deleteRowCount
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    }
};
/*--- Find a domicilio ---*/
controller.getById = async (req, res) => {
    const idCuenta = req.payload.sub;
    const { idDomicilio } = req.params;
    try {
        /*#################################### Control Permissions Domicilio ####################################*/
        const controlDomicilio = await Domicilios.findOne({
            where: {
                idDomicilio
            }
        });
        if (!controlDomicilio) {
            return res.json({
                error: 'The domicilio dont exist'
            });
        };
        const controlClientebyCuenta = await Clientes.findOne({
            where: {
                idCuenta
            }
        });
        const cuentas = await Cuentas.findOne({
            where: {
                idCuenta
            }
        });
        if (!(cuentas.userTipe === 2) && !(controlClientebyCuenta.idCliente === controlDomicilio.idCliente)) {
            return res.json({
                error: 'Doesnt has permissions'
            });
        }
        /*#######################################################################################################*/
        const domicilio = await Domicilios.findOne({
            where: {
                idDomicilio
            }
        });
        return res.json({
            data: domicilio
        })
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    }
};
/*--- Find a calle by domicilio ---*/
controller.getCalle = async (req, res) => {
    const idCuenta = req.payload.sub;
    const { idDomicilio } = req.params;
    try {
        /*#################################### Control Permissions Domicilio ####################################*/
        const controlDomicilio = await Domicilios.findOne({
            where: {
                idDomicilio
            }
        });
        if (!controlDomicilio) {
            return res.json({
                error: 'The domicilio dont exist'
            });
        };
        const controlClientebyCuenta = await Clientes.findOne({
            where: {
                idCuenta
            }
        });
        const cuentas = await Cuentas.findOne({
            where: {
                idCuenta
            }
        });
        if (!(cuentas.userTipe === 2) && !(controlClientebyCuenta.idCliente === controlDomicilio.idCliente)) {
            return res.json({
                error: 'Doesnt has permissions'
            });
        }
        /*#######################################################################################################*/
        const domicilio = await Domicilios.findOne({
            where: {
                idDomicilio
            }
        });
        if (domicilio) {
            const idCalle = domicilio.idCalle;
            const calle = await Calles.findOne({
                where: {
                    idCalle
                }
            });
            return res.json({
                data: calle
            })
        };
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    }
};
/*--- Query all pedidos ---*/
controller.getPedidos = async (req, res) => {
    const idCuenta = req.payload.sub;
    const { idDomicilio } = req.params;
    try {
        /*#################################### Control Permissions Domicilio ####################################*/
        const controlDomicilio = await Domicilios.findOne({
            where: {
                idDomicilio
            }
        });
        if (!controlDomicilio) {
            return res.json({
                error: 'The domicilio dont exist'
            });
        };
        const controlClientebyCuenta = await Clientes.findOne({
            where: {
                idCuenta
            }
        });
        const cuentas = await Cuentas.findOne({
            where: {
                idCuenta
            }
        });
        if (!(cuentas.userTipe === 2) && !(controlClientebyCuenta.idCliente === controlDomicilio.idCliente)) {
            return res.json({
                error: 'Doesnt has permissions'
            });
        }
        /*#######################################################################################################*/
        pedidos = await Pedidos.findAll({
            where: {
                idDomicilio
            }
        });
        res.json({
            data: pedidos
        })
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error',
            data: {}
        });
    }
}; //probar esta funcion mas adelante

/*▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ Admin Domicilios API REST ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒*/

/*--- Create a domicilio ---*/
controller.adminNew = async (req, res) => {
    const { numero, piso, nroDepto, referencias, entreCalles, idCalle, idCliente, nombrePilaDestinatario, dniDestinatario } = req.body;
    try {
        const domicilio = await Domicilios.create({
            numero,
            piso,
            nroDepto,
            referencias,
            entreCalles,
            idCalle,
            idCliente,
            dniDestinatario,
            nombrePilaDestinatario
        });
        if (domicilio) {
            return res.json({
                message: 'The domicilio has been created',
                data: domicilio
            });
        };
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    }
};
/*--- Query a domicilio ---*/
controller.adminGetAll = async (req, res) => {
    try {
        const domicilios = await Domicilios.findAll();
        return res.json({
            data: domicilios
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    }
};
/*--- Edit a domicilio ---*/
controller.adminChange = async (req, res) => {
    const { idDomicilio } = req.params;
    const { numero, piso, nroDepto, referencias, entreCalles, idCalle } = req.body;
    try {
        await Domicilios.update({
            numero,
            piso,
            nroDepto,
            referencias,
            entreCalles,
            idCalle
        },
            {
                where: {
                    idDomicilio
                }
            });
        const domicilio = await Domicilios.findOne({
            where: {
                idDomicilio
            }
        });
        return res.json({
            message: 'The domicilio has been changed',
            data: domicilio
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    }
};
/*--- Delete a domicilio ---*/
controller.adminDelete = async (req, res) => {
    try {
        const { idDomicilio } = req.params;
        const deleteRowCount = await Domicilios.destroy({
            where: {
                idDomicilio
            }
        });
        return res.json({
            message: 'The apodo has been deleted',
            count: deleteRowCount
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    }
};
/*--- Find a domicilio ---*/
controller.adminGetById = async (req, res) => {
    const { idDomicilio } = req.params;
    try {
        const domicilio = await Domicilios.findOne({
            where: {
                idDomicilio
            }
        });
        return res.json({
            data: domicilio
        })
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    }
};
/*--- Find a calle by domicilio ---*/
controller.adminGetCalle = async (req, res) => {
    const { idDomicilio } = req.params;
    try {
        const domicilio = await Domicilios.findOne({
            where: {
                idDomicilio
            }
        });
        if (domicilio) {
            const idCalle = domicilio.idCalle;
            const calle = await Calles.findOne({
                where: {
                    idCalle
                }
            });
            return res.json({
                data: calle
            })
        };
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error'
        });
    }
};
/*--- Query all pedidos ---*/
controller.adminGetPedidos = async (req, res) => {
    const { idDomicilio } = req.params;
    try {
        pedidos = await Pedidos.findAll({
            where: {
                idDomicilio
            }
        });
        res.json({
            data: pedidos
        })
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error',
            data: {}
        });
    }
}; //probar esta funcion mas adelante

/*▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒*/


module.exports = controller;