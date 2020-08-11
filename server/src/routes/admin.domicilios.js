const {Router} = require('express');
const router = Router();
const controller = require('../controllers/domicilios.controller.js');

router.get('/',controller.adminGetAll);
router.get('/:idDomicilio',controller.adminGetById);
router.post('/',controller.adminNew);
router.delete('/:idDomicilio',controller.adminDelete);
router.put('/:idDomicilio',controller.adminChange);
router.get('/:idDomicilio/calles',controller.adminGetCalle);
router.get('/:idDomicilio/pedidos',controller.adminGetPedidos);
module.exports=router;