const {Router} = require('express');
const router = Router();
const controller = require('../controllers/medioPago.controller.js');

router.get('/',controller.getAll);
router.get('/:idMedioPago',controller.getById);
module.exports=router;