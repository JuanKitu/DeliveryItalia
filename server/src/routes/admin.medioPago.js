const {Router} = require('express');
const router = Router();
const controller = require('../controllers/medioPago.controller.js');

router.get('/',controller.getAll);
router.get('/:idMedioPago',controller.getById);
router.post('/',controller.new);
router.delete('/:idMedioPago',controller.delete);
router.put('/:idMedioPago',controller.change);


module.exports=router;