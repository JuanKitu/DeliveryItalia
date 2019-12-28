const Clientes = require('../models/Clientes.js');
const Cuentas = require('../models/Cuentas.js');
const ClienteEnDomicilios = require('../models/ClienteEnDomicilios.js');
const Domicilios = require('../models/Domicilios.js');
const Pedidos = require('../models/Pedidos.js');
const controller = {};

/*--- Create of cliente ---*/
controller.new = async (req, res) => {
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
/*--- Query of cliente ---*/
controller.getAll = async (req, res) => {
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
/*--- Edit of cliente ---*/
controller.change = async (req, res) => {
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
controller.delete = async (req, res) => {
    try {
        const { idCliente } = req.params;
        const deleteRowCountDireccion = await ClienteEnDomicilios.destroy({
            where:{
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
controller.getById = async (req, res) => {
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
/*--- Find a cuenta by cliente ---*/
controller.getCuenta = async (req, res) => {
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
controller.getAllPedido = async (req,res)=>{
    const {idCliente} = req.params;
    try{
        const pedidos = await Pedidos.findAll({
            where:{
                idCliente
            }
        });
        return res.json({
            data:pedidos
        });
    }catch(error){
        console.log(error);
        return res.json({
            error: 'The server has been error'
        }); 
    }
}
/*--- Find domicilios by cliente ---*/
controller.getDomicilios = async (req, res) => {
    const { idCliente } = req.params;
    try {
        const clienteEnDomicilios = await ClienteEnDomicilios.findAll({
            where: {
                idCliente
            }
        });
        if(!clienteEnDomicilios){
            return res.json({
                data:[]
            });
        };
        const domicilios = [];
        for (let inc = 0; inc < clienteEnDomicilios.length; inc++) {
            const idDomicilio = clienteEnDomicilios[inc].idDomicilio;
            const domicilioAux = await Domicilios.findOne({
                where:{
                    idDomicilio
                }
            });
            domicilios.push(domicilioAux);
        };
        return res.json({
            data: domicilios
        })
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error',
            data: {}
        });
    }
};
/*--- Find ClienteEnDomicilio ---*/
controller.getClienteEnDomicilio = async (req,res)=>{
    const {idCliente,idDomicilio}= req.params;
    try{
        const clienteEnDomicilios = await ClienteEnDomicilios.findOne({
            where:{
                idCliente,
                idDomicilio
            }
        });
        return res.json({
            data:clienteEnDomicilios
        });
    }catch(error){
        console.log(error);
        return res.json({
            error: 'The server has been error',
            data: {}
        })  
    }
}
/*--- Add domicilio by cliente  ---*/
controller.addDomicilio = async (req, res) => {
    const { idCliente } = req.params;
    const { idDomicilio, nombrePilaDestinatario, dniDestinatario } = req.body;
    try {
        const clienteEnDomicilios = await ClienteEnDomicilios.findOne({
             where: {
                 idCliente,
                 idDomicilio
             }
         });
         if (clienteEnDomicilios) {
             return res.json({
                 message: 'The object already exists'
             })
         }
        const cliente = await Clientes.findOne({
            where: {
                idCliente
            }
        });
        if (cliente) {
            const domicilio = await Domicilios.findOne({
                where: {
                    idDomicilio
                }
            });
            if (domicilio) {
                const newClienteEnDomicilio = await ClienteEnDomicilios.create({
                    idDomicilio,
                    idCliente,
                    nombrePilaDestinatario, 
                    dniDestinatario
                });
                return res.json({
                    message: 'The Cliente has been linked to the Domicilio',
                    data: newClienteEnDomicilio
                });
            } else {
                return res.json({
                    message: 'The Domicilio does not exists',
                    data: []
                })
            }
        } else {
            return res.json({
                message: 'The Cliente does not exists',
                data: []
            })
        }
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error',
            data: {}
        })
    }

};
/*--- Edit domicilio by cliente ---*/
controller.changeDomicilio = async (req,res)=>{
    const { idCliente,idDomicilio } = req.params;
    const { nombrePilaDestinatario, dniDestinatario } = req.body;
    try{
        await ClienteEnDomicilios.update({
            nombrePilaDestinatario, 
            dniDestinatario
        },
        {
            where:{
                idCliente,
                idDomicilio
            }
        });
        const clienteEnDomicilios = await ClienteEnDomicilios.findOne({
            where:{
                idCliente,
                idDomicilio
            }
        });
        return res.json({
            message:'The Domicilio has been changed',
            data:clienteEnDomicilios
        });
    }catch(error){
        console.log(error);
        return res.json({
            error: 'The server has been error',
            data: {}
        });  
    }
};
/*--- Delete domicilio by cliente ---*/
controller.deleteDomicilio = async (req, res) => {
    const { idCliente, idDomicilio } = req.params;
    try {
        const deleteRowCount = await ClienteEnDomicilios.destroy({
            where: {
                idCliente,
                idDomicilio
            }
        });
        return res.json({
            message: 'The ClienteEnDomicilio has been deleted',
            count: deleteRowCount
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has been error',
            data: {}
        });
    }
};
module.exports = controller;