const { Router } = require('express');
const router = Router();
const controller = require('../controllers/sucursales.controller.js');

router.get('/',controller.getAll);
router.get('/:idSucursal',controller.getById);
router.post('/',controller.new);
router.delete('/:idSucursal',controller.delete);
router.put('/:idSucursal',controller.change);

module.exports = router;