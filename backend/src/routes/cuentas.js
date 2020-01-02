const {Router} = require('express');
const router = Router();
const controller = require('../controllers/cuentas.controller.js');

router.get('/',controller.getAll);
router.get('/:idCuenta',controller.getById);
router.post('/',controller.new);
router.delete('/:idCuenta',controller.delete);
router.put('/:idCuenta',controller.change);


module.exports=router;