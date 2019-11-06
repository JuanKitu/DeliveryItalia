const { Router } = require('express');
const router = Router();
const controller = require('../controllers/categoriaGusto.controller.js');

router.get('/',controller.getAll);
router.get('/:idCategoria',controller.getById);
router.post('/',controller.new);
router.delete('/:idCategoria',controller.delete);
router.put('/:idCategoria',controller.change);
module.exports = router;