const {Router} = require('express');
const router = Router();
const controller = require('../controllers/cuentas.controller.js');

router.get('/',controller.adminGetAll);
router.get('/:idCuenta',controller.adminGetById);
router.post('/',controller.new);
router.delete('/:idCuenta',controller.adminDelete);
router.put('/:idCuenta',controller.adminChange);


module.exports=router;