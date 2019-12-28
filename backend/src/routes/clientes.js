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

/*--- about a specific Domicilio---*/
router.get('/:idCliente/domicilios',controller.getDomicilios);
router.get('/:idCliente/domicilios/:idDomicilio',controller.getClienteEnDomicilio);
router.post('/:idCliente/domicilios',controller.addDomicilio);
router.put('/:idCliente/domicilios/:idDomicilio',controller.changeDomicilio);
router.delete('/:idCliente/domicilios/:idDomicilio',controller.deleteDomicilio);
module.exports= router;