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
router.put('/:idPedido/montototal',controller.calculateTotalAmount);

/*######################################## EstadoPèdido API REST ########################################*/
router.get('/:idPedido/estados',controller.getAllEstadosPedidos);
router.post('/:idPedido/estados',controller.newEstadoPedido);
router.put('/:idPedido/estados/:idEstado',controller.changeEstadoPedidos);
router.delete('/:idPedido/estados/:idEstado',controller.deleteEstadoPedidos);
router.get('/:idPedido/estados/:idEstado',controller.getEstadoById);
router.put('/:idPedido/estados/:idEstado/finish',controller.getFinishEstado);
/*######################################### ItemPedido API REST #########################################*/
router.get('/:idPedido/items',controller.getAllItemPedidos);
router.post('/:idPedido/items',controller.newItemPedidos);
router.delete('/:idPedido/items/:idItemPedido',controller.deleteItemPedidos);
router.get('/:idPedido/items/:idItemPedido',controller.getItemById);
router.put('/:idPedido/items/:idItemPedido/precio',controller.calculatepriceItem);//pregutnar a virgonesi sies post o get
router.put('/:idPedido/items/:idItemPedido/cantidad',controller.changeQuantity);

/*--- Item pedido Pote API ---*/
router.put('/:idPedido/items/:idItemPedido/potes',controller.addPote);
router.get('/:idPedido/items/:idItemPedido/potes',controller.getItemContent);
/*--- Item pedido Producto API ---*/
router.put('/:idPedido/items/:idItemPedido/productos',controller.addProducto);
router.get('/:idPedido/items/:idItemPedido/productos',controller.getItemContent);


module.exports=router;