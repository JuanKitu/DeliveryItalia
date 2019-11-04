const { Router } = require('express');
const router = Router();
const controller = require('../controllers/producto.controller.js');

/*---  ---*/
router.get('/',controller.getAll);

module.exports = router;