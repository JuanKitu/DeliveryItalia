const {Router} = require('express');
const router = Router();
const controller = require('../controllers/pedidos.controller.js');

router.get('/',controller.getAll);
router.get('/:idPedido',controller.getById);
router.post('/',controller.new);
router.delete('/:idPedido',controller.delete);
router.put('/:idPedido',controller.change);
router.get('/:idPedido/sucursales',controller.getSucursal);
router.get('/:idPedido/clientes',controller.getCliente);
/*######################################## EstadoPèdido API REST ########################################*/
router.get('/:idPedido/estados',controller.getAllEstadosPedidos);
router.post('/:idPedido/estados',controller.newEstadoPedido);
router.put('/:idPedido/estados/:idEstado',controller.changeEstadoPedidos);
router.delete('/:idPedido/estados/:idEstado',controller.deleteEstadoPedidos);
router.get('/:idPedido/estados/:idEstado',controller.getEstadoById);
router.put('/:idPedido/estados/:idEstado',controller.getFinishEstado);
/*######################################### ItemPedido API REST #########################################*/
router.get('/:idPedido/items',controller.getAllItemPedidos);
router.post('/:idPedido/items',controller.newItemPedidos);
router.delete('/:idPedido/items/:idItemPedido',controller.deleteItemPedidos);
router.get('/:idPedido/items/:idItemPedido',controller.getItemById);
router.post('/:idPedido/items/:idItemPedido/price',controller.calculatepriceItem);//pregutnar a virgonesi sies post o get
/*--- Item pedido Pote API ---*/
router.post('/:idPedido/items/:idItemPedido/potes',controller.addPote);
/*--- Item pedido Producto API ---*/
router.post('/:idPedido/items/:idItemPedido/productos',controller.addProducto);


module.exports=router;