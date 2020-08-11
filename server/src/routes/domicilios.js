const {Router} = require('express');
const router = Router();
const controller = require('../controllers/domicilios.controller.js');

router.get('/',controller.getAll);
router.get('/:idDomicilio',controller.getById);
router.post('/',controller.new);
router.delete('/:idDomicilio',controller.delete);
router.put('/:idDomicilio',controller.change);
router.get('/:idDomicilio/calles',controller.getCalle);
router.get('/:idDomicilio/pedidos',controller.getPedidos);
module.exports=router;