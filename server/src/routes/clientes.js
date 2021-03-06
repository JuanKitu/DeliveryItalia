const {Router}=require('express');
const router = Router();
const controller = require('../controllers/clientes.controller');

router.get('/',controller.getAll);
router.get('/:idCliente',controller.getById);
router.post('/',controller.new);
router.delete('/:idCliente',controller.delete);
router.put('/:idCliente',controller.change);
router.get('/:idCliente/cuentas',controller.getCuenta);
router.get('/:idCliente/pedidos',controller.getAllPedido);
/*##################################### ClienteEnDomicilios API REST ####################################*/
router.get('/:idCliente/domicilios',controller.getDomicilios);
router.get('/:idCliente/domicilios/:idDomicilio',controller.getDomicilioById);
/*#######################################################################################################*/
module.exports= router;