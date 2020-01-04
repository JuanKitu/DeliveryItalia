const { Router } = require('express');
const router = Router();
const controller = require('../controllers/sucursales.controller.js');

router.get('/',controller.getAll);
router.get('/:idSucursal',controller.getById);
module.exports = router;