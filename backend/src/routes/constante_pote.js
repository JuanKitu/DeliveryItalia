const {Router} = require('express');
const router = Router();
const controller = require('../controllers/constante_pote.js');

router.get('/',controller.getAll);
router.get('/:idConstantePote',controller.getById);
router.post('/',controller.new);
router.delete('/:idConstantePote',controller.delete);
router.put('/:idConstantePote',controller.change);


module.exports=router;


