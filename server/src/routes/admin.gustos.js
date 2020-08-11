const {Router} = require('express');
const router = Router();
const controller = require('../controllers/gustos.controller.js');

router.get('/',controller.getAll);
router.get('/:idGusto',controller.getById);
router.post('/',controller.new);
router.delete('/:idGusto',controller.delete);
router.put('/:idGusto',controller.change);
router.get('/categoriagusto/:idCategoria',controller.getByIdCategoriaGusto);

module.exports = router;