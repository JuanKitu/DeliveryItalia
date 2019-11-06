const { Router } = require('express');
const router = Router();
const controller = require('../controllers/categoriaGusto.controller.js');

router.get('/',controller.getAll);
router.get('/:idProducto',controller.getById);
router.post('/',controller.new);
router.delete('/:idProducto',controller.delete);
router.put('/:idProducto',controller.change);
module.exports = router;