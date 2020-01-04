const {Router} = require('express');
const router = Router();
const controller = require('../controllers/cuentas.controller.js');

router.get('/',controller.getAll);
router.get('/cuenta',controller.getById);
router.post('/',controller.new);
router.delete('/borrar',controller.delete);
router.put('/editar',controller.change);


module.exports=router;