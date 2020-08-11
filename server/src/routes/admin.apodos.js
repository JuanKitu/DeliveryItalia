const {Router} = require('express');
const router = Router();
const controller = require('../controllers/apodos.controller.js');

router.get('/',controller.getAll);
router.get('/:idNombreCalle',controller.getById);
router.post('/',controller.new);
router.delete('/:idNombreCalle',controller.delete);
router.put('/:idNombreCalle',controller.change);


module.exports=router;