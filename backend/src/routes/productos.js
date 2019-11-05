const { Router } = require('express');
const router = Router();
const controller = require('../controllers/producto.controller.js');

/*---  ---*/
router.get('/',controller.getAll);
router.post('/',controller.new);
module.exports = router;