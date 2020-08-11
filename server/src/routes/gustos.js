const {Router} = require('express');
const router = Router();
const controller = require('../controllers/gustos.controller.js');

router.get('/',controller.getAll);
router.get('/:idGusto',controller.getById);
router.get('/categoriagusto/:idCategoria',controller.getByIdCategoriaGusto);

module.exports = router;