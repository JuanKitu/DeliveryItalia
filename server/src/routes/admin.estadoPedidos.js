const {Router} = require('express');
const router = Router();
const controller = require('../controllers/estadoPedido.controller.js');

router.get('/',controller.getAll);
router.get('/:idEstado',controller.getByid);
router.delete('/:idEstado',controller.delete);
router.put('/:idEstado',controller.change);


module.exports=router;