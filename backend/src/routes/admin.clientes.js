const {Router}=require('express');
const router = Router();
const controller = require('../controllers/clientes.controller');

router.get('/',controller.adminGetAll);
router.get('/:idCliente',controller.adminGetById);
router.post('/',controller.adminNew);
router.delete('/:idCliente',controller.adminDelete);
router.put('/:idCliente',controller.adminChange);
router.get('/:idCliente/cuentas',controller.adminGetCuenta);
router.get('/:idCliente/pedidos',controller.adminGetAllPedido);
/*##################################### ClienteEnDomicilios API REST ####################################*/
router.get('/:idCliente/domicilios',controller.adminGetDomicilios);
router.get('/:idCliente/domicilios/:idDomicilio',controller.adminGetDomicilioById);
/*#######################################################################################################*/
module.exports= router;