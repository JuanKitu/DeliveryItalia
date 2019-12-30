const {Router} = require('express');
const router = Router();
const controller = require('../controllers/pedidos.controller.js');

router.get('/',controller.getAll);
router.get('/:idPedido',controller.getById);
router.post('/',controller.new);
router.delete('/:idPedido',controller.delete);
router.put('/:idPedido',controller.change);
router.get('/:idPedido/estados',controller.getAllEstadosPedidos);
router.get('/:idPedido/items',controller.getAllItemPedidos);
router.get('/:idPedido/sucursales',controller.getSucursal);
router.get('/:idPedido/clientes',controller.getCliente);

module.exports=router;