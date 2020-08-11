const {Router} = require('express');
const router = Router();
const controller = require('../controllers/pedidos.controller.js');

router.get('/',controller.adminGetAll);
router.get('/:idPedido',controller.adminGetById);
router.post('/',controller.adminNew);
router.delete('/:idPedido',controller.adminDelete);
router.put('/:idPedido',controller.adminChange);
router.get('/:idPedido/sucursales',controller.adminGetSucursal);
router.get('/:idPedido/clientes',controller.adminGetCliente);
router.put('/:idPedido/montototal',controller.adminCalculateTotalAmount);

/*######################################## EstadoPèdido API REST ########################################*/
router.get('/:idPedido/estados',controller.adminGetAllEstadosPedidos);
router.post('/:idPedido/estados',controller.adminNewEstadoPedido);
router.put('/:idPedido/estados/:idEstado',controller.adminChangeEstadoPedidos);
router.delete('/:idPedido/estados/:idEstado',controller.adminDeleteEstadoPedidos);
router.get('/:idPedido/estados/:idEstado',controller.adminGetEstadoById);
router.put('/:idPedido/estados/:idEstado/finish',controller.adminGetFinishEstado);
/*######################################### ItemPedido API REST #########################################*/
router.get('/:idPedido/items',controller.adminGetAllItemPedidos);
router.post('/:idPedido/items',controller.adminNewItemPedidos);
router.delete('/:idPedido/items/:idItemPedido',controller.adminDeleteItemPedidos);
router.get('/:idPedido/items/:idItemPedido',controller.adminGetItemById);
router.put('/:idPedido/items/:idItemPedido/precio',controller.adminCalculatepriceItem);//pregutnar a virgonesi sies post o get
router.put('/:idPedido/items/:idItemPedido/cantidad',controller.adminChangeQuantity);

/*--- Item pedido Pote API ---*/
router.post('/:idPedido/items/:idItemPedido/potes',controller.adminAddPote);
router.get('/:idPedido/items/:idItemPedido/potes',controller.adminGetItemContent);
/*--- Item pedido Producto API ---*/
router.post('/:idPedido/items/:idItemPedido/productos',controller.adminAddProducto);
router.get('/:idPedido/items/:idItemPedido/productos',controller.adminGetItemContent);


module.exports=router;