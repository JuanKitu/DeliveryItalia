const { Router } = require('express');
const router = Router();
const controller = require('../controllers/producto.controller.js');

/*---  ---*/
router.get('/',controller.getAll);
router.get('/:idProducto',controller.getById);
router.post('/',controller.new);
router.delete('/:idProducto',controller.delete);
router.put('/:idProducto',controller.change);

router.get('/:idProducto/foto/', controller.getImage);
router.post('/:idProducto/foto/',controller.uploadImage);


module.exports = router;