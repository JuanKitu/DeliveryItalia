const { Router } = require('express');
const router = Router();
const controller = require('../controllers/categoriaGusto.controller.js');

router.get('/',controller.getAll);
router.get('/:idCategoria',controller.getById);
module.exports = router;